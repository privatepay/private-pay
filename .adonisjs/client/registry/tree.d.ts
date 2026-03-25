/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    account: {
      createAccount: typeof routes['auth.account.create_account']
      editAccount: typeof routes['auth.account.edit_account']
    }
    accessToken: {
      createToken: typeof routes['auth.access_token.create_token']
      destroyToken: typeof routes['auth.access_token.destroy_token']
    }
  }
  profile: {
    profile: {
      getUserProfile: typeof routes['profile.profile.get_user_profile']
    }
  }
}
