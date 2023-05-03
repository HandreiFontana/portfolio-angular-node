import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { IStorageProvider } from '@shared/container/providers/storage-provider/i-storage-provider'
import { notFound } from '@shared/helpers'
import { HttpResponse } from '@shared/helpers'
import { ok } from '@shared/helpers'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<HttpResponse> {
    const user = await this.userRepository.findById(userId)

    if (!process.env.disk) {
      return notFound()
    }
    
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar')
    }

    await this.storageProvider.save(avatarFile, 'avatar')
    
    user.avatar = avatarFile
    
    await this.userRepository.create(user)

    const response = {
      avatarUrl: `${this.storageProvider.url}/avatar/${avatarFile}`
    }

    return ok(response)
  }
}

export { UpdateUserAvatarUseCase }
