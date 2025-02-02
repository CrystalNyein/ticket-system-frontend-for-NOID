export const API = {
  AUTH: {
    LOGIN: '/auth/login',
  },
  EVENTS: { NORM: (param?: string) => `/events${param ? `/${param}` : ''}`, RECENT_STATS: '/events/recent-stats' },
  TICKET_TYPES: (param?: string) => `/ticketTypes${param ? `/${param}` : ''}`,
  TICKETS: {
    NORM: (param?: string) => `/tickets${param ? `/${param}` : ''}`,
    IMPORT_SALE: '/tickets/import-ticket-sales',
    BULK: '/tickets/bulk',
    SCAN: '/tickets/scan',
    DETAILS: '/tickets/scan-details',
    STATS_BY_DATE: '/tickets/stats-by-date',
    STATS_BY_EVENT: '/tickets/stats-by-event',
    DOOR_SALES: '/tickets/door-sales',
    SUMMARY: '/tickets/summary',
    DELETE_BY_PARAMS: (eventId: string, ticketTypeCode: string) => `/tickets/delete-by-params?eventId=${eventId}&ticketTypeCode=${ticketTypeCode}`,
  },
  TICKET_TEMPLATES: {
    NORM: (param?: string) => `/ticketTemplates${param ? `/${param}` : ''}`,
    CHECK: '/ticketTemplates/check-template',
    UPLOAD: '/ticketTemplates/upload-template',
  },
  USERS: {
    NORM: (param?: string) => `/users${param ? `/${param}` : ''}`,
    ME: '/users/me',
  },
};
