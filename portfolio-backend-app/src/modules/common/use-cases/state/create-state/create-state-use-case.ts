import { inject, injectable } from 'tsyringe'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  federativeUnit: string
  stateName: string
  ibgeCode: string
}

@injectable()
class CreateStateUseCase {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute({
    federativeUnit,
    stateName,
    ibgeCode
  }: IRequest): Promise<State> {
    const result = await this.stateRepository.create({
        federativeUnit,
        stateName,
        ibgeCode
      })
      .then(stateResult => {
        return stateResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateStateUseCase }
