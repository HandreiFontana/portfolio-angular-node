import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarUseCase } from './update-user-avatar-use-case'

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user
    const avatarFile = request.file.filename

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)

    const avatarUpload = await updateUserAvatarUseCase.execute({ userId: id, avatarFile })

    return response.status(avatarUpload.statusCode).send(avatarUpload.data)
  }
}

export { UpdateUserAvatarController }
