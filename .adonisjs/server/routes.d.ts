import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.account.create_account': { paramsTuple?: []; params?: {} }
    'auth.access_token.create_token': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy_token': { paramsTuple?: []; params?: {} }
    'auth.account.edit_account': { paramsTuple?: []; params?: {} }
    'profile.profile.get_user_profile': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.get_user_profile': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.get_user_profile': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.account.create_account': { paramsTuple?: []; params?: {} }
    'auth.access_token.create_token': { paramsTuple?: []; params?: {} }
    'auth.access_token.destroy_token': { paramsTuple?: []; params?: {} }
    'auth.account.edit_account': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}