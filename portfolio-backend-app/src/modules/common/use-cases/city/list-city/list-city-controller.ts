import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCityUseCase } from './list-city-use-case'

class ListCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCityUseCase = container.resolve(ListCityUseCase)

    const cities = await listCityUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(cities)
  }
}

export { ListCityController }
