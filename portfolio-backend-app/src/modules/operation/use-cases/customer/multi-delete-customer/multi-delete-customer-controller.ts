import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCustomerUseCase } from './multi-delete-customer-use-case'
import { ListCustomerUseCase } from '../list-customer/list-customer-use-case'

class MultiDeleteCustomerController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCustomerUseCase = container.resolve(MultiDeleteCustomerUseCase)
    await multiDeleteCustomerUseCase.execute(ids)


    // restore list with updated records

    const listCustomerUseCase = container.resolve(ListCustomerUseCase)
    const customers = await listCustomerUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(customers)
  }
}

export { MultiDeleteCustomerController }
