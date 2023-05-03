import { inject, injectable } from 'tsyringe'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountStateUseCase {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const statesCount = await this.stateRepository.count(
      search
    )

    return statesCount
  }
}

export { CountStateUseCase }
