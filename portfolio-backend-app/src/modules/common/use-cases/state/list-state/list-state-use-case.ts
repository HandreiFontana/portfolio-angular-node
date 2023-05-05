import { inject, injectable } from 'tsyringe'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { IStateDTO } from '@modules/common/dtos/i-state-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IStateDTO[],
  hasNext: boolean
}

@injectable()
class ListStateUseCase {
  constructor(
    @inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const states = await this.stateRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countStates = await this.stateRepository.count(
      search,
      filter
    )

    const numeroState = page * rowsPerPage

    const statesResponse = {
      items: states.data,
      hasNext: numeroState < countStates.data.count
    }

    return statesResponse
  }
}

export { ListStateUseCase }
