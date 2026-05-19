import { ModuleType } from '../database/database.enums';

export const AVAILABLE_MODULE_IDS = [
  'operaciones',
  'clientes',
  'productos',
  'cotizaciones',
  'contabilidad',
  'calendario',
  'reportes',
  'notificaciones',
] as const;

export const MODULE_SEEDS: Array<{
  moduleName: (typeof AVAILABLE_MODULE_IDS)[number];
  moduleType: ModuleType;
}> = [
  { moduleName: 'operaciones', moduleType: ModuleType.Basic },
  { moduleName: 'clientes', moduleType: ModuleType.Basic },
  { moduleName: 'productos', moduleType: ModuleType.Basic },
  { moduleName: 'cotizaciones', moduleType: ModuleType.Basic },
  { moduleName: 'contabilidad', moduleType: ModuleType.Basic },
  { moduleName: 'calendario', moduleType: ModuleType.Premium },
  { moduleName: 'reportes', moduleType: ModuleType.Premium },
  { moduleName: 'notificaciones', moduleType: ModuleType.Premium },
];

export const DEFAULT_ENABLED_MODULE_IDS: Array<
  (typeof AVAILABLE_MODULE_IDS)[number]
> = MODULE_SEEDS.filter((module) => module.moduleType === ModuleType.Basic).map(
  (module) => module.moduleName,
);
