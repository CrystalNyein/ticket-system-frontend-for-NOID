import { TableHeader, TEventCreateUpdateParams, TTicketSummary, TTicketTemplate, TTicketTypeCreateUpdateParams, TUserCreateUpdateParams } from './types';

export const EventTableHeader: TableHeader<TEventCreateUpdateParams>[] = [
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'startDate', label: 'Start Date' },
  { id: 'endDate', label: 'End Date' },
  { id: 'isRandom', label: 'Use Random Ticket Code' },
];
export const TicketTypeTableHeader: TableHeader<TTicketTypeCreateUpdateParams>[] = [
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'typeCode', label: 'Code' },
];
export const UserTableHeader: TableHeader<TUserCreateUpdateParams>[] = [
  { id: 'email', label: 'Email' },
  { id: 'name', label: 'Name' },
  { id: 'role', label: 'Role' },
];
export const TicketTemplateTableHeader: TableHeader<TTicketTemplate>[] = [
  { id: 'event', label: 'Event' },
  { id: 'ticketTypeCode', label: 'Ticket Code' },
  { id: 'filename', label: 'Template Name' },
  { id: 'path', label: 'Template Path' },
];
export const TicketSummaryTableHeader: TableHeader<TTicketSummary>[] = [
  { id: 'eventName', label: 'Event' },
  { id: 'ticketTypeCode', label: 'Ticket Code' },
  { id: 'Total Tickets', label: 'Total Tickets' },
  { id: 'Sold Tickets', label: 'Sold Tickets' },
];
