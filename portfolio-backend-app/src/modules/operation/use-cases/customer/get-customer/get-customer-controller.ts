import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCustomerUseCase } from './get-customer-use-case'

class GetCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCustomerUseCase = container.resolve(GetCustomerUseCase)
    const customer = await getCustomerUseCase.execute(id)

    return response.status(customer.statusCode).json(customer.data)
  }
}

export { GetCustomerController }
