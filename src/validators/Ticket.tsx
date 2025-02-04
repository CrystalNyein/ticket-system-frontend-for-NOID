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
    return ticketTemplate ? schema.notRequired() : schema.required(messages.error.fieldRequired);
  }),
});
export const updateTicketSchema = Yup.object({
  status: Yup.string().oneOf(['available', 'sold', 'revoked', 'expired'], 'Invalid status').required(messages.error.fieldRequired),
  buyerId: Yup.string().when('status', ([status], schema) => {
    return status === 'sold' ? schema.required('Buyer ID is required when status is "sold"') : schema.notRequired();
  }),
});
export const importTicketSaleSchema = Yup.object({
  eventId: Yup.string().required(messages.error.fieldRequired),
  file: Yup.mixed<File>().required(messages.error.fieldRequired),
});
export const doorSaleTicketsSchema = Yup.object({
  eventId: Yup.string().required(messages.error.fieldRequired),
  ticketCode: Yup.string().when('isRandom', ([isRandom], schema) => {
    return isRandom ? schema.required(messages.error.fieldRequired) : schema.notRequired();
  }),
  ticketTypeCode: Yup.string().when('isRandom', ([isRandom], schema) => {
    return !isRandom ? schema.required(messages.error.fieldRequired) : schema.notRequired();
  }),
  ticketFrom: Yup.number()
    .min(1)
    .when('isRandom', ([isRandom], schema) => {
      return !isRandom ? schema.required(messages.error.fieldRequired) : schema.notRequired();
    }),
  ticketTo: Yup.number()
    .min(Yup.ref('ticketFrom'), messages.error.ticketToGreater)
    .when('isRandom', ([isRandom], schema) => {
      return !isRandom ? schema.required(messages.error.fieldRequired) : schema.notRequired();
    }),
  buyerName: Yup.string().required(messages.error.fieldRequired),
  buyerPhone: Yup.string().required(messages.error.fieldRequired),
  buyerEmail: Yup.string(),
});
export const deleteTicketsSchema = Yup.object({
  eventId: Yup.string().required(messages.error.fieldRequired),
  ticketTypeCode: Yup.string().required(messages.error.fieldRequired),
});
