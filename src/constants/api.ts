export const API = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  EVENTS: (param?: string) => `/events${param ? `/${param}` : ''}`,
  TICKET_TYPES: (param?: string) => `/ticketTypes${param ? `/${param}` : ''}`,
  TICKETS: {
    NORM: (param?: string) => `/tickets${param ? `/${param}` : ''}`,
    IMPORT_SALE: '/tickets/import-ticket-sales',
    BULK: '/tickets/bulk',
    SCAN: '/tickets/scan',
  },
  TICKET_TEMPLATES: {
    CHECK: '/ticketTemplates/check-template',
    UPLOAD: '/ticketTemplates/upload-template',
  },
  USERS: {
    NORM: (param?: string) => `/users${param ? `/${param}` : ''}`,
    ME: '/users/me',
  },
};
