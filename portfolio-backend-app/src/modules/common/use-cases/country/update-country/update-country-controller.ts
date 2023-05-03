import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCountryUseCase } from './update-country-use-case'

class UpdateCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      countryName,
      countryCode
    } = request.body

    const { id } = request.params

    const updateCountryUseCase = container.resolve(UpdateCountryUseCase)

    const result = await updateCountryUseCase.execute({
        id,
        countryName,
        countryCode
      })
      .then(countryResult => {
        return countryResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateCountryController }
