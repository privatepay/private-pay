/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import { Bouncer } from '@adonisjs/bouncer'
import { type User, UserRole } from '../types/user.ts'

/**
 * Delete the following ability to start from
 * scratch
 */
export const isAdmin = Bouncer.ability((user: User) => {
  return UserRole.ADMIN === user.role
})
