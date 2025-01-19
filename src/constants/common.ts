import { TOption, TUserRole } from './types';

export const SnackbarType = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};
export const userRoleOption: TOption<TUserRole>[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'event_manager', label: 'Event Manager' },
  { value: 'staff', label: 'Staff' },
];
export const userRole = ['admin', 'event_manager', 'staff'];
export const allowRoles = {
  ADMIN: ['admin'],
  MANAGER: ['admin', 'event_manager'],
};
