import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCustomerUseCase } from './id-select-customer-use-case'

class IdSelectCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCustomerUseCase = container.resolve(IdSelectCustomerUseCase)

    const customer = await idSelectCustomerUseCase.execute({
      id: id as string
    })

    return response.json(customer.data)
  }
}

export { IdSelectCustomerController }
