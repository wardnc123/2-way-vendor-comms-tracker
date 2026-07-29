// Main application logic
const mainContent = document.getElementById('main-content');
const viewButtons = document.querySelectorAll('.view-btn');
let currentView = 'overview';

// View switching
viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.dataset.view;
        render();
    });
});

function render() {
    switch (currentView) {
        case 'overview': renderOverview(); break;
        case 'workstreams': renderWorkstreams(); break;
        case 'target-model': renderTargetModel(); break;
        case 'weekly': renderWeekly(); break;
        case 'decisions': renderDecisions(); break;
        case 'leadership': renderLeadership(); break;
    }
}

// Helper functions
function ragBadge(status) {
    const labels = { green: 'On Track', amber: 'At Risk', red: 'Blocked', grey: 'Not Started' };
    return `<span class="rag rag-${status}"><span class="rag-dot"></span>${labels[status]}</span>`;
}

function statusBadge(status) {
    const labels = { 'not-started': 'Not Started', 'in-progress': 'In Progress', 'complete': 'Complete', 'blocked': 'Blocked', 'decision-needed': 'Decision Needed' };
    return `<span class="status-badge status-${status}">${labels[status] || status}</span>`;
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getUpcomingDeadlines() {
    const deadlines = [];
    const now = new Date();
    appData.workstreams.forEach(ws => {
        const items = ws.useCases || ws.integrations || [];
        items.forEach(item => {
            item.milestones.forEach(m => {
                if (m.date && m.status !== 'complete') {
                    const d = new Date(m.date);
                    const daysUntil = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
                    deadlines.push({ workstream: ws.name, item: item.name, milestone: m.name, date: m.date, daysUntil });
                }
            });
        });
    });
    return deadlines.sort((a, b) => a.daysUntil - b.daysUntil);
}

// OVERVIEW VIEW
function renderOverview() {
    const totalUseCases = appData.workstreams.reduce((acc, ws) => acc + (ws.useCases || ws.integrations || []).length, 0);
    const completedUseCases = appData.workstreams.reduce((acc, ws) => {
        return acc + (ws.useCases || ws.integrations || []).filter(uc => uc.status === 'complete').length;
    }, 0);
    const openDecisions = appData.decisions.filter(d => d.status === 'open').length;
    const deadlines = getUpcomingDeadlines().slice(0, 5);
    const latestUpdate = appData.weeklyUpdates.length > 0 ? appData.weeklyUpdates[appData.weeklyUpdates.length - 1] : null;

    mainContent.innerHTML = `
        <div class="overview-grid">
            <div class="summary-card">
                <h3>Program Status</h3>
                <div class="value">${ragBadge('amber')}</div>
                <div class="detail">3 workstreams active</div>
            </div>
            <div class="summary-card">
                <h3>Use Cases / Integrations</h3>
                <div class="value">${completedUseCases}/${totalUseCases}</div>
                <div class="detail">completed</div>
            </div>
            <div class="summary-card">
                <h3>Open Decisions</h3>
                <div class="value" style="color: ${openDecisions > 0 ? '#f59e0b' : '#22c55e'}">${openDecisions}</div>
                <div class="detail">requiring leadership input</div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <div class="card">
                <div class="card-header"><span class="card-title">Upcoming Deadlines</span></div>
                ${deadlines.length === 0 ? '<p style="font-size:0.85rem;color:#6b7280;">No deadlines set yet. Add dates in the Workstreams view.</p>' :
                deadlines.map(d => `
                    <div class="deadline-alert ${d.daysUntil < 0 ? 'overdue' : ''}">
                        <span class="deadline-icon">${d.daysUntil < 0 ? '🔴' : d.daysUntil <= 7 ? '🟡' : '🟢'}</span>
                        <div>
                            <strong>${d.item}</strong> — ${d.milestone}
                            <br><span style="font-size:0.75rem;color:#6b7280;">${formatDate(d.date)} (${d.daysUntil < 0 ? Math.abs(d.daysUntil) + ' days overdue' : d.daysUntil + ' days'})</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="card">
                <div class="card-header"><span class="card-title">Latest Weekly Update</span></div>
                ${latestUpdate ? `
                    <div class="update-date">${formatDate(latestUpdate.date)}</div>
                    <div class="update-owner">${latestUpdate.owner}</div>
                    <div class="update-text">${latestUpdate.summary}</div>
                ` : '<p style="font-size:0.85rem;color:#6b7280;">No weekly updates yet. Go to Weekly Updates to add one.</p>'}
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title">Workstream Summary</span></div>
            <table class="tracker-table">
                <thead><tr><th>Workstream</th><th>Owner</th><th>Status</th><th>Model Coverage</th><th>Active Items</th><th>Next Milestone</th></tr></thead>
                <tbody>
                    ${appData.workstreams.map(ws => {
                        const items = ws.useCases || ws.integrations || [];
                        const activeCount = items.filter(i => i.status === 'in-progress').length;
                        const nextMilestone = getNextMilestone(ws);
                        const modelPct = getWorkstreamModelPercentage(ws.id);
                        const modelColor = modelPct >= 80 ? 'green' : modelPct >= 50 ? 'amber' : 'red';
                        return `<tr>
                            <td><strong>${ws.name}</strong></td>
                            <td>${ws.owner}</td>
                            <td>${ragBadge(ws.ragStatus)}</td>
                            <td><span class="rag rag-${modelColor}"><span class="rag-dot"></span>${modelPct}%</span></td>
                            <td>${activeCount} / ${items.length}</td>
                            <td>${nextMilestone}</td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getNextMilestone(ws) {
    const items = ws.useCases || ws.integrations || [];
    for (const item of items) {
        for (const m of item.milestones) {
            if (m.status !== 'complete') {
                return `${item.name}: ${m.name}`;
            }
        }
    }
    return 'All complete';
}

// WORKSTREAMS VIEW
function renderWorkstreams() {
    mainContent.innerHTML = appData.workstreams.map(ws => {
        const items = ws.useCases || ws.integrations || [];
        const isIntegration = !!ws.integrations;
        return `
        <div class="workstream-section">
            <div class="workstream-header">
                <div>
                    <h2>${ws.name}</h2>
                    <p style="font-size:0.8rem;color:#6b7280;margin-top:4px;">${ws.description}</p>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                    <span style="font-size:0.8rem;font-weight:500;color:#6b7280;">Model: <strong style="color:${getWorkstreamModelPercentage(ws.id) >= 80 ? '#22c55e' : getWorkstreamModelPercentage(ws.id) >= 50 ? '#f59e0b' : '#ef4444'}">${getWorkstreamModelPercentage(ws.id)}%</strong></span>
                    <span class="workstream-owner">Owner: <strong>${ws.owner}</strong></span>
                    <select onchange="updateWorkstreamRAG('${ws.id}', this.value)" style="font-size:0.8rem;padding:4px 8px;border-radius:4px;border:1px solid #d1d5db;">
                        <option value="green" ${ws.ragStatus === 'green' ? 'selected' : ''}>🟢 On Track</option>
                        <option value="amber" ${ws.ragStatus === 'amber' ? 'selected' : ''}>🟡 At Risk</option>
                        <option value="red" ${ws.ragStatus === 'red' ? 'selected' : ''}>🔴 Blocked</option>
                        <option value="grey" ${ws.ragStatus === 'grey' ? 'selected' : ''}>⚪ Not Started</option>
                    </select>
                </div>
            </div>
            <div class="workstream-body">
                <table class="tracker-table">
                    <thead>
                        <tr>
                            <th>${isIntegration ? 'Integration' : 'Use Case'}</th>
                            <th>Owner</th>
                            ${isIntegration ? '<th>Partner</th><th>HITL?</th>' : ''}
                            <th>Status</th>
                            ${items.length > 0 ? items[0].milestones.map(m => `<th>${m.name}</th>`).join('') : ''}
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr>
                                <td class="editable" ondblclick="editItemName('${ws.id}','${item.id}', this)"><strong>${item.name}</strong></td>
                                <td class="editable" ondblclick="editItemOwner('${ws.id}','${item.id}', this)" style="font-size:0.8rem;">${item.itemOwner || '<em>—</em>'}</td>
                                ${isIntegration ? `<td style="font-size:0.75rem;">${item.partner}</td><td style="font-size:0.75rem;">${item.humanInLoop}</td>` : ''}
                                <td>${statusBadge(item.status)}</td>
                                ${item.milestones.map(m => `
                                    <td>
                                        <div style="display:flex;flex-direction:column;gap:2px;">
                                            <select onchange="updateMilestone('${ws.id}','${item.id}','${m.name}','status',this.value)" style="font-size:0.7rem;padding:2px 4px;border-radius:3px;border:1px solid #e5e7eb;">
                                                <option value="not-started" ${m.status === 'not-started' ? 'selected' : ''}>Not Started</option>
                                                <option value="in-progress" ${m.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                                <option value="complete" ${m.status === 'complete' ? 'selected' : ''}>Complete</option>
                                                <option value="blocked" ${m.status === 'blocked' ? 'selected' : ''}>Blocked</option>
                                            </select>
                                            <input type="date" value="${m.date || ''}" onchange="updateMilestone('${ws.id}','${item.id}','${m.name}','date',this.value)" style="font-size:0.68rem;padding:1px 3px;border-radius:3px;border:1px solid #e5e7eb;width:110px;">
                                        </div>
                                    </td>
                                `).join('')}
                                <td class="editable" ondblclick="editItemNotes('${ws.id}','${item.id}', this)" style="max-width:200px;font-size:0.75rem;color:#6b7280;">${item.notes || '<em>click to add notes</em>'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    }).join('');
}

function updateWorkstreamRAG(wsId, value) {
    const ws = appData.workstreams.find(w => w.id === wsId);
    if (ws) { ws.ragStatus = value; saveData(appData); }
}

function updateMilestone(wsId, itemId, milestoneName, field, value) {
    const ws = appData.workstreams.find(w => w.id === wsId);
    if (!ws) return;
    const items = ws.useCases || ws.integrations || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const milestone = item.milestones.find(m => m.name === milestoneName);
    if (!milestone) return;
    milestone[field] = value;
    // Auto-update item status based on milestones
    if (field === 'status') {
        const allComplete = item.milestones.every(m => m.status === 'complete');
        const anyInProgress = item.milestones.some(m => m.status === 'in-progress');
        const anyBlocked = item.milestones.some(m => m.status === 'blocked');
        if (allComplete) item.status = 'complete';
        else if (anyBlocked) item.status = 'blocked';
        else if (anyInProgress || item.milestones.some(m => m.status === 'complete')) item.status = 'in-progress';
        else item.status = 'not-started';
    }
    saveData(appData);
    render();
}

// TARGET MODEL VIEW
function renderTargetModel() {
    const caps = appData.targetModel.capabilities;
    const coverage = appData.targetModel.workstreamCoverage;
    const workstreams = appData.workstreams.filter(ws => ws.id !== 'pipeline' || true);

    mainContent.innerHTML = `
        <div class="card" style="margin-bottom:24px;">
            <div class="card-header"><span class="card-title">Target Product Model</span></div>
            <p style="font-size:0.85rem;color:#6b7280;margin-bottom:16px;">The end-state product must deliver all 6 capabilities below. This view tracks how close each workstream is to the full model.</p>

            <table class="tracker-table">
                <thead>
                    <tr>
                        <th style="width:30px;">#</th>
                        <th>Capability</th>
                        <th>Description</th>
                        <th>Overall Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${caps.map((cap, i) => {
                        const anyMet = Object.values(coverage).some(ws => ws[cap.id] && ws[cap.id].met);
                        return `<tr>
                            <td><strong>${i + 1}</strong></td>
                            <td><strong>${cap.name}</strong></td>
                            <td style="font-size:0.8rem;color:#6b7280;">${cap.description}</td>
                            <td>${anyMet ? statusBadge('in-progress') : statusBadge('not-started')}</td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title">Workstream Coverage vs. Target Model</span></div>
            <p style="font-size:0.85rem;color:#6b7280;margin-bottom:16px;">Shows which capabilities each workstream delivers today. Double-click notes to edit. Click ✅/❌ to toggle.</p>

            ${appData.workstreams.map(ws => {
                const wsCoverage = coverage[ws.id] || {};
                const metCount = caps.filter(c => wsCoverage[c.id] && wsCoverage[c.id].met).length;
                const percentage = Math.round((metCount / caps.length) * 100);
                const barColor = percentage >= 80 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#ef4444';

                return `
                <div style="margin-bottom:24px;">
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                        <h3 style="font-size:0.95rem;font-weight:600;">${ws.name}</h3>
                        <span class="rag rag-${percentage >= 80 ? 'green' : percentage >= 50 ? 'amber' : 'red'}">
                            <span class="rag-dot"></span>${percentage}% of target model
                        </span>
                    </div>
                    <div style="height:8px;background:#f3f4f6;border-radius:4px;margin-bottom:12px;">
                        <div style="height:100%;width:${percentage}%;background:${barColor};border-radius:4px;transition:width 0.3s;"></div>
                    </div>
                    <table class="tracker-table">
                        <thead><tr><th style="width:30px;">Met?</th><th>Capability</th><th>Notes / Gap</th></tr></thead>
                        <tbody>
                            ${caps.map(cap => {
                                const entry = wsCoverage[cap.id] || { met: false, notes: '' };
                                return `<tr>
                                    <td style="text-align:center;cursor:pointer;" onclick="toggleCapability('${ws.id}','${cap.id}')">
                                        ${entry.met ? '<span style="font-size:1.1rem;">✅</span>' : '<span style="font-size:1.1rem;">❌</span>'}
                                    </td>
                                    <td><strong>${cap.name}</strong></td>
                                    <td class="editable" ondblclick="editCapabilityNotes('${ws.id}','${cap.id}', this)" style="font-size:0.8rem;color:#6b7280;">
                                        ${entry.notes || '<em>click to add notes</em>'}
                                    </td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>`;
            }).join('')}
        </div>
    `;
}

function toggleCapability(wsId, capId) {
    if (!appData.targetModel.workstreamCoverage[wsId]) {
        appData.targetModel.workstreamCoverage[wsId] = {};
    }
    if (!appData.targetModel.workstreamCoverage[wsId][capId]) {
        appData.targetModel.workstreamCoverage[wsId][capId] = { met: false, notes: '' };
    }
    appData.targetModel.workstreamCoverage[wsId][capId].met = !appData.targetModel.workstreamCoverage[wsId][capId].met;
    saveData(appData);
    render();
}

function editCapabilityNotes(wsId, capId, cell) {
    if (!appData.targetModel.workstreamCoverage[wsId]) {
        appData.targetModel.workstreamCoverage[wsId] = {};
    }
    if (!appData.targetModel.workstreamCoverage[wsId][capId]) {
        appData.targetModel.workstreamCoverage[wsId][capId] = { met: false, notes: '' };
    }
    const entry = appData.targetModel.workstreamCoverage[wsId][capId];
    const textarea = document.createElement('textarea');
    textarea.value = entry.notes || '';
    textarea.style.cssText = 'width:100%;min-height:40px;font-size:0.8rem;padding:4px 6px;border:1px solid #3b82f6;border-radius:4px;font-family:inherit;resize:vertical;';
    cell.innerHTML = '';
    cell.appendChild(textarea);
    textarea.focus();
    const save = () => {
        entry.notes = textarea.value.trim();
        saveData(appData);
        render();
    };
    textarea.addEventListener('blur', save);
    textarea.addEventListener('keydown', (e) => { if (e.key === 'Escape') render(); });
}

function getWorkstreamModelPercentage(wsId) {
    const caps = appData.targetModel.capabilities;
    const wsCoverage = appData.targetModel.workstreamCoverage[wsId] || {};
    const metCount = caps.filter(c => wsCoverage[c.id] && wsCoverage[c.id].met).length;
    return Math.round((metCount / caps.length) * 100);
}

function editItemName(wsId, itemId, cell) {
    const ws = appData.workstreams.find(w => w.id === wsId);
    if (!ws) return;
    const items = ws.useCases || ws.integrations || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = item.name;
    input.style.cssText = 'width:100%;font-size:0.82rem;padding:4px 6px;border:1px solid #3b82f6;border-radius:4px;font-weight:600;';
    cell.innerHTML = '';
    cell.appendChild(input);
    input.focus();
    input.select();
    const save = () => {
        const val = input.value.trim();
        if (val) { item.name = val; saveData(appData); }
        render();
    };
    input.addEventListener('blur', save);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); save(); } if (e.key === 'Escape') render(); });
}

function editItemNotes(wsId, itemId, cell) {
    const ws = appData.workstreams.find(w => w.id === wsId);
    if (!ws) return;
    const items = ws.useCases || ws.integrations || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const textarea = document.createElement('textarea');
    textarea.value = item.notes || '';
    textarea.style.cssText = 'width:100%;min-height:60px;font-size:0.75rem;padding:4px 6px;border:1px solid #3b82f6;border-radius:4px;font-family:inherit;resize:vertical;';
    cell.innerHTML = '';
    cell.appendChild(textarea);
    textarea.focus();
    const save = () => {
        item.notes = textarea.value.trim();
        saveData(appData);
        render();
    };
    textarea.addEventListener('blur', save);
    textarea.addEventListener('keydown', (e) => { if (e.key === 'Escape') render(); });
}

function editItemOwner(wsId, itemId, cell) {
    const ws = appData.workstreams.find(w => w.id === wsId);
    if (!ws) return;
    const items = ws.useCases || ws.integrations || [];
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = item.itemOwner || '';
    input.style.cssText = 'width:100%;font-size:0.8rem;padding:4px 6px;border:1px solid #3b82f6;border-radius:4px;';
    cell.innerHTML = '';
    cell.appendChild(input);
    input.focus();
    input.select();
    const save = () => {
        item.itemOwner = input.value.trim();
        saveData(appData);
        render();
    };
    input.addEventListener('blur', save);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); save(); } if (e.key === 'Escape') render(); });
}

