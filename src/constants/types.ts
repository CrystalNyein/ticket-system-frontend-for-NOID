import { Field } from 'formik';
import { ComponentProps } from 'react';

export type TEvent = {
  id: string;
  name: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TEventCreateUpdateParams = Omit<TEvent, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

export type TGetResponse<T> = {
  message: string;
  data: T[] | T;
};

export type TCreateOrUpdateResponse<T> = {
  message: string;
  data: T;
};
export type TableHeader<T> = {
  id: keyof T;
  label: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

export type TUserRole = 'admin' | 'event_manager' | 'staff';
export type TUser = {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  createdAt: Date;
  updatedAt: Date;
};
export type TLoginUser = {
  user: TUser;
  token: string;
};

export type TUserCreateUpdateParams = Omit<TUser, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
  password?: string;
};

export type TLoginFormResponse = {
  message: string;
  data: TLoginUser;
};

export type TSnackbarType = 'success' | 'error' | 'info' | 'warning';

export type TFormControl = 'input' | 'textarea';

export type TFormControlProps = ComponentProps<typeof Field> & {
  control: TFormControl;
  label: string;
  name: string;
  fieldCustomClass?: string;
};
export type TFormDateControlProps = TFormControlProps & {
  minDate: Date;
  maxDate: Date;
};
export type TTicketStatus = 'available' | 'sold' | 'revoked' | 'expired';

export type TTicket = {
  id: string;
  ticketCode: string;
  eventId: string;
  ticketTypeCode: string;
  status: TTicketStatus;
  buyerId: string | null;
  qrCodePath: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TTicketTemplate = {
  id: string;
  eventId: string;
  ticketTypeCode: string;
  path: string;
  filename: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TCheckTicketTemplate = {
  template?: TTicketTemplate;
  templateExists: boolean;
};
export type TCheckTemplateParams = {
  eventId: string;
  ticketTypeCode: string;
};
export type TUploadTemplateParams = TCheckTemplateParams & {
  file: File | null;
};
export type TTicketCreateParams = TCheckTemplateParams & {
  ticketTemplate: string;
  file?: File | null;
  totalCount?: number;
};
export type TTicketUpdateParams = {
  status: TTicketStatus;
  buyerId: string | null;
};
export type TImportTicketSaleParams = {
  eventId: string;
  file: File | null;
};
export type TTicketScanParams = {
  qrData: string;
};
export type TTicketType = {
  id: string;
  typeCode: string;
  name: string;
  description: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TTicketTypeCreateUpdateParams = Omit<TTicketType, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};
export type TOption<T = string> = { value: T; label: string };
export type TBuyer = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TTicketScanResponse = {
  ticket: TTicket;
  buyer: TBuyer;
};
