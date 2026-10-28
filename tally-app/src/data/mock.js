// Centralized mock data mirroring the original prototype screens.
// Swap these exports for API calls when a backend is available.

export const USER = { name: 'Ama Mensah', role: 'Regional Sales Manager', initials: 'AM' }

export const CHAT_HISTORY = [
  { group: 'Today', items: [
    { id: 'q3-west-quota', title: 'Q3 West quota misses' },
    { id: 'pipeline-coverage', title: 'Pipeline coverage for Q4' },
    { id: 'discount-levels', title: 'Discount levels by rep' },
  ] },
  { group: 'Last 7 days', items: [
    { id: 'top-accounts-arr', title: 'Top 10 accounts by ARR' },
    { id: 'stalled-deals', title: 'Stalled deals over 45 days' },
  ] },
]

export const CHAT_CONTEXT_FILES = [
  { name: 'Q3_pipeline_west.csv', meta: '4.2k' },
  { name: 'win_rate_by_rep.xlsx', meta: '310' },
  { name: 'renewals_q3.csv', meta: '1.1k' },
  { name: 'rep_notes_sept.pdf', meta: '18 pp' },
]

export const SOURCES = [
  {
    n: 1,
    file: 'Q3_pipeline_west.csv',
    type: 'CSV',
    loc: 'Rows 212–219 · Opportunities',
    score: '0.91',
    snippet:
      'Northwind Logistics · Negotiation · close date 2026-09-28 → 2026-10-17 · note: procurement review',
  },
  {
    n: 2,
    file: 'win_rate_by_rep.xlsx',
    type: 'XLSX',
    loc: 'Sheet “Q3” · B14:F14',
    score: '0.87',
    snippet: 'Boateng, K. · Enterprise win rate · Q2 31.0% · Q3 19.4%',
  },
  {
    n: 3,
    file: 'renewals_q3.csv',
    type: 'CSV',
    loc: 'Rows 44–51 · Renewals',
    score: '0.84',
    snippet: 'Hartmann territory · 2 non-renewals (Aster Retail, Bluefin Co) · reason: pricing',
  },
  {
    n: 4,
    file: 'rep_notes_sept.pdf',
    type: 'PDF',
    loc: 'Page 3 · Rep notes',
    score: '0.79',
    snippet: 'Ramos — Cobalt Health ($60K) closed lost to competitor after final pricing round.',
  },
]

export const ANSWER = {
  question: 'Which reps missed quota in Q3, and what drove the gap?',
  retrieval: 'searched 4 sources · 12 passages · 2.1s',
  intro:
    'Three of seven West reps finished Q3 below quota. Combined, they closed $971,700 against $1.2M in quota.',
  table: [
    { rep: 'Kofi Boateng', quota: '$420,000', closed: '$318,500', attainment: '76%' },
    { rep: 'Lena Hartmann', quota: '$380,000', closed: '$301,200', attainment: '79%' },
    { rep: 'Diego Ramos', quota: '$400,000', closed: '$352,000', attainment: '88%' },
  ],
  drivers: [
    {
      text: 'Two late-stage Northwind Logistics deals ($92K) slipped to Q4 after a procurement review.',
      cite: 1,
    },
    { text: "Kofi's enterprise win rate fell from 31% in Q2 to 19% in Q3.", cite: 2 },
    { text: "Lena's territory lost two renewals; both churn notes cite pricing.", cite: 3 },
    {
      text: 'Diego was on pace until a $60K Cobalt Health deal was lost to a competitor in September.',
      cite: 4,
    },
  ],
  followups: [
    'Break down Kofi’s lost enterprise deals',
    'Which slipped deals are likely to close in Q4?',
    'Compare West attainment with other regions',
  ],
}

export const NEW_CHAT_PROMPTS = [
  { kind: 'Performance', text: 'Who is furthest behind quota this quarter, and why?' },
  { kind: 'Pipeline', text: 'Which open deals over $50K have no activity in 30 days?' },
  { kind: 'Forecast', text: 'How does commit compare to best case for Q4?' },
  { kind: 'Accounts', text: 'Which renewals are at risk next quarter?' },
]

export const RECENTLY_INGESTED = [
  { type: 'PDF', name: 'rep_notes_sept.pdf' },
  { type: 'CSV', name: 'renewals_q3.csv' },
  { type: 'XLSX', name: 'win_rate_by_rep.xlsx' },
]

export const LIBRARY_STATS = [
  { label: 'Documents', value: '212' },
  { label: 'Chunks', value: '48,310' },
  { label: 'Processing', value: '3' },
  { label: 'Need attention', value: '2' },
]

