import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCountryUseCase } from './select-country-use-case'

class SelectCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCountryUseCase = container.resolve(SelectCountryUseCase)

    const countries = await selectCountryUseCase.execute({
      filter: filter as string,
    })

    return response.json(countries)
  }
}

export { SelectCountryController }
