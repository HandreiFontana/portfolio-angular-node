import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCustomerUseCase } from './create-customer-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      customerName,
      email,
      phone,
      countryId,
      stateId,
      cityId,
      address
    } = request.body

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase)

    const result = await createCustomerUseCase.execute({
        customerName,
        email,
        phone,
        countryId,
        stateId,
        cityId,
        address
      })
      .then(customerResult => {
        return customerResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCustomerController }
