import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCustomerUseCase } from './select-customer-use-case'

class SelectCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCustomerUseCase = container.resolve(SelectCustomerUseCase)

    const customers = await selectCustomerUseCase.execute({
      filter: filter as string,
    })

    return response.json(customers)
  }
}

export { SelectCustomerController }
