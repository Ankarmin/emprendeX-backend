import { ModuleType } from '../database/database.enums';

export const AVAILABLE_MODULE_IDS = [
  'operaciones',
  'clientes',
  'productos',
  'cotizaciones',
  'pagos',
  'reportes',
] as const;

export const ONBOARDING_MODULE_IDS = [
  'operaciones',
  'clientes',
  'productos',
  'cotizaciones',
  'pagos',
] as const;

export const MODULE_SEEDS: Array<{
  moduleName: (typeof AVAILABLE_MODULE_IDS)[number];
  moduleType: ModuleType;
}> = [
  { moduleName: 'operaciones', moduleType: ModuleType.Basic },
  { moduleName: 'clientes', moduleType: ModuleType.Basic },
  { moduleName: 'productos', moduleType: ModuleType.Basic },
  { moduleName: 'cotizaciones', moduleType: ModuleType.Basic },
  { moduleName: 'pagos', moduleType: ModuleType.Basic },
  { moduleName: 'reportes', moduleType: ModuleType.Premium },
];

export const DEFAULT_UNIT_SEEDS = [
  { unitName: 'Unidad', abbreviation: 'UND' },
  { unitName: 'Caja', abbreviation: 'CJ' },
  { unitName: 'Docena', abbreviation: 'DOC' },
  { unitName: 'Paquete', abbreviation: 'PAQ' },
] as const;

export const DEFAULT_CATEGORY_SEEDS = [
  { categoryName: 'Servicio general' },
  { categoryName: 'Evento' },
  { categoryName: 'Asesoría' },
  { categoryName: 'Diseño' },
] as const;
