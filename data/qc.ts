export const rawMaterialLots = [
  {
    batch: 'RM-CEF-250',
    supplier: 'BioSupplies',
    material: 'Cefuroxime Base',
    moisture: 1.8,
    coaReceived: true,
    status: 'Pending',
    receivedAt: '2024-11-18',
  },
  {
    batch: 'RM-MCC-320',
    supplier: 'Nordic Chem',
    material: 'MCC 102',
    moisture: 2.1,
    coaReceived: true,
    status: 'Approved',
    receivedAt: '2024-11-15',
  },
  {
    batch: 'RM-LAC-140',
    supplier: 'PurePlast',
    material: 'Lactose Monohydrate',
    moisture: 3.2,
    coaReceived: false,
    status: 'Quarantine',
    receivedAt: '2024-11-12',
  },
]

export const qcDashboardLots = [
  {
    id: 'QC-001',
    batch: 'FG-2201',
    product: 'PainRelief 500mg',
    stage: 'Finished Goods',
    status: 'Awaiting Release',
    analyst: 'J. Patel',
    priority: 'High',
    due: '2024-11-20',
  },
  {
    id: 'QC-002',
    batch: 'RM-CEF-250',
    product: 'Cefuroxime Base',
    stage: 'Raw Material',
    status: 'Pending',
    analyst: 'A. Bose',
    priority: 'Medium',
    due: '2024-11-21',
  },
  {
    id: 'QC-003',
    batch: 'IP-4411',
    product: 'PainRelief Blend',
    stage: 'In-Process',
    status: 'Retest',
    analyst: 'K. Rao',
    priority: 'Critical',
    due: '2024-11-19',
  },
  {
    id: 'QC-004',
    batch: 'FG-2198',
    product: 'ImmuneShield Syrup',
    stage: 'Finished Goods',
    status: 'Released',
    analyst: 'S. Ahmed',
    priority: 'Low',
    due: '2024-11-18',
  },
  {
    id: 'QC-005',
    batch: 'RM-LAC-140',
    product: 'Lactose Monohydrate',
    stage: 'Raw Material',
    status: 'Quarantine',
    analyst: 'M. Vega',
    priority: 'High',
    due: '2024-11-22',
  },
]

export const qcThroughputTrend = [
  { label: 'Mon', pass: 94, fail: 2, rework: 4 },
  { label: 'Tue', pass: 95, fail: 3, rework: 2 },
  { label: 'Wed', pass: 92, fail: 4, rework: 4 },
  { label: 'Thu', pass: 96, fail: 1, rework: 3 },
  { label: 'Fri', pass: 93, fail: 3, rework: 4 },
]

export const inProcessMetrics = [
  { time: '06:00', temp: 36.5, pressure: 1.1, line: 'Line 1' },
  { time: '09:00', temp: 37.2, pressure: 1.3, line: 'Line 1' },
  { time: '12:00', temp: 38.4, pressure: 1.4, line: 'Line 1' },
  { time: '15:00', temp: 37.8, pressure: 1.2, line: 'Line 1' },
]

export const inProcessLots = [
  {
    id: 'IP-4410',
    batch: 'Blend 24A',
    line: 'Line 1',
    stage: 'Granulation',
    temp: 37.1,
    torque: 18.3,
    status: 'Within Limits',
    analyst: 'M. Vega',
    timestamp: '09:20',
  },
  {
    id: 'IP-4411',
    batch: 'Compression 05C',
    line: 'Line 1',
    stage: 'Compression',
    temp: 36.8,
    torque: 17.5,
    status: 'Alert',
    analyst: 'L. Chen',
    timestamp: '11:05',
  },
  {
    id: 'IP-4412',
    batch: 'Coating 08B',
    line: 'Line 2',
    stage: 'Coating',
    temp: 39.2,
    torque: 14.1,
    status: 'Within Limits',
    analyst: 'H. Gomez',
    timestamp: '13:40',
  },
  {
    id: 'IP-4413',
    batch: 'Encap 12E',
    line: 'Line 3',
    stage: 'Encapsulation',
    temp: 37.9,
    torque: 19.4,
    status: 'Deviation',
    analyst: 'R. Malik',
    timestamp: '15:55',
  },
  {
    id: 'IP-4414',
    batch: 'Blend 25D',
    line: 'Line 2',
    stage: 'Granulation',
    temp: 36.4,
    torque: 16.8,
    status: 'Within Limits',
    analyst: 'S. Patel',
    timestamp: '16:20',
  },
]

