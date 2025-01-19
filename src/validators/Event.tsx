import * as Yup from 'yup';
import { messages } from '../constants/messages';
import { normalizeDate } from '../utils/dateUtils';

export const eventSchema = Yup.object({
  name: Yup.string().required(messages.error.fieldRequired),
  description: Yup.string(),
  startDate: Yup.date().nullable().required(messages.error.fieldRequired).min(normalizeDate(new Date()), 'Start date must be today or later'),
  endDate: Yup.date().nullable().required(messages.error.fieldRequired).min(Yup.ref('startDate'), 'End date must be after the start date'),
});
