import * as Yup from 'yup';
import { messages } from '../constants/messages';

export const userSchema = (isPasswordRequired: boolean) =>
  Yup.object({
    name: Yup.string().required(messages.error.fieldRequired),
    email: Yup.string().required(messages.error.fieldRequired),
    role: Yup.string().oneOf(['admin', 'event_manager', 'staff'], messages.error.invalidRole).required(messages.error.fieldRequired),
    password: isPasswordRequired ? Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters') : Yup.string().notRequired(),
  });
