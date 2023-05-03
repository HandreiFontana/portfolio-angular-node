import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCustomerUseCase } from './update-customer-use-case'

class UpdateCustomerController {
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

    const { id } = request.params

    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase)

    const result = await updateCustomerUseCase.execute({
        id,
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

export { UpdateCustomerController }
