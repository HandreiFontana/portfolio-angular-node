import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { ICustomerDTO } from '@modules/operation/dtos/i-customer-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ICustomerDTO[],
  hasNext: boolean
}

@injectable()
class ListCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const customers = await this.customerRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCustomers = await this.customerRepository.count(
      search,
      filter
    )

    const numeroCustomer = page * rowsPerPage

    const customersResponse = {
      items: customers.data,
      hasNext: numeroCustomer < countCustomers.data.count
    }

    return customersResponse
  }
}

export { ListCustomerUseCase }
