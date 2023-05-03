import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCityUseCase } from './id-select-city-use-case'

class IdSelectCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCityUseCase = container.resolve(IdSelectCityUseCase)

    const city = await idSelectCityUseCase.execute({
      id: id as string
    })

    return response.json(city.data)
  }
}

export { IdSelectCityController }
