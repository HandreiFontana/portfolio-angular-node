import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCityUseCase } from './multi-delete-city-use-case'
import { ListCityUseCase } from '../list-city/list-city-use-case'

class MultiDeleteCityController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCityUseCase = container.resolve(MultiDeleteCityUseCase)
    await multiDeleteCityUseCase.execute(ids)


    // restore list with updated records

    const listCityUseCase = container.resolve(ListCityUseCase)
    const cities = await listCityUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(cities)
  }
}

export { MultiDeleteCityController }
