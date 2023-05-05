import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCustomerUseCase } from './list-customer-use-case'

class ListCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCustomerUseCase = container.resolve(ListCustomerUseCase)

    const customers = await listCustomerUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(customers)
  }
}

export { ListCustomerController }