export const LIBRARY_DOCS = [
  { type: 'PDF', name: 'rep_notes_sept.pdf', source: 'Shared drive', chunks: '64', when: 'Today, 16:40', st: 'ready' },
  { type: 'CSV', name: 'Q3_pipeline_west.csv', source: 'Shared drive', chunks: '4,212', when: 'Today, 16:38', st: 'ready' },
  { type: 'DOCX', name: 'forecast_call_oct14.docx', source: 'Shared drive', chunks: '—', when: 'Now', st: 'processing' },
  { type: 'PPTX', name: 'QBR_deck_west.pptx', source: 'Shared drive', chunks: '—', when: 'Now', st: 'processing' },
  { type: 'XLSX', name: 'win_rate_by_rep.xlsx', source: 'Shared drive', chunks: '310', when: 'Oct 20', st: 'ready' },
  { type: 'CSV', name: 'renewals_q3.csv', source: 'CRM — Renewals', chunks: '1,104', when: 'Oct 20', st: 'ready' },
  { type: 'PDF', name: 'scanned_contract_bluefin.pdf', source: 'Email attachments', chunks: '0', when: 'Oct 19', st: 'failed' },
  { type: 'XLSX', name: 'commission_calc_aug.xlsx', source: 'Uploads', chunks: '—', when: 'Oct 18', st: 'failed' },
]

export const LIBRARY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ready', label: 'Ready' },
  { id: 'processing', label: 'Processing' },
  { id: 'failed', label: 'Needs attention' },
]

export const SOURCE_CONNECTIONS = [
  { name: 'Shared drive', count: '1,284' },
  { name: 'CRM — Opportunities', count: '18.4k' },
  { name: 'Email attachments', count: '362' },
  { name: 'Uploads', count: '41' },
]

export const BROWSE_FILES = [
  { id: 1, name: 'Q3_pipeline_east.csv', type: 'CSV', size: '1.6 MB', kb: 1600, modified: 'Oct 2, 2026', owner: 'Rev Ops', status: 'Not yet' },
  { id: 2, name: 'forecast_call_oct14.docx', type: 'DOCX', size: '220 KB', kb: 220, modified: 'Oct 14, 2026', owner: 'Ama Mensah', status: 'Not yet' },
  { id: 3, name: 'Q3_pipeline_west.csv', type: 'CSV', size: '1.8 MB', kb: 1800, modified: 'Oct 2, 2026', owner: 'Rev Ops', status: 'Indexed' },
  { id: 4, name: 'QBR_deck_west.pptx', type: 'PPTX', size: '5.4 MB', kb: 5400, modified: 'Oct 9, 2026', owner: 'Ama Mensah', status: 'Not yet' },
  { id: 5, name: 'territory_plan_2026.pdf', type: 'PDF', size: '2.1 MB', kb: 2100, modified: 'Jan 18, 2026', owner: 'Sales Ops', status: 'Not yet' },
  { id: 6, name: 'win_rate_by_rep.xlsx', type: 'XLSX', size: '340 KB', kb: 340, modified: 'Oct 3, 2026', owner: 'Rev Ops', status: 'Indexed' },
  { id: 7, name: 'comp_plan_Q3.pdf', type: 'PDF', size: '860 KB', kb: 860, modified: 'Jul 1, 2026', owner: 'Finance', status: 'Not yet' },
  { id: 8, name: 'renewals_q3.csv', type: 'CSV', size: '410 KB', kb: 410, modified: 'Oct 5, 2026', owner: 'CS Ops', status: 'Indexed' },
  { id: 9, name: 'rep_notes_sept.pdf', type: 'PDF', size: '1.2 MB', kb: 1200, modified: 'Sep 30, 2026', owner: 'Ama Mensah', status: 'Indexed' },
]

export const INGEST_STAGES = [
  { step: '1 · Read', detail: 'Text, tables, slides' },
  { step: '2 · Chunk', detail: 'Rows & sections' },
  { step: '3 · Embed', detail: 'Vector + keyword' },
  { step: '4 · Ready', detail: 'Searchable in chat' },
]

