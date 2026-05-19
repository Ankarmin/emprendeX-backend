export enum UserStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Blocked = 'Blocked',
}

export enum PlanStatus {
  Enabled = 'Activado',
  Disabled = 'Desactivado',
}

export enum PlanPeriod {
  Monthly = 'Mensual',
  Yearly = 'Anual',
}

export enum ModuleType {
  Basic = 'Basico',
  Premium = 'Premium',
}

export enum BusinessModuleStatus {
  Enabled = 'Activado',
  Blocked = 'Bloqueado',
}

export enum ItemClass {
  Product = 'Producto',
  Service = 'Servicio',
}

export enum SubscriptionStatus {
  Active = 'Activo',
  Inactive = 'Inactivo',
}

export enum OrderStatus {
  Pending = 'Pendiente',
  Reserved = 'Reserva',
  Active = 'Activo',
  Delivered = 'Entregado',
  OnTheWay = 'En camino',
}

export enum PaymentStatus {
  Paid = 'Cancelado',
  Unpaid = 'No cancelado',
  Advance = 'Adelanto',
}

export enum DeliveryMethod {
  Delivery = 'Delivery',
  Pickup = 'Recojo en tienda',
}
