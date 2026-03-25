import type { DateTime } from 'luxon'

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum DocumentType {
  CPF = 'cpf',
  CNPJ = 'cnpj',
}

export type User = {
  id: string
  firstName: string
  lastName: string
  role: UserRole
  email: string
  password: string
  document: string
  documentType: DocumentType
  phone: string
  createdAt: DateTime
  updatedAt?: DateTime
}
