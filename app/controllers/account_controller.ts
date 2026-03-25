import User from '#models/user'
import { editAccountValidator, signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class AccountController {
  async createAccount({ request, serialize }: HttpContext) {
    const { firstName, lastName, role, email, password, document, documentType, phone } =
      await request.validateUsing(signupValidator)

    const user = await User.create({
      firstName,
      lastName,
      role,
      email,
      password,
      document,
      documentType,
      phone,
    })

    return serialize({
      user: UserTransformer.transform(user),
    })
  }

  async editAccount({ request, auth, serialize }: HttpContext) {
    const { firstName, lastName, email, password, phone } =
      await request.validateUsing(editAccountValidator)

    const user = auth.getUserOrFail()

    user.merge({ firstName, lastName, email, password, phone })
    await user.save()

    return serialize({
      user: UserTransformer.transform(user),
    })
  }
}
