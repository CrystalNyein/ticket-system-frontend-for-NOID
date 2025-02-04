export const messages = {
  error: {
    invalidEmail: 'Invalid email format',
    fieldRequired: 'This field is required',
    passwordTooShort: 'Password must be at least 8 characters',
    snackbar: 'useSnackbar must be used within a SnackbarProvider',
    invalidRole: 'Invalid role.',
    noTicketSummary: 'No Ticket Summary is selected',
    ticketToGreater: 'Ticket To must be greater than Ticket From',
  },
  loginSuccess: (username: string) => `Login successful! Welcome to NOID, ${username}`,
  loginFail: (error: string) => `Login failed: ${error}`,
  logoutSuccess: 'Logout successful!',
  logoutFail: (error: string) => `Logout failed: ${error}`,
};
