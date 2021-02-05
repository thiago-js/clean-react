import { Account } from '../models/account'

type AuthenticationType = {
  email: string
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationType) => Promise<Account>
}
