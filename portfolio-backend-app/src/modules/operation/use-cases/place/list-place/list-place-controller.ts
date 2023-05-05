import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPlaceUseCase } from './list-place-use-case'

class ListPlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPlaceUseCase = container.resolve(ListPlaceUseCase)

    const places = await listPlaceUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(places)
  }
}

export { ListPlaceController }