export const CONNECTION_CARDS = [
  {
    id: 'shared-drive',
    icon: 'folder',
    name: 'Shared drive',
    sub: 'sales-team@ · 3 folders auto-sync',
    statusLabel: 'Synced 12 min ago',
    statusOk: true,
    stats: [
      { label: 'Files', value: '1,284' },
      { label: 'Indexed', value: '146' },
      { label: 'Auto-sync', value: 'Q3 Reviews, Forecasts', small: true },
    ],
    browseLabel: 'Browse files',
  },
  {
    id: 'crm',
    icon: 'person',
    name: 'CRM',
    sub: 'Opportunities, Accounts, Renewals',
    statusLabel: 'Synced 1h ago',
    statusOk: true,
    stats: [
      { label: 'Records', value: '18,402' },
      { label: 'Objects', value: '3' },
      { label: 'Schedule', value: 'Hourly', small: true },
    ],
    browseLabel: 'Browse records',
  },
  {
    id: 'email',
    icon: 'mail',
    name: 'Email attachments',
    sub: 'Forwarded to reports@ inbox',
    statusLabel: '1 file failed',
    statusOk: false,
    stats: [
      { label: 'Files', value: '362' },
      { label: 'Indexed', value: '24' },
      { label: 'Auto-sync', value: 'Off', small: true },
    ],
    browseLabel: 'Browse files',
    secondary: { label: 'Review failure', to: '/library' },
  },
  {
    id: 'uploads',
    icon: 'upload',
    name: 'Uploads',
    sub: 'Files added by hand or drag-and-drop',
    statusLabel: 'Ready',
    statusOk: true,
    stats: [
      { label: 'Files', value: '41' },
      { label: 'Indexed', value: '40' },
      { label: 'Max size', value: '100 MB / file', small: true },
    ],
    actionOnly: 'Upload files',
  },
]

export const ADD_CONNECTIONS = [
  { name: 'Data warehouse', desc: 'Query tables directly, read-only' },
  { name: 'Spreadsheet workspace', desc: 'Live sheets, re-indexed on edit' },
  { name: 'Team chat', desc: 'Deal channels and threads' },
  { name: 'Call recordings', desc: 'Transcripts from sales calls' },
  { name: 'Support tickets', desc: 'Product feedback tied to accounts' },
  { name: 'BI dashboards', desc: 'Snapshot metrics and definitions' },
]

export const DOC_CHUNKS = [
  {
    id: 22,
    page: 3,
    tokens: 388,
    text: 'Boateng — Northwind Logistics expansion still in negotiation. Legal redlines returned Sept 22; customer procurement has requested a second security review before signature.',
    tag: 'cited in chat [1]',
    cited: true,
  },
  {
    id: 23,
    page: 3,
    tokens: 356,
    text: 'Ramos — lost Cobalt Health ($60K) to competitor after final pricing round. Buyer cited a lower per-seat price and bundled onboarding. Diego requested a win/loss review with product marketing.',
    tag: 'cited in chat [4]',
    cited: true,
  },
  {
    id: 24,
    page: 3,
    tokens: 402,
    text: 'Team-wide: discounting above 15% now requires RVP approval. Average discount on closed-won deals in September was 11.8%, down from 14.2% in August.',
    tag: 'retrieved, not cited',
    cited: false,
  },
  {
    id: 25,
    page: 4,
    tokens: 297,
    text: 'Okafor — two new enterprise opportunities sourced from the partner channel; both in discovery. Expect qualification decisions by mid-October.',
    tag: 'not retrieved',
    cited: false,
  },
]

export const DOC_META = [
  ['Source', 'Shared drive'],
  ['Owner', 'Ama Mensah'],
  ['Last modified', 'Sep 30, 2026'],
  ['Indexed', 'Oct 21, 2026 · 16:40 · 9.4s'],
  ['Chunking', 'by section · 400 tok · 60 overlap'],
  ['Sync', 'Re-index when the source file changes'],
  ['Who can query', 'Same as source file permissions'],
]

export const DOC_PAGE_TEXT = {
  3: {
    heading: 'Deal reviews, weeks 37–39',
    paragraphs: [
      'Boateng — Northwind Logistics expansion still in negotiation. Legal redlines returned Sept 22; customer procurement has requested a second security review before signature. Next step booked for Oct 3.',
      '__CITE__Ramos — lost Cobalt Health ($60K) to competitor after final pricing round. Buyer cited a lower per-seat price and bundled onboarding. Diego requested a win/loss review with product marketing.__',
      'Hartmann — Aster Retail renewal at risk; champion has left the company. Pricing concerns raised again on the Sept 24 call. Bluefin Co confirmed they will not renew.',
      '__DASH__Team-wide: discounting above 15% now requires RVP approval. Average discount on closed-won deals in September was 11.8%, down from 14.2% in August.__',
      'Okafor — two new enterprise opportunities sourced from the partner channel; both in discovery. Expect qualification decisions by mid-October.',
    ],
  },
}

export const CITED_IN = [
  { title: 'Q3 West quota misses', when: 'Today', to: '/chat/q3-west-quota' },
  { title: 'Discount levels by rep', when: 'Today', to: '/chat/discount-levels' },
]

export const TEAM_MEMBERS = [
  { name: 'Ama Mensah', role: 'Regional Sales Manager', perm: 'Admin' },
  { name: 'Kwame Asante', role: 'Revenue Operations', perm: 'Editor' },
  { name: 'Priya Nair', role: 'Sales Manager, East', perm: 'Viewer' },
]
