import { inject, injectable } from 'tsyringe'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectStateUseCase {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const states = await this.stateRepository.select(filter)

    const newStates = {
      items: states.data,
      hasNext: false
    }

    return newStates
  }
}

export { SelectStateUseCase }
