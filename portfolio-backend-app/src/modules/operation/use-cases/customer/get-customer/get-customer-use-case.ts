import { inject, injectable } from 'tsyringe'
import { Customer } from '@modules/operation/infra/typeorm/entities/customer'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const customer = await this.customerRepository.get(id)

    return customer
  }
}

export { GetCustomerUseCase }
