import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCityUseCase } from './delete-city-use-case'
import { ListCityUseCase } from '../list-city/list-city-use-case'

class DeleteCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCityUseCase = container.resolve(DeleteCityUseCase)
    await deleteCityUseCase.execute(id)


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

export { DeleteCityController }
