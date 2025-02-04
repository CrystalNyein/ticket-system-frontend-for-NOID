import * as Yup from 'yup';
import { messages } from '../constants/messages';

export const ticketTypeSchema = Yup.object({
  name: Yup.string().required(messages.error.fieldRequired),
  description: Yup.string(),
  typeCode: Yup.string().required(messages.error.fieldRequired),
});
