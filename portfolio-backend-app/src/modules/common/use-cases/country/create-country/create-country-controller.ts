import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCountryUseCase } from './create-country-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      countryName,
      countryCode
    } = request.body

    const createCountryUseCase = container.resolve(CreateCountryUseCase)

    const result = await createCountryUseCase.execute({
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

export { CreateCountryController }
