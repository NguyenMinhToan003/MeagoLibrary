// Barrel export kép theo pattern của Library-manager-Auto:
// vừa named export phẳng, vừa namespace để tránh trùng tên khi import.

export * from './constants';
export * as MeagoConstants from './constants';

export * from './enums';
export * as MeagoEnums from './enums';

export * from './dto/auth';
export * as MeagoDto from './dto/auth';

export * from './interfaces/common';
export * as MeagoInterfacesCommon from './interfaces/common';

export * from './interfaces/models';
export * as MeagoInterfacesModels from './interfaces/models';
