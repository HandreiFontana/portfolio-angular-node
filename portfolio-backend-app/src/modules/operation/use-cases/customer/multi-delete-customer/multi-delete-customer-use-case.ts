import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const customer = await this.customerRepository.multiDelete(ids)

    return customer
  }
}

export { MultiDeleteCustomerUseCase }
