export type PurchaseOrderStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'In Transit' | 'Received'

export interface PurchaseOrder {
  id: string
  supplier: string
  category: string
  amount: number
  currency: string
  status: PurchaseOrderStatus
  priority: 'Low' | 'Medium' | 'High'
  dueDate: string
  createdAt: string
  owner: string
  items: number
  leadTimeDays: number
}

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-2024-118',
    supplier: 'BioSupplies Inc.',
    category: 'Active Ingredients',
    amount: 185000,
    currency: 'USD',
    status: 'Pending Approval',
    priority: 'High',
    dueDate: '2024-12-02',
    createdAt: '2024-11-12',
    owner: 'Amelia Reed',
    items: 4,
    leadTimeDays: 18,
  },
  {
    id: 'PO-2024-119',
    supplier: 'SterilePack Ltd.',
    category: 'Primary Packaging',
    amount: 42000,
    currency: 'USD',
    status: 'Approved',
    priority: 'Medium',
    dueDate: '2024-11-18',
    createdAt: '2024-11-08',
    owner: 'Hiro Tanaka',
    items: 6,
    leadTimeDays: 10,
  },
  {
    id: 'PO-2024-120',
    supplier: 'Nordic Chem',
    category: 'Excipients',
    amount: 96000,
    currency: 'EUR',
    status: 'Draft',
    priority: 'Low',
    dueDate: '2024-12-14',
    createdAt: '2024-11-14',
    owner: 'Lena Ortiz',
    items: 3,
    leadTimeDays: 21,
  },
  {
    id: 'PO-2024-121',
    supplier: 'PurePlast',
    category: 'Secondary Packaging',
    amount: 31000,
    currency: 'USD',
    status: 'In Transit',
    priority: 'Medium',
    dueDate: '2024-11-24',
    createdAt: '2024-11-05',
    owner: 'Marcus Lee',
    items: 5,
    leadTimeDays: 12,
  },
  {
    id: 'PO-2024-122',
    supplier: 'Sterisolve',
    category: 'Sterilization Services',
    amount: 58000,
    currency: 'USD',
    status: 'Received',
    priority: 'Low',
    dueDate: '2024-11-10',
    createdAt: '2024-10-28',
    owner: 'Priya Singh',
    items: 2,
    leadTimeDays: 8,
  },
]

export interface Supplier {
  name: string
  category: string
  leadTimeDays: number
  performance: number
  spendYTD: number
  status: 'Preferred' | 'Approved' | 'Trial'
  contact: string
}

export const suppliers: Supplier[] = [
  {
    name: 'BioSupplies Inc.',
    category: 'APIs',
    leadTimeDays: 18,
    performance: 94,
    spendYTD: 1.2,
    status: 'Preferred',
    contact: 'finance@biosupplies.com',
  },
  {
    name: 'SterilePack Ltd.',
    category: 'Packaging',
    leadTimeDays: 10,
    performance: 91,
    spendYTD: 0.64,
    status: 'Approved',
    contact: 'orders@sterilepack.com',
  },
  {
    name: 'Nordic Chem',
    category: 'Excipients',
    leadTimeDays: 21,
    performance: 88,
    spendYTD: 0.42,
    status: 'Preferred',
    contact: 'support@nordicchem.eu',
  },
  {
    name: 'PurePlast',
    category: 'Components',
    leadTimeDays: 12,
    performance: 86,
    spendYTD: 0.35,
    status: 'Approved',
    contact: 'sales@pureplast.com',
  },
]
