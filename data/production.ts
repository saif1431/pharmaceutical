export type BatchStatus = 'Scheduled' | 'In Progress' | 'Pending QA'

export interface ProductionBatch {
  id: string
  product: string
  line: string
  start: string
  end: string
  status: BatchStatus
  stage: string
  color: string
}

export const productionBatches: ProductionBatch[] = [
  {
    id: 'BATCH-4411',
    product: 'PainRelief 500mg Tablets',
    line: 'Tablet Line 1',
    start: '06:00',
    end: '12:30',
    status: 'In Progress',
    stage: 'Compression',
    color: '#2563eb',
  },
  {
    id: 'BATCH-4412',
    product: 'ImmuneShield Syrup',
    line: 'Syrup Mix Line',
    start: '08:00',
    end: '14:00',
    status: 'Scheduled',
    stage: 'Charging',
    color: '#06b6d4',
  },
  {
    id: 'BATCH-4413',
    product: 'CardioCap 150mg',
    line: 'Encapsulation',
    start: '14:30',
    end: '20:30',
    status: 'Pending QA',
    stage: 'Coating',
    color: '#f97316',
  },
]

export interface LineUtilizationPoint {
  hour: string
  line1: number
  line2: number
  line3: number
}

export const lineUtilization: LineUtilizationPoint[] = [
  { hour: '04:00', line1: 62, line2: 48, line3: 35 },
  { hour: '08:00', line1: 78, line2: 65, line3: 52 },
  { hour: '12:00', line1: 91, line2: 72, line3: 58 },
  { hour: '16:00', line1: 87, line2: 69, line3: 61 },
  { hour: '20:00', line1: 74, line2: 60, line3: 55 },
]

export interface ResourceReadinessItem {
  title: string
  lead: string
  readiness: number
  blockers: string
  shift: 'Morning' | 'Evening' | 'Night'
}

export const resourceReadiness: ResourceReadinessItem[] = [
  {
    title: 'Line Technicians',
    lead: 'L. Khan',
    readiness: 92,
    blockers: 'None',
    shift: 'Morning',
  },
  {
    title: 'Quality Inspectors',
    lead: 'P. Singh',
    readiness: 78,
    blockers: 'Lab calibration at 11:00',
    shift: 'Morning',
  },
  {
    title: 'Maintenance Crew',
    lead: 'R. Ortiz',
    readiness: 65,
    blockers: 'Spare pump awaited',
    shift: 'Evening',
  },
  {
    title: 'Packaging Operators',
    lead: 'S. Becker',
    readiness: 84,
    blockers: 'Film roll inbound',
    shift: 'Night',
  },
]
