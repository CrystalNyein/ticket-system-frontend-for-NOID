import { Field } from 'formik';
import { ComponentProps } from 'react';

export type TEvent = {
  id: string;
  name: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isRandom: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TEventCreateUpdateParams = Omit<TEvent, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};
export type TRecentEvent = TTicketStat & {
  event: TEvent;
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
  identifier: string;
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
export type TTicketStat = {
  ticketCount: number;
  soldTicketCount: number;
};
export type TTicketStatByDateParams = {
  startDate: Date;
  endDate: Date;
};
export type TTicketStatByEventParams = {
  eventId: string;
};
export type TTicketDeleteParams = {
  eventId: string;
  ticketTypeCode: string;
};
export type TTicketTemplate = {
  id: string;
  eventId: string;
  ticketTypeCode: string;
  event?: TEvent;
  path: string;
  filename: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TCheckTicketTemplate = {
  template?: TTicketTemplate;
  templateExists: boolean;
};
export type TCheckTicketTemplateParams = {
  eventId: string;
  ticketTypeCode: string;
};
export type TUploadTicketTemplateParams = TCheckTicketTemplateParams & {
  file: File | null;
};
export type TTicketCreateParams = TCheckTicketTemplateParams & {
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
export type TDoorSaleTicketsParams = {
  eventId: string;
  isRandom: boolean;
  ticketCode?: string;
  ticketTypeCode?: string;
  ticketFrom?: number;
  ticketTo?: number;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
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
export type TTicketScan = {
  id: string;
  ticketId: string;
  scanDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TTicketScanResponse = {
  ticket: TTicket;
  buyer: TBuyer;
  ticketScan: TTicketScan;
};
export type TTicketSummary = {
  eventId: string;
  eventName: string;
  eventEndDate: Date;
  ticketTypeCode: string;
  'Total Tickets': number;
  'Sold Tickets': number;
};
