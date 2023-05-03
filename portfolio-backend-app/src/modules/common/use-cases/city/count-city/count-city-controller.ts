import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCityUseCase } from './count-city-use-case'

class CountCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCityUseCase = container.resolve(CountCityUseCase)

    const citiesCount = await countCityUseCase.execute({
      search: search as string
    })

    return response.status(citiesCount.statusCode).json(citiesCount)
  }
}

export { CountCityController }
