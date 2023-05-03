import { inject, injectable } from 'tsyringe'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteStateUseCase {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const state = await this.stateRepository.delete(id)

    return state
  }
}

export { DeleteStateUseCase }
