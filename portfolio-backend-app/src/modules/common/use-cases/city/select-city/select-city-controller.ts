import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCityUseCase } from './select-city-use-case'

class SelectCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, stateId } = request.query

    const selectCityUseCase = container.resolve(SelectCityUseCase)

    const cities = await selectCityUseCase.execute({
      filter: filter as string,
      stateId: stateId as string
    })

    return response.json(cities)
  }
}

export { SelectCityController }
