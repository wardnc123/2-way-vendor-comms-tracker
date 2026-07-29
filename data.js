// Data model - persisted to localStorage
const DEFAULT_DATA = {
    workstreams: [
        {
            id: 'aero-app',
            name: 'AERO App (Short-term Delivery)',
            owner: 'Isha',
            description: 'Desktop-hosted app where user logs in, drops email, and app executes task using their credentials/API access.',
            ragStatus: 'amber',
            useCases: [
                {
                    id: 'aero-cau',
                    name: 'Catalog Attribute Update',
                    status: 'in-progress',
                    milestones: [
                        { name: 'BRD', status: 'complete', date: '' },
                        { name: 'HLD', status: 'complete', date: '' },
                        { name: 'Development', status: 'complete', date: '' },
                        { name: 'Internal Testing', status: 'in-progress', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'Demoed successfully. Can understand intent, ask follow-up questions, take automated downstream actions.'
                },
                {
                    id: 'aero-po-shipment',
                    name: 'PO Shipment Window Update',
                    status: 'in-progress',
                    milestones: [
                        { name: 'BRD', status: 'complete', date: '' },
                        { name: 'HLD', status: 'complete', date: '' },
                        { name: 'Development', status: 'complete', date: '' },
                        { name: 'Internal Testing', status: 'in-progress', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: ''
                },
                {
                    id: 'aero-embargo',
                    name: 'Update Embargo',
                    status: 'in-progress',
                    milestones: [
                        { name: 'BRD', status: 'complete', date: '' },
                        { name: 'HLD', status: 'complete', date: '' },
                        { name: 'Development', status: 'complete', date: '' },
                        { name: 'Internal Testing', status: 'in-progress', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: ''
                },
                {
                    id: 'aero-theia',
                    name: 'Theia Accuracy Check',
                    status: 'in-progress',
                    milestones: [
                        { name: 'BRD', status: 'complete', date: '' },
                        { name: 'HLD', status: 'complete', date: '' },
                        { name: 'Development', status: 'complete', date: '' },
                        { name: 'Internal Testing', status: 'in-progress', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: ''
                }
            ]
        },
        {
            id: 'arts-team',
            name: 'ARTS Team (Long-term Automated Pipeline)',
            owner: 'Shrijan',
            description: 'Automated pipeline: email forwarded → AI reads → connects to right tool → resolves task. No human in the loop for execution.',
            ragStatus: 'amber',
            useCases: [
                {
                    id: 'arts-title',
                    name: 'Title Updates (MVP)',
                    status: 'in-progress',
                    milestones: [
                        { name: 'BRD', status: 'complete', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'BRD v2 complete (29/05/2026). Sapien integration confirmation pending.'
                },
                {
                    id: 'arts-bullet-points',
                    name: 'Bullet Point Updates',
                    status: 'not-started',
                    milestones: [
                        { name: 'BRD', status: 'not-started', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'Fast-follow after Title Updates MVP validated.'
                },
                {
                    id: 'arts-images',
                    name: 'Image Updates',
                    status: 'not-started',
                    milestones: [
                        { name: 'BRD', status: 'not-started', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'Part of 8 Sapien-supported workflows expansion.'
                },
                {
                    id: 'arts-descriptions',
                    name: 'Description Updates',
                    status: 'not-started',
                    milestones: [
                        { name: 'BRD', status: 'not-started', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'Part of 8 Sapien-supported workflows expansion.'
                },
                {
                    id: 'arts-brand-code',
                    name: 'Brand Code Updates',
                    status: 'not-started',
                    milestones: [
                        { name: 'BRD', status: 'not-started', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'Part of 8 Sapien-supported workflows expansion.'
                },
                {
                    id: 'arts-aplus',
                    name: 'A+ Content Updates',
                    status: 'not-started',
                    milestones: [
                        { name: 'BRD', status: 'not-started', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'Part of 8 Sapien-supported workflows expansion.'
                },
                {
                    id: 'arts-other-cau-1',
                    name: 'Other CAU Workflow 1',
                    status: 'not-started',
                    milestones: [
                        { name: 'BRD', status: 'not-started', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'TBD - define after Sapien launches.'
                },
                {
                    id: 'arts-other-cau-2',
                    name: 'Other CAU Workflow 2',
                    status: 'not-started',
                    milestones: [
                        { name: 'BRD', status: 'not-started', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'TBD - define after Sapien launches.'
                },
                {
                    id: 'arts-other-cau-3',
                    name: 'Other CAU Workflow 3',
                    status: 'not-started',
                    milestones: [
                        { name: 'BRD', status: 'not-started', date: '' },
                        { name: 'HLD', status: 'not-started', date: '' },
                        { name: 'Development', status: 'not-started', date: '' },
                        { name: 'Internal Testing', status: 'not-started', date: '' },
                        { name: 'UAT', status: 'not-started', date: '' },
                        { name: 'Launch', status: 'not-started', date: '' }
                    ],
                    notes: 'TBD - define after Sapien launches.'
                }
            ]
        },
        {
            id: 'pipeline',
            name: 'Pipeline & Strategy',
            owner: 'Bosco',
            description: 'Exploratory: i) Can we remove humans from the loop? ii) Build standalone agent vs. integrate with existing agents? Track integrations and partner alignment.',
            ragStatus: 'grey',
            integrations: [
                {
                    id: 'pipe-sapien',
                    name: 'Sapien Integration',
                    partner: 'IDQ/Catalog Sapien Team',
                    status: 'in-progress',
                    milestones: [
                        { name: 'Initial Contact', status: 'complete', date: '' },
                        { name: 'BRD Shared', status: 'in-progress', date: '' },
                        { name: 'API Access Confirmed', status: 'not-started', date: '' },
                        { name: 'Integration Design', status: 'not-started', date: '' },
                        { name: 'Integration Built', status: 'not-started', date: '' },
                        { name: 'Integration Tested', status: 'not-started', date: '' }
                    ],
                    humanInLoop: 'TBD',
                    notes: 'Sapien team initially resistant. Escalated to Nathalie. Nick sharing BRD.'
                },
                {
                    id: 'pipe-aero',
                    name: 'AERO Orchestration',
                    partner: 'AERO Team',
                    status: 'not-started',
                    milestones: [
                        { name: 'Initial Contact', status: 'complete', date: '' },
                        { name: 'Architecture Workshop', status: 'not-started', date: '' },
                        { name: 'Decision: Desktop vs Remote', status: 'not-started', date: '' },
                        { name: 'Integration Design', status: 'not-started', date: '' },
                        { name: 'Integration Built', status: 'not-started', date: '' },
                        { name: 'Integration Tested', status: 'not-started', date: '' }
                    ],
                    humanInLoop: 'Yes (currently)',
                    notes: 'Nick to hold meeting. 1-way vs 2-way door decision pending.'
                },
                {
                    id: 'pipe-salesforce',
                    name: 'Salesforce Integration',
                    partner: 'Salesforce Team',
                    status: 'not-started',
                    milestones: [
                        { name: 'Initial Exploration', status: 'in-progress', date: '' },
                        { name: 'Feasibility Assessment', status: 'not-started', date: '' },
                        { name: 'Decision Paper', status: 'not-started', date: '' },
                        { name: 'Leadership Approval', status: 'not-started', date: '' },
                        { name: 'Integration Design', status: 'not-started', date: '' },
                        { name: 'Integration Built', status: 'not-started', date: '' }
                    ],
                    humanInLoop: 'No (removes VC forwarding)',
                    notes: 'SF team resistant to small-scale integrations. OP1 2027 Big Bet.'
                },
                {
                    id: 'pipe-paragon',
                    name: 'Paragon Integration',
                    partner: 'Paragon Team / Michael Edwards',
                    status: 'not-started',
                    milestones: [
                        { name: 'Initial Exploration', status: 'in-progress', date: '' },
                        { name: 'Feasibility Assessment', status: 'not-started', date: '' },
                        { name: 'Decision Paper', status: 'not-started', date: '' },
                        { name: 'Leadership Approval', status: 'not-started', date: '' },
                        { name: 'Integration Design', status: 'not-started', date: '' },
                        { name: 'Integration Built', status: 'not-started', date: '' }
                    ],
                    humanInLoop: 'TBD',
                    notes: 'Under investigation as alternative channel.'
                },
                {
                    id: 'pipe-hitl',
                    name: 'Human-in-the-Loop Decision',
                    partner: 'Multiple Teams',
                    status: 'in-progress',
                    milestones: [
                        { name: 'Map teams requiring HITL', status: 'in-progress', date: '' },
                        { name: 'Document constraints per team', status: 'not-started', date: '' },
                        { name: 'Propose alternative models', status: 'not-started', date: '' },
                        { name: 'Decision Paper', status: 'not-started', date: '' },
                        { name: 'Leadership Decision', status: 'not-started', date: '' }
                    ],
                    humanInLoop: 'N/A - this IS the decision',
                    notes: 'Some teams have said they will not support removing humans from the loop.'
                },
                {
                    id: 'pipe-standalone-vs-integrate',
                    name: 'Build vs. Integrate Decision',
                    partner: 'Internal',
                    status: 'not-started',
                    milestones: [
                        { name: 'Map existing agents', status: 'not-started', date: '' },
                        { name: 'Gap analysis', status: 'not-started', date: '' },
                        { name: 'Cost/benefit of each approach', status: 'not-started', date: '' },
                        { name: 'Decision Paper', status: 'not-started', date: '' },
                        { name: 'Leadership Decision', status: 'not-started', date: '' }
                    ],
                    humanInLoop: 'N/A',
                    notes: 'Standalone 2-way comms agent vs. building on top of existing agents.'
                }
            ]
        }
    ],
    targetModel: {
        capabilities: [
            { id: 'cap-1', name: 'Email Ingestion', description: 'Ability to programmatically read incoming vendor emails from a shared queue/inbox', status: 'not-started' },
            { id: 'cap-2', name: 'Intent Classification', description: 'Ability to understand the intent of the email (e.g., title update, bullet point update, CAU request)', status: 'not-started' },
            { id: 'cap-3', name: 'Completeness Validation', description: 'Ability to check whether all required information is present (ASIN, title text, etc.) and identify what is missing', status: 'not-started' },
            { id: 'cap-4', name: 'Vendor Authentication', description: 'Ability to verify the vendor is authorised to modify the ASIN (vendor ID matching in catalogue system)', status: 'not-started' },
            { id: 'cap-5', name: 'Task Creation', description: 'Ability to create a structured task/payload from the extracted entities (ASIN, title, vendor ID, etc.)', status: 'not-started' },
            { id: 'cap-6', name: 'Execution Routing', description: 'Ability to send the task to the correct execution agent (Sapien, AERO, or other)', status: 'not-started' },
            { id: 'cap-7', name: 'Result Validation', description: 'Ability to validate the execution agent\'s results (success/failure, correctness)', status: 'not-started' },
            { id: 'cap-8', name: 'Response Communication', description: 'Ability to send an email back to confirm completion or request more information', status: 'not-started' },
            { id: 'cap-9', name: 'Escalation / Fallback Handling', description: 'Ability to gracefully hand off to a human via Salesforce task with full context when any step fails (low confidence, missing info, system error)', status: 'not-started' },
            { id: 'cap-10', name: 'Audit Logging', description: 'Every processing attempt logged with full context: intent, entities, actions taken, outcomes, and errors for debugging and trust', status: 'not-started' }
        ],
        workstreamCoverage: {
            'aero-app': {
                'cap-1': { met: false, notes: 'User manually drops email into app — no automated email reading' },
                'cap-2': { met: true, notes: 'App can understand intent from pasted email content' },
                'cap-3': { met: false, notes: 'No automated completeness check — user validates manually' },
                'cap-4': { met: false, notes: 'No vendor ownership verification — relies on user credentials' },
                'cap-5': { met: true, notes: 'App creates structured task from extracted entities' },
                'cap-6': { met: true, notes: 'App routes to downstream execution (uses user credentials)' },
                'cap-7': { met: false, notes: 'No automated validation of results yet' },
                'cap-8': { met: false, notes: 'No automated email response — user communicates manually' },
                'cap-9': { met: false, notes: 'No fallback mechanism — user handles failures manually' },
                'cap-10': { met: false, notes: 'No audit logging implemented' }
            },
            'arts-team': {
                'cap-1': { met: false, notes: 'VC forwards email to dedicated inbox — not fully automated yet' },
                'cap-2': { met: true, notes: 'Agent-side LLM classifies intent (Title Updates MVP)' },
                'cap-3': { met: true, notes: 'System validates ASIN present, title text present, char limits' },
                'cap-4': { met: false, notes: 'Designed in BRD (FR-15) but not yet built' },
                'cap-5': { met: true, notes: 'LLM extracts entities and creates structured payload' },
                'cap-6': { met: false, notes: 'Sapien integration pending confirmation' },
                'cap-7': { met: false, notes: 'Depends on Sapien callback — not built yet' },
                'cap-8': { met: false, notes: 'Two-email pattern designed but not implemented yet' },
                'cap-9': { met: false, notes: 'Salesforce task fallback designed but not implemented' },
                'cap-10': { met: false, notes: 'Audit trail requirement defined (FR-14) but not built' }
            },
            'pipeline': {
                'cap-1': { met: false, notes: 'Exploring Salesforce, Paragon, AERO desktop as ingestion channels' },
                'cap-2': { met: false, notes: 'Dependent on ARTS team delivery' },
                'cap-3': { met: false, notes: 'Dependent on ARTS team delivery' },
                'cap-4': { met: false, notes: 'Not yet defined' },
                'cap-5': { met: false, notes: 'Dependent on ARTS team delivery' },
                'cap-6': { met: false, notes: 'AERO orchestration workshop pending' },
                'cap-7': { met: false, notes: 'Not yet defined' },
                'cap-8': { met: false, notes: 'Not yet defined' },
                'cap-9': { met: false, notes: 'Not yet defined' },
                'cap-10': { met: false, notes: 'Not yet defined' }
            }
        }
    },
    decisions: [
        {
            id: 'dec-1',
            title: 'AERO Desktop App vs. Remote Agent Architecture',
            description: 'If AERO desktop app is selected, the entire architecture changes (agent on user laptop vs. remote agent). Is this a 1-way or 2-way door decision?',
            owner: 'Nick',
            dueDate: '',
            status: 'open',
            docLink: '',
            resolution: ''
        },
        {
            id: 'dec-2',
            title: 'Human-in-the-Loop Requirement',
            description: 'Some teams have stated they will not support removing humans from the loop. We need to define an alternative model for these cases.',
            owner: 'Bosco',
            dueDate: '',
            status: 'open',
            docLink: '',
            resolution: ''
        },
        {
            id: 'dec-3',
            title: 'Standalone Agent vs. Integration with Existing Agents',
            description: 'Should we build a standalone 2-way vendor communication agent or work directly with other teams to build on top of existing agents?',
            owner: 'Bosco',
            dueDate: '',
            status: 'open',
            docLink: '',
            resolution: ''
        },
        {
            id: 'dec-4',
            title: 'Ingestion Channel Selection',
            description: 'Dedicated inbox + VC forwarding (selected for MVP), AERO Desktop App, Paragon, PEARL, or Salesforce integration. Need to confirm long-term path.',
            owner: 'Nick',
            dueDate: '',
            status: 'open',
            docLink: '',
            resolution: ''
        },
        {
            id: 'dec-5',
            title: 'Sapien Integration Confirmation',
            description: 'IDQ/Catalog Sapien team needs to confirm that an attribute update execution agent will integrate with our tool. Currently resistant.',
            owner: 'Nick / Nathalie',
            dueDate: '',
            status: 'open',
            docLink: '',
            resolution: ''
        }
    ],
    weeklyUpdates: [],
    settings: {
        lastUpdated: null,
        programStartDate: '2026-05-01'
    }
};

// ============================================================
// GITHUB CONFIG
// ============================================================
const GITHUB_CONFIG = {
    owner: 'wardnc123',
    repo: '2-way-vendor-comms-tracker',
    filePath: 'tracker-data.json',
    branch: 'main'
};

// Token is stored in browser localStorage — never in the code
function getToken() {
    return localStorage.getItem('tracker-github-token') || '';
}

function setToken(token) {
    localStorage.setItem('tracker-github-token', token);
}

function hasToken() {
    return !!getToken();
}

function showTokenSetup() {
    const overlay = document.createElement('div');
    overlay.id = 'token-setup-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;';
    overlay.innerHTML = `
        <div style="background:#fff;border-radius:12px;padding:32px;max-width:500px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <h2 style="font-size:1.2rem;margin-bottom:8px;">🔑 Setup Required</h2>
            <p style="font-size:0.85rem;color:#6b7280;margin-bottom:16px;">
                To enable saving, paste your GitHub Personal Access Token below. 
                This is stored only in your browser — never uploaded anywhere.
                <br><br>
                <strong>Only one person needs to do this</strong> (the person who manages the tracker). 
                Ask Nick if you don't have the token.
            </p>
            <input type="password" id="token-input" placeholder="github_pat_..." 
                style="width:100%;padding:12px;border:1px solid #d1d5db;border-radius:6px;font-size:0.9rem;font-family:monospace;margin-bottom:12px;">
            <div style="display:flex;gap:8px;">
                <button onclick="saveToken()" style="padding:10px 20px;background:#3b82f6;color:#fff;border:none;border-radius:6px;font-size:0.85rem;font-weight:600;cursor:pointer;">Save Token</button>
                <button onclick="skipToken()" style="padding:10px 20px;background:#f3f4f6;color:#374151;border:none;border-radius:6px;font-size:0.85rem;font-weight:600;cursor:pointer;">Skip (read-only)</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function saveToken() {
    const input = document.getElementById('token-input');
    const token = input.value.trim();
    if (!token) { alert('Please paste a token'); return; }
    setToken(token);
    document.getElementById('token-setup-overlay').remove();
    showToast('✅ Token saved! You can now edit the tracker.');
    initFromGitHub();
}

function skipToken() {
    localStorage.setItem('tracker-token-skipped', 'true');
    document.getElementById('token-setup-overlay').remove();
    showToast('ℹ️ Read-only mode. Edits will only be saved locally.');
}
// ============================================================

// GitHub API functions
async function loadFromGitHub() {
    try {
        const token = getToken();
        const headers = { 'Accept': 'application/vnd.github.v3+json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.filePath}?ref=${GITHUB_CONFIG.branch}`,
            { headers }
        );
        if (response.status === 404) {
            console.log('No tracker-data.json found in repo. Using defaults.');
            return null;
        }
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const data = await response.json();
        window._githubFileSha = data.sha;
        const content = atob(data.content);
        return JSON.parse(content);
    } catch (err) {
        console.error('Failed to load from GitHub:', err);
        return null;
    }
}

async function saveToGitHub(data) {
    const token = getToken();
    if (!token) {
        throw new Error('No token configured. Click the 🔑 button to set up.');
    }
    try {
        // Always fetch the latest SHA before saving to avoid conflicts
        const shaResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.filePath}?ref=${GITHUB_CONFIG.branch}`,
            { headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' } }
        );
        if (shaResponse.ok) {
            const shaData = await shaResponse.json();
            window._githubFileSha = shaData.sha;
        }

        const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
        const body = {
            message: `Update tracker - ${new Date().toLocaleString()} by ${data.settings.lastUpdatedBy || 'Unknown'}`,
            content: content,
            branch: GITHUB_CONFIG.branch
        };
        if (window._githubFileSha) {
            body.sha = window._githubFileSha;
        }
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.filePath}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || `HTTP ${response.status}`);
        }
        const result = await response.json();
        window._githubFileSha = result.content.sha;
        return true;
    } catch (err) {
        console.error('Failed to save to GitHub:', err);
        throw err;
    }
}

// Storage management
let _saveTimeout = null;

function loadData() {
    const stored = localStorage.getItem('twoway-comms-tracker');
    if (stored) {
        const parsed = JSON.parse(stored);
        return migrateData(parsed);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
    data.settings.lastUpdated = new Date().toISOString();
    // Save to localStorage immediately (fast local cache)
    localStorage.setItem('twoway-comms-tracker', JSON.stringify(data));
    // Debounce GitHub saves (wait 2 seconds after last edit)
    showSaveIndicator('saving');
    if (_saveTimeout) clearTimeout(_saveTimeout);
    _saveTimeout = setTimeout(async () => {
        try {
            await saveToGitHub(data);
            showSaveIndicator('saved');
            setTimeout(hideSaveIndicator, 2000);
        } catch (err) {
            showSaveIndicator('error', err.message);
        }
    }, 2000);
}

function showSaveIndicator(state, errorMsg) {
    let indicator = document.getElementById('save-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'save-indicator';
        indicator.style.cssText = 'position:fixed;top:20px;right:20px;padding:10px 16px;border-radius:8px;font-size:0.82rem;z-index:2000;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);transition:all 0.3s;';
        document.body.appendChild(indicator);
    }
    if (state === 'saving') {
        indicator.style.background = '#dbeafe';
        indicator.style.border = '1px solid #3b82f6';
        indicator.style.color = '#1e40af';
        indicator.innerHTML = '⏳ Saving...';
        indicator.style.display = 'flex';
    } else if (state === 'saved') {
        indicator.style.background = '#dcfce7';
        indicator.style.border = '1px solid #22c55e';
        indicator.style.color = '#166534';
        indicator.innerHTML = '✅ Saved';
        indicator.style.display = 'flex';
    } else if (state === 'error') {
        indicator.style.background = '#fee2e2';
        indicator.style.border = '1px solid #ef4444';
        indicator.style.color = '#991b1b';
        indicator.innerHTML = `❌ Save failed: ${errorMsg || 'Unknown error'} <button onclick="retrySave()" style="margin-left:8px;background:#ef4444;color:#fff;border:none;padding:4px 10px;border-radius:4px;font-size:0.75rem;cursor:pointer;">Retry</button>`;
        indicator.style.display = 'flex';
    }
}

function hideSaveIndicator() {
    const indicator = document.getElementById('save-indicator');
    if (indicator) indicator.style.display = 'none';
}

async function retrySave() {
    showSaveIndicator('saving');
    try {
        await saveToGitHub(appData);
        showSaveIndicator('saved');
        setTimeout(hideSaveIndicator, 2000);
    } catch (err) {
        showSaveIndicator('error', err.message);
    }
}

function resetData() {
    if (confirm('This will reset all data to defaults. Are you sure?')) {
        localStorage.removeItem('twoway-comms-tracker');
        appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        saveData(appData);
        location.reload();
    }
}

function showToast(message) {
    const existing = document.querySelector('.toast-msg');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.style.cssText = 'position:fixed;bottom:70px;right:20px;background:#1a1a2e;color:#fff;padding:12px 20px;border-radius:8px;font-size:0.85rem;z-index:2000;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Initial load — fetch from GitHub, fall back to localStorage
let appData = loadData();

async function initFromGitHub() {
    const remoteData = await loadFromGitHub();
    if (remoteData) {
        appData = migrateData(remoteData);
        localStorage.setItem('twoway-comms-tracker', JSON.stringify(appData));
        render();
        showToast('✅ Loaded latest data from shared tracker');
    } else if (!localStorage.getItem('twoway-comms-tracker')) {
        // First time — if we have a token, push defaults to GitHub
        appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
        if (hasToken()) {
            await saveToGitHub(appData);
        }
        render();
    } else {
        // Have localStorage but no remote — migrate local and render
        appData = migrateData(appData);
        render();
    }

    // Show token setup if no token and user hasn't skipped
    if (!hasToken() && !localStorage.getItem('tracker-token-skipped')) {
        showTokenSetup();
    }
}

// Ensures any new fields from DEFAULT_DATA are present in loaded data
function migrateData(data) {
    // Add targetModel if missing
    if (!data.targetModel) {
        data.targetModel = JSON.parse(JSON.stringify(DEFAULT_DATA.targetModel));
    }
    // Ensure all capabilities exist
    if (data.targetModel.capabilities.length < DEFAULT_DATA.targetModel.capabilities.length) {
        data.targetModel.capabilities = JSON.parse(JSON.stringify(DEFAULT_DATA.targetModel.capabilities));
    }
    // Ensure workstreamCoverage has all workstreams
    DEFAULT_DATA.workstreams.forEach(ws => {
        if (!data.targetModel.workstreamCoverage[ws.id]) {
            data.targetModel.workstreamCoverage[ws.id] = JSON.parse(JSON.stringify(DEFAULT_DATA.targetModel.workstreamCoverage[ws.id] || {}));
        }
    });
    // Ensure all workstreams exist
    DEFAULT_DATA.workstreams.forEach(defaultWs => {
        if (!data.workstreams.find(ws => ws.id === defaultWs.id)) {
            data.workstreams.push(JSON.parse(JSON.stringify(defaultWs)));
        }
    });
    // Ensure decisions exist
    if (!data.decisions) data.decisions = JSON.parse(JSON.stringify(DEFAULT_DATA.decisions));
    // Ensure weeklyUpdates exists
    if (!data.weeklyUpdates) data.weeklyUpdates = [];
    // Ensure settings exists
    if (!data.settings) data.settings = JSON.parse(JSON.stringify(DEFAULT_DATA.settings));
    return data;
}

initFromGitHub();
