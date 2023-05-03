import { inject, injectable } from 'tsyringe'
import { Customer } from '@modules/operation/infra/typeorm/entities/customer'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
}

@injectable()
class CountCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const customersCount = await this.customerRepository.count(
      search
    )

    return customersCount
  }
}

export { CountCustomerUseCase }
