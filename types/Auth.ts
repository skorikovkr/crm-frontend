export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type ResetPasswordCredentials = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};