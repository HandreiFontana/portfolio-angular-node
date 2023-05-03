import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCountryUseCase } from './get-country-use-case'

class GetCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCountryUseCase = container.resolve(GetCountryUseCase)
    const country = await getCountryUseCase.execute(id)

    return response.status(country.statusCode).json(country.data)
  }
}

export { GetCountryController }
