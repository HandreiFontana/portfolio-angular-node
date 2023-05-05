import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCountryUseCase } from './list-country-use-case'

class ListCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCountryUseCase = container.resolve(ListCountryUseCase)

    const countries = await listCountryUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(countries)
  }
}

export { ListCountryController }
