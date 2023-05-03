import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCityUseCase } from './get-city-use-case'

class GetCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCityUseCase = container.resolve(GetCityUseCase)
    const city = await getCityUseCase.execute(id)

    return response.status(city.statusCode).json(city.data)
  }
}

export { GetCityController }