// WEEKLY UPDATES VIEW
function renderWeekly() {
    const updates = [...appData.weeklyUpdates].reverse();
    mainContent.innerHTML = `
        <div class="card">
            <div class="card-header">
                <span class="card-title">Submit Weekly Update</span>
            </div>
            <form class="update-form" onsubmit="submitUpdate(event)">
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
                    <div class="form-group">
                        <label>Owner</label>
                        <select id="update-owner" required>
                            <option value="">Select...</option>
                            <option value="Shrijan">Shrijan (ARTS / Program)</option>
                            <option value="Bosco">Bosco (Strategy / Pipeline)</option>
                            <option value="Isha">Isha (Tech / AERO App)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Week Ending</label>
                        <input type="date" id="update-date" required>
                    </div>
                    <div class="form-group">
                        <label>RAG Status</label>
                        <select id="update-rag">
                            <option value="green">🟢 On Track</option>
                            <option value="amber" selected>🟡 At Risk</option>
                            <option value="red">🔴 Blocked</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Summary (what happened this week)</label>
                    <textarea id="update-summary" placeholder="Key progress, blockers, decisions needed..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Next Steps / Upcoming Actions</label>
                    <textarea id="update-next-steps" placeholder="What's planned for next week..." style="min-height:60px;"></textarea>
                </div>
                <div class="form-group">
                    <label>Blockers / Risks</label>
                    <textarea id="update-blockers" placeholder="Any blockers or escalations needed..." style="min-height:60px;"></textarea>
                </div>
                <div class="form-group">
                    <label>Decision Needed? (if yes, describe)</label>
                    <textarea id="update-decision" placeholder="Leave blank if no decision needed..." style="min-height:60px;"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit Update</button>
            </form>
        </div>

        <div class="card">
            <div class="card-header">
                <span class="card-title">Update History</span>
                <span style="font-size:0.8rem;color:#6b7280;">${updates.length} updates</span>
            </div>
            ${updates.length === 0 ? '<p style="font-size:0.85rem;color:#6b7280;padding:8px 0;">No updates yet.</p>' :
            updates.map((u, i) => `
                <div class="update-entry ${i === 0 ? 'latest' : ''}">
                    <div class="update-date">${formatDate(u.date)} ${ragBadge(u.rag)}</div>
                    <div class="update-owner">${u.owner}</div>
                    <div class="update-text"><strong>Summary:</strong> ${u.summary}</div>
                    ${u.nextSteps ? `<div class="update-text" style="margin-top:6px;"><strong>Next Steps:</strong> ${u.nextSteps}</div>` : ''}
                    ${u.blockers ? `<div class="update-text" style="margin-top:6px;color:#991b1b;"><strong>Blockers:</strong> ${u.blockers}</div>` : ''}
                    ${u.decision ? `<div class="update-text" style="margin-top:6px;color:#92400e;"><strong>Decision Needed:</strong> ${u.decision}</div>` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

function submitUpdate(event) {
    event.preventDefault();
    const update = {
        id: Date.now().toString(),
        owner: document.getElementById('update-owner').value,
        date: document.getElementById('update-date').value,
        rag: document.getElementById('update-rag').value,
        summary: document.getElementById('update-summary').value,
        nextSteps: document.getElementById('update-next-steps').value,
        blockers: document.getElementById('update-blockers').value,
        decision: document.getElementById('update-decision').value,
        submittedAt: new Date().toISOString()
    };
    appData.weeklyUpdates.push(update);
    saveData(appData);
    render();
}

// DECISIONS VIEW
function renderDecisions() {
    const openDecisions = appData.decisions.filter(d => d.status === 'open');
    const resolvedDecisions = appData.decisions.filter(d => d.status === 'resolved');

    mainContent.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h2 class="section-title" style="margin-bottom:0;">Open Decisions (${openDecisions.length})</h2>
            <button class="btn btn-primary" onclick="addDecision()">+ Add Decision</button>
        </div>
        ${openDecisions.map(d => `
            <div class="decision-card">
                <div class="decision-header">
                    <div>
                        <div class="decision-title">⚠️ ${d.title}</div>
                        <div class="decision-meta">Owner: <strong>${d.owner}</strong> | Due: ${d.dueDate ? formatDate(d.dueDate) : 'Not set'}</div>
                    </div>
                    ${statusBadge('decision-needed')}
                </div>
                <div class="decision-description">${d.description}</div>
                <div style="display:flex;gap:8px;align-items:center;">
                    <input type="date" value="${d.dueDate || ''}" onchange="updateDecision('${d.id}','dueDate',this.value)" style="font-size:0.8rem;padding:6px 8px;border:1px solid #d1d5db;border-radius:4px;">
                    <input type="text" placeholder="Doc link..." value="${d.docLink || ''}" onchange="updateDecision('${d.id}','docLink',this.value)" style="font-size:0.8rem;padding:6px 8px;border:1px solid #d1d5db;border-radius:4px;flex:1;">
                    <button class="btn btn-secondary" onclick="resolveDecision('${d.id}')">Mark Resolved</button>
                </div>
            </div>
        `).join('')}

        ${resolvedDecisions.length > 0 ? `
            <h2 class="section-title" style="margin-top:32px;">Resolved Decisions (${resolvedDecisions.length})</h2>
            ${resolvedDecisions.map(d => `
                <div class="decision-card resolved">
                    <div class="decision-header">
                        <div>
                            <div class="decision-title">✅ ${d.title}</div>
                            <div class="decision-meta">Owner: ${d.owner} | Resolved: ${formatDate(d.resolvedDate)}</div>
                        </div>
                    </div>
                    <div class="decision-description">${d.resolution || d.description}</div>
                </div>
            `).join('')}
        ` : ''}
    `;
}

function addDecision() {
    const title = prompt('Decision title:');
    if (!title) return;
    const description = prompt('Description / context:');
    const owner = prompt('Owner (who needs to make this decision):');
    appData.decisions.push({
        id: Date.now().toString(),
        title, description: description || '', owner: owner || 'TBD',
        dueDate: '', status: 'open', docLink: '', resolution: ''
    });
    saveData(appData);
    render();
}

function updateDecision(id, field, value) {
    const decision = appData.decisions.find(d => d.id === id);
    if (decision) { decision[field] = value; saveData(appData); }
}

function resolveDecision(id) {
    const decision = appData.decisions.find(d => d.id === id);
    if (!decision) return;
    const resolution = prompt('Resolution / outcome:');
    if (resolution === null) return;
    decision.status = 'resolved';
    decision.resolution = resolution;
    decision.resolvedDate = new Date().toISOString();
    saveData(appData);
    render();
}

// LEADERSHIP VIEW
function renderLeadership() {
    const openDecisions = appData.decisions.filter(d => d.status === 'open');
    const latestUpdates = getLatestUpdatePerOwner();
    const deadlines = getUpcomingDeadlines().slice(0, 5);

    mainContent.innerHTML = `
        <div class="tabs">
            <button class="tab active" onclick="switchLeadershipTab('weekly-tooling')">Weekly Tooling Update</button>
            <button class="tab" onclick="switchLeadershipTab('nathalie')">Nathalie / Leadership</button>
        </div>

        <div id="leadership-content">
            ${renderWeeklyToolingView(latestUpdates, openDecisions, deadlines)}
        </div>
    `;
}

function switchLeadershipTab(tab) {
    document.querySelectorAll('.tabs .tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    const openDecisions = appData.decisions.filter(d => d.status === 'open');
    const latestUpdates = getLatestUpdatePerOwner();
    const deadlines = getUpcomingDeadlines().slice(0, 5);
    const container = document.getElementById('leadership-content');
    if (tab === 'weekly-tooling') {
        container.innerHTML = renderWeeklyToolingView(latestUpdates, openDecisions, deadlines);
    } else {
        container.innerHTML = renderNathalieView(latestUpdates, openDecisions);
    }
}

function renderWeeklyToolingView(latestUpdates, openDecisions, deadlines) {
    return `
        <div class="leadership-summary">
            <h2>2-Way Vendor Communications — Weekly Status</h2>
            <div class="exec-summary">
                <p><strong>Program RAG:</strong> ${ragBadge(getOverallRAG())}</p>
                <p><strong>Summary:</strong> 3 workstreams active (AERO App — short-term delivery in testing, ARTS Pipeline — long-term automated solution with Title Updates MVP, Pipeline & Strategy — exploratory integrations). ${openDecisions.length} decision(s) pending leadership input.</p>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="card">
                <div class="card-header"><span class="card-title">Latest Updates by Owner</span></div>
                ${latestUpdates.length === 0 ? '<p style="font-size:0.85rem;color:#6b7280;">No updates this week.</p>' :
                latestUpdates.map(u => `
                    <div class="update-entry latest" style="margin-bottom:12px;">
                        <div class="update-date">${formatDate(u.date)} ${ragBadge(u.rag)}</div>
                        <div class="update-owner">${u.owner}</div>
                        <div class="update-text">${u.summary}</div>
                        ${u.blockers ? `<div class="update-text" style="color:#991b1b;margin-top:4px;"><strong>Blockers:</strong> ${u.blockers}</div>` : ''}
                    </div>
                `).join('')}
            </div>
            <div class="card">
                <div class="card-header"><span class="card-title">Decisions Needing Input</span></div>
                ${openDecisions.length === 0 ? '<p style="font-size:0.85rem;color:#6b7280;">No open decisions.</p>' :
                openDecisions.map(d => `
                    <div style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
                        <strong style="font-size:0.85rem;">⚠️ ${d.title}</strong>
                        <p style="font-size:0.8rem;color:#6b7280;margin-top:2px;">Owner: ${d.owner} | Due: ${d.dueDate ? formatDate(d.dueDate) : 'Not set'}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="card" style="margin-top:16px;">
            <div class="card-header"><span class="card-title">Upcoming Deadlines</span></div>
            ${deadlines.length === 0 ? '<p style="font-size:0.85rem;color:#6b7280;">No deadlines set.</p>' :
            `<table class="tracker-table">
                <thead><tr><th>Workstream</th><th>Item</th><th>Milestone</th><th>Date</th><th>Days</th></tr></thead>
                <tbody>
                    ${deadlines.map(d => `<tr>
                        <td>${d.workstream}</td>
                        <td>${d.item}</td>
                        <td>${d.milestone}</td>
                        <td>${formatDate(d.date)}</td>
                        <td>${d.daysUntil < 0 ? `<span style="color:#dc2626;">${Math.abs(d.daysUntil)}d overdue</span>` : `${d.daysUntil}d`}</td>
                    </tr>`).join('')}
                </tbody>
            </table>`}
        </div>
    `;
}

function renderNathalieView(latestUpdates, openDecisions) {
    const aeroWs = appData.workstreams.find(w => w.id === 'aero-app');
    const artsWs = appData.workstreams.find(w => w.id === 'arts-team');
    const pipeWs = appData.workstreams.find(w => w.id === 'pipeline');

    return `
        <div class="leadership-summary">
            <h2>2-Way Vendor Communications — Leadership Summary</h2>
            <div class="exec-summary">
                <p><strong>Vision:</strong> Automate reactive vendor communications end-to-end across 80+ use case categories. Currently proving the architecture with Title Updates MVP before scaling. Target: 26 HC (OP2) working toward 50 HC year-end.</p>

                <p><strong>Current State:</strong></p>
                <table class="tracker-table" style="margin-bottom:16px;">
                    <thead><tr><th>Workstream</th><th>Status</th><th>Description</th><th>Key Risk</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><strong>AERO App</strong></td>
                            <td>${ragBadge(aeroWs.ragStatus)}</td>
                            <td>4 use cases built, in testing. Short-term proof of capability.</td>
                            <td>Architecture may not align with long-term vision</td>
                        </tr>
                        <tr>
                            <td><strong>ARTS Pipeline</strong></td>
                            <td>${ragBadge(artsWs.ragStatus)}</td>
                            <td>Title Updates MVP: BRD complete, awaiting Sapien integration.</td>
                            <td>Sapien team resistance; integration confirmation pending</td>
                        </tr>
                        <tr>
                            <td><strong>Pipeline & Strategy</strong></td>
                            <td>${ragBadge(pipeWs.ragStatus)}</td>
                            <td>Exploring integrations (Sapien, AERO, SF, Paragon). Key architectural decisions pending.</td>
                            <td>Multiple open decisions blocking long-term direction</td>
                        </tr>
                    </tbody>
                </table>

                <p><strong>Decisions Requiring Escalation/Input (${openDecisions.length}):</strong></p>
                ${openDecisions.map(d => `
                    <div style="padding:8px 12px;background:#fffbeb;border-radius:6px;margin-bottom:8px;border-left:3px solid #f59e0b;">
                        <strong>${d.title}</strong><br>
                        <span style="font-size:0.82rem;color:#6b7280;">${d.description}</span><br>
                        <span style="font-size:0.8rem;">Owner: ${d.owner} | Due: ${d.dueDate ? formatDate(d.dueDate) : '<span style="color:#dc2626;">Not set</span>'}</span>
                    </div>
                `).join('')}

                <p style="margin-top:16px;"><strong>Convergence Path:</strong> All workstreams aim toward a single automated pipeline. AERO App validates capability short-term while ARTS builds the target architecture. Pipeline track determines which integrations and architectural decisions shape the final solution.</p>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title">Phase Roadmap (Reference)</span></div>
            <table class="tracker-table">
                <thead><tr><th>Phase</th><th>Scope</th><th>Target</th><th>Status</th></tr></thead>
                <tbody>
                    <tr><td>Phase 1</td><td>Title Updates MVP (prove pipeline)</td><td>July 2026</td><td>${statusBadge('in-progress')}</td></tr>
                    <tr><td>Phase 2</td><td>8 additional CAU workflows + EU10 languages</td><td>August 2026</td><td>${statusBadge('not-started')}</td></tr>
                    <tr><td>Phase 3</td><td>All CAU use cases + all languages</td><td>September 2026</td><td>${statusBadge('not-started')}</td></tr>
                    <tr><td>Phase 4</td><td>Buyability Find & Fix</td><td>September 2026</td><td>${statusBadge('not-started')}</td></tr>
                    <tr><td>Phase 5</td><td>VC email removal (remove HITL)</td><td>December 2026</td><td>${statusBadge('not-started')}</td></tr>
                    <tr><td>Phase 6</td><td>Salesforce integration</td><td>2027</td><td>${statusBadge('not-started')}</td></tr>
                </tbody>
            </table>
        </div>
    `;
}

function getLatestUpdatePerOwner() {
    const owners = ['Shrijan', 'Bosco', 'Isha'];
    const latest = [];
    owners.forEach(owner => {
        const ownerUpdates = appData.weeklyUpdates.filter(u => u.owner === owner);
        if (ownerUpdates.length > 0) {
            latest.push(ownerUpdates[ownerUpdates.length - 1]);
        }
    });
    return latest;
}

function getOverallRAG() {
    const statuses = appData.workstreams.map(w => w.ragStatus);
    if (statuses.includes('red')) return 'red';
    if (statuses.includes('amber')) return 'amber';
    if (statuses.every(s => s === 'green')) return 'green';
    return 'grey';
}

// DATA SHARING

// Initialize
render();

// Add bottom toolbar
const toolbar = document.createElement('div');
toolbar.style.cssText = 'position:fixed;bottom:20px;right:20px;display:flex;flex-direction:row;gap:8px;align-items:center;z-index:1000;';
toolbar.innerHTML = `
    <select id="current-user" onchange="setCurrentUser(this.value)" style="padding:8px 12px;border-radius:8px;border:1px solid #d1d5db;font-size:0.82rem;font-weight:500;">
        <option value="">Who are you?</option>
        <option value="Nick">Nick</option>
        <option value="Shrijan">Shrijan</option>
        <option value="Bosco">Bosco</option>
        <option value="Isha">Isha</option>
    </select>
    <button class="export-btn" style="background:#3b82f6;" onclick="refreshFromGitHub()">🔄 Refresh</button>
    <button class="export-btn" style="background:#374151;" onclick="showTokenSetup()">🔑</button>
    <button class="export-btn" style="background:#374151;" onclick="resetData()">Reset</button>
`;
document.body.appendChild(toolbar);

// Set user dropdown from localStorage
const savedUser = localStorage.getItem('tracker-current-user');
if (savedUser) {
    document.getElementById('current-user').value = savedUser;
    appData.settings.currentUser = savedUser;
}

function setCurrentUser(name) {
    localStorage.setItem('tracker-current-user', name);
    appData.settings.currentUser = name;
    appData.settings.lastUpdatedBy = name;
}

async function refreshFromGitHub() {
    showToast('🔄 Refreshing...');
    const remoteData = await loadFromGitHub();
    if (remoteData) {
        appData = remoteData;
        localStorage.setItem('twoway-comms-tracker', JSON.stringify(appData));
        render();
        showToast('✅ Refreshed — showing latest data');
    } else {
        showToast('ℹ️ Already up to date');
    }
}
