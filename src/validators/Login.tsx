import * as Yup from 'yup';
import { messages } from '../constants/messages';

export const loginSchema = Yup.object({
  email: Yup.string().email(messages.error.invalidEmail).required(messages.error.fieldRequired),
  password: Yup.string().min(8, messages.error.passwordTooShort).required(messages.error.fieldRequired),
});
