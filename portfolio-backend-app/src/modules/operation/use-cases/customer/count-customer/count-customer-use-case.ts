import { inject, injectable } from 'tsyringe'
import { Customer } from '@modules/operation/infra/typeorm/entities/customer'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const customersCount = await this.customerRepository.count(
      search,
      filter
    )

    return customersCount
  }
}

export { CountCustomerUseCase }
