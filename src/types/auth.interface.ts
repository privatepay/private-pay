export interface ISignIn {
  email: string;
  password: string;
}

export interface IProfile {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
