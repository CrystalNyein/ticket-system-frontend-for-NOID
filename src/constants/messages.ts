export const messages = {
  error: {
    invalidEmail: 'Invalid email format',
    fieldRequired: 'This field is required',
    passwordTooShort: 'Password must be at least 8 characters',
    snackbar: 'useSnackbar must be used within a SnackbarProvider',
    invalidRole: 'Invalid role.',
  },
  loginSuccess: (username: string) => `Login successful! Welcome to NOID, ${username}`,
  loginFail: (error: string) => `Login failed: ${error}`,
  logoutSuccess: 'Logout successful!',
  logoutFail: (error: string) => `Logout failed: ${error}`,
};
