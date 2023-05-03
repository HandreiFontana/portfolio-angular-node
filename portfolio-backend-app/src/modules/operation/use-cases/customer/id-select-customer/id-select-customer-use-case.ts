import { inject, injectable } from "tsyringe"
import { ICustomerRepository } from '@modules/operation/repositories/i-customer-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const customer = await this.customerRepository.idSelect(id)

    return customer
  }
}

export { IdSelectCustomerUseCase }
