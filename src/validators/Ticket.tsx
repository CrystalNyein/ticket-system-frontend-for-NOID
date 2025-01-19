import * as Yup from 'yup';
import { messages } from '../constants/messages';

export const createTicketSchema = Yup.object({
  eventId: Yup.string().required(messages.error.fieldRequired),
  ticketTypeCode: Yup.string().required(messages.error.fieldRequired),
  ticketTemplatePath: Yup.string().required(messages.error.fieldRequired),
});

export const bulkCreateTicketSchema = Yup.object({
  eventId: Yup.string().required(messages.error.fieldRequired),
  ticketTypeCode: Yup.string().required(messages.error.fieldRequired),
  totalCount: Yup.number().positive().required(),
  file: Yup.mixed<File>().when('ticketTemplate', ([ticketTemplate], schema) => {
    return ticketTemplate ? schema.notRequired() : schema.required();
  }),
});

export const updateTicketSchema = Yup.object({
  status: Yup.string().oneOf(['available', 'sold', 'revoked', 'expired'], 'Invalid status').required(messages.error.fieldRequired),
  buyerId: Yup.string().when('status', ([status], schema) => {
    return status === 'sold' ? schema.required('Buyer ID is required when status is "sold"') : schema;
  }),
});
export const importTicketSaleSchema = Yup.object({
  eventId: Yup.string().required(messages.error.fieldRequired),
  file: Yup.mixed<File>().required(),
});
