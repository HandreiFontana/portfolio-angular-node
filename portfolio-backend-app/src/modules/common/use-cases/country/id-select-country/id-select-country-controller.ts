import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCountryUseCase } from './id-select-country-use-case'

class IdSelectCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCountryUseCase = container.resolve(IdSelectCountryUseCase)

    const country = await idSelectCountryUseCase.execute({
      id: id as string
    })

    return response.json(country.data)
  }
}

export { IdSelectCountryController }
