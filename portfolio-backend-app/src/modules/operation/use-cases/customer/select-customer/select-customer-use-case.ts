import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const customers = await this.customerRepository.select(filter)

    const newCustomers = {
      items: customers.data,
      hasNext: false
    }

    return newCustomers
  }
}

export { SelectCustomerUseCase }
