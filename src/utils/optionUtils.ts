import { TTicketType } from '../constants/types';

export const optionUtils = (option: { id: string; name: string }) => {
  return {
    value: option.id,
    label: option.name,
  };
};
export const ticketTypeOptionUtils = (option: TTicketType) => {
  return {
    value: option.typeCode,
    label: option.name,
  };
};
