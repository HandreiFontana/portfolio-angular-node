import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCountryUseCase } from './multi-delete-country-use-case'
import { ListCountryUseCase } from '../list-country/list-country-use-case'

class MultiDeleteCountryController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCountryUseCase = container.resolve(MultiDeleteCountryUseCase)
    await multiDeleteCountryUseCase.execute(ids)


    // restore list with updated records

    const listCountryUseCase = container.resolve(ListCountryUseCase)
    const countries = await listCountryUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(countries)
  }
}

export { MultiDeleteCountryController }
