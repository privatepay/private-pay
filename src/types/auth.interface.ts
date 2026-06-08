export interface ISignIn {
  email: string;
  password: string;
}

export interface IProfile {
  sub: string;
  email: string;
  language: string;
  iat: number;
  exp: number;
  firstName: string;
  lastName: string;
  role: Role;
  codename: string;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
