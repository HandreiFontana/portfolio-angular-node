import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCityUseCase } from './update-city-use-case'

class UpdateCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      stateId,
      cityName,
      ibgeCode
    } = request.body

    const { id } = request.params

    const updateCityUseCase = container.resolve(UpdateCityUseCase)

    const result = await updateCityUseCase.execute({
        id,
        stateId,
        cityName,
        ibgeCode
      })
      .then(cityResult => {
        return cityResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateCityController }
