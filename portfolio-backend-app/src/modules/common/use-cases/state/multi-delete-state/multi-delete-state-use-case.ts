import { inject, injectable } from 'tsyringe'
import { IStateRepository } from '@modules/common/repositories/i-state-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteStateUseCase {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const state = await this.stateRepository.multiDelete(ids)

    return state
  }
}

export { MultiDeleteStateUseCase }
