import { TEvent, TEventCreateUpdateParams, TTicketType, TTicketTypeCreateUpdateParams, TUser, TUserCreateUpdateParams } from '../constants/types';

export const eventParamUtils = (event: TEvent): TEventCreateUpdateParams => {
  return {
    id: event.id,
    name: event.name,
    description: event.description || '',
    startDate: event.startDate,
    endDate: event.endDate,
  };
};

export const ticketTypeParamUtils = (ticketType: TTicketType): TTicketTypeCreateUpdateParams => {
  return {
    id: ticketType.id,
    name: ticketType.name,
    description: ticketType.description || '',
    typeCode: ticketType.typeCode,
  };
};

export const userParamUtils = (user: TUser): TUserCreateUpdateParams => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};
