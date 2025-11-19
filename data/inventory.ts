export type InventoryType = 'Raw Materials' | 'Finished Goods'

export interface InventoryItem {
  sku: string
  name: string
  batch: string
  type: InventoryType
  location: string
  quantity: number
  unit: string
  status: 'Healthy' | 'Warning' | 'Critical'
  expiry: string
  temperature: string
}

export const inventoryItems: InventoryItem[] = [
  {
    sku: 'RM-CEF-250',
    name: 'Cefuroxime Base Powder',
    batch: 'BCH-0921',
    type: 'Raw Materials',
    location: 'WH-01',
    quantity: 820,
    unit: 'kg',
    status: 'Healthy',
    expiry: '2025-03-12',
    temperature: '18°C',
  },
  {
    sku: 'RM-LAC-120',
    name: 'Lactose Monohydrate',
    batch: 'LOT-4412',
    type: 'Raw Materials',
    location: 'WH-01',
    quantity: 460,
    unit: 'kg',
    status: 'Warning',
    expiry: '2024-12-01',
    temperature: '20°C',
  },
  {
    sku: 'RM-MCC-300',
    name: 'Microcrystalline Cellulose',
    batch: 'LOT-5572',
    type: 'Raw Materials',
    location: 'WH-02',
    quantity: 310,
    unit: 'kg',
    status: 'Critical',
    expiry: '2024-11-25',
    temperature: '19°C',
  },
  {
    sku: 'FG-PAIN-500',
    name: 'PainRelief 500mg Tablets',
    batch: 'FG-2201',
    type: 'Finished Goods',
    location: 'WH-03',
    quantity: 42000,
    unit: 'boxes',
    status: 'Healthy',
    expiry: '2026-01-10',
    temperature: '22°C',
  },
  {
    sku: 'FG-IMM-250',
    name: 'ImmuneShield Syrup 250ml',
    batch: 'FG-2199',
    type: 'Finished Goods',
    location: 'WH-02',
    quantity: 8700,
    unit: 'bottles',
    status: 'Warning',
    expiry: '2025-06-18',
    temperature: '20°C',
  },
  {
    sku: 'FG-CAP-150',
    name: 'CardioCap 150mg Capsules',
    batch: 'FG-2184',
    type: 'Finished Goods',
    location: 'WH-03',
    quantity: 15200,
    unit: 'bottles',
    status: 'Healthy',
    expiry: '2025-11-02',
    temperature: '22°C',
  },
]
