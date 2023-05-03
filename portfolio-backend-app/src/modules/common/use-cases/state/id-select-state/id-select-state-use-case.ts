import { inject, injectable } from "tsyringe"
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectStateUseCase {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const state = await this.stateRepository.idSelect(id)

    return state
  }
}

export { IdSelectStateUseCase }
