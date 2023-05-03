import { inject, injectable } from 'tsyringe'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  federativeUnit: string
  stateName: string
  ibgeCode: string
}

@injectable()
class UpdateStateUseCase {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute({
    id,
    federativeUnit,
    stateName,
    ibgeCode
  }: IRequest): Promise<HttpResponse> {
    const state = await this.stateRepository.update({
      id,
      federativeUnit,
      stateName,
      ibgeCode
    })

    return state
  }
}

export { UpdateStateUseCase }