export const finishedGoodsLots = [
  {
    lot: 'FG-2201',
    product: 'PainRelief 500mg',
    assay: 99.1,
    dissolution: 'Q=30',
    micro: 'Pass',
    status: 'Awaiting Release',
  },
  {
    lot: 'FG-2198',
    product: 'ImmuneShield Syrup',
    assay: 98.4,
    dissolution: 'Q=45',
    micro: 'Pass',
    status: 'Released',
  },
  {
    lot: 'FG-2202',
    product: 'CardioCap 150mg',
    assay: 97.8,
    dissolution: 'Q=35',
    micro: 'Pass',
    status: 'Awaiting Release',
  },
  {
    lot: 'FG-2203',
    product: 'GlucoseCare Sachet',
    assay: 100.2,
    dissolution: 'N/A',
    micro: 'Pass',
    status: 'On Hold',
  },
  {
    lot: 'FG-2204',
    product: 'ImmuneShield Syrup',
    assay: 98.7,
    dissolution: 'Q=40',
    micro: 'Pass',
    status: 'Released',
  },
  {
    lot: 'FG-2205',
    product: 'Allergy Relief 10mg',
    assay: 97.1,
    dissolution: 'Q=25',
    micro: 'Pass',
    status: 'Awaiting Release',
  },
]

export const qcPassTrend = [
  { week: 'W41', pass: 94, fail: 3, rework: 3 },
  { week: 'W42', pass: 92, fail: 5, rework: 3 },
  { week: 'W43', pass: 95, fail: 4, rework: 1 },
  { week: 'W44', pass: 93, fail: 4, rework: 3 },
]

export const qcTemplates = [
  { name: 'Assay - API A', version: 'v3.2', owner: 'QA Lab', status: 'Approved', steps: 12 },
  { name: 'Dissolution - Tablet 500mg', version: 'v2.5', owner: 'QA Lab', status: 'Draft', steps: 9 },
  { name: 'Microbial Limits - Syrup', version: 'v1.8', owner: 'Micro Lab', status: 'Approved', steps: 7 },
  { name: 'Content Uniformity - Capsule', version: 'v1.4', owner: 'QA Lab', status: 'Review', steps: 10 },
]

export const rejectedLots = [
  {
    id: 'RJ-1001',
    lot: 'RM-124',
    reason: 'Micro Failure',
    qty: 520,
    disposition: 'Destroy',
    capa: 'CAPA-302',
  },
  {
    id: 'RJ-1002',
    lot: 'FG-2102',
    reason: 'Assay Outlier',
    qty: 1100,
    disposition: 'Reprocess',
    capa: 'CAPA-305',
  },
]

export const samplingPlans = [
  { id: 'PLAN-01', product: 'Tablet 500mg', aql: '0.65', lotSize: '20k', status: 'Active' },
  { id: 'PLAN-02', product: 'Capsule 150mg', aql: '1.0', lotSize: '15k', status: 'Draft' },
  { id: 'PLAN-03', product: 'Syrup 100ml', aql: '0.4', lotSize: '8k', status: 'Active' },
]

export const coaLots = [
  {
    lot: 'FG-2201',
    product: 'PainRelief 500mg',
    tests: [
      { name: 'Assay', result: 99.1, limit: '98-102%' },
      { name: 'Dissolution', result: 'Q=30', limit: 'Q ≤ 30' },
      { name: 'Content Uniformity', result: 'Pass', limit: 'RSD ≤ 5%' },
    ],
    customer: 'Healix Pharma',
    batchSize: '120k tablets',
  },
  {
    lot: 'FG-2198',
    product: 'ImmuneShield Syrup',
    tests: [
      { name: 'Assay', result: 98.4, limit: '97-103%' },
      { name: 'Microbial', result: 'Pass', limit: 'Meets USP' },
    ],
    customer: 'Global Health Co.',
    batchSize: '18k bottles',
  },
]

export const qcReports = [
  { name: 'Weekly QC Summary', period: 'Nov 10-16', generated: '2024-11-17', format: 'PDF' },
  { name: 'Deviation Analysis', period: 'Nov 01-16', generated: '2024-11-16', format: 'XLSX' },
  { name: 'Sampling Effectiveness', period: 'Oct 15-Nov 15', generated: '2024-11-15', format: 'PDF' },
]

export const qcAuditTrail = [
  {
    id: 'AUD-5531',
    action: 'Result edited',
    user: 'J. Patel',
    timestamp: '14:23',
    severity: 'medium',
    details: { field: 'Assay', old: '98.8', new: '99.0' },
  },
  {
    id: 'AUD-5532',
    action: 'Template approved',
    user: 'QA Admin',
    timestamp: '09:45',
    severity: 'low',
    details: { template: 'Assay - API A', version: 'v3.2' },
  },
  {
    id: 'AUD-5533',
    action: 'COA exported',
    user: 'RegOps',
    timestamp: '08:05',
    severity: 'info',
    details: { lot: 'FG-2201', format: 'PDF' },
  },
  {
    id: 'AUD-5534',
    action: 'Result override',
    user: 'QA Lead',
    timestamp: '17:50',
    severity: 'high',
    details: { lot: 'FG-2203', reason: 'Deviations cleared' },
  },
]
