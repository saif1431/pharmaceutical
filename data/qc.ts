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

export const inProcessMetrics = [
  { time: '06:00', temp: 36.5, pressure: 1.1, line: 'Line 1' },
  { time: '09:00', temp: 37.2, pressure: 1.3, line: 'Line 1' },
  { time: '12:00', temp: 38.4, pressure: 1.4, line: 'Line 1' },
  { time: '15:00', temp: 37.8, pressure: 1.2, line: 'Line 1' },
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
]

export const coaLots = [
  {
    lot: 'FG-2201',
    product: 'PainRelief 500mg',
    tests: [
      { name: 'Assay', result: 99.1, limit: '98-102%' },
      { name: 'Dissolution', result: 'Q=30', limit: 'Q ≤ 30' },
    ],
  },
]

export const qcReports = [
  { name: 'Weekly QC Summary', period: 'Nov 10-16', generated: '2024-11-17', format: 'PDF' },
  { name: 'Deviation Analysis', period: 'Nov 01-16', generated: '2024-11-16', format: 'XLSX' },
]

export const qcAuditTrail = [
  {
    id: 'AUD-5531',
    action: 'Result edited',
    user: 'J. Patel',
    timestamp: '14:23',
    details: { field: 'Assay', old: '98.8', new: '99.0' },
  },
  {
    id: 'AUD-5532',
    action: 'Template approved',
    user: 'QA Admin',
    timestamp: '09:45',
    details: { template: 'Assay - API A', version: 'v3.2' },
  },
]
