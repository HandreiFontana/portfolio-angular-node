import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCountryUseCase } from './delete-country-use-case'
import { ListCountryUseCase } from '../list-country/list-country-use-case'

class DeleteCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCountryUseCase = container.resolve(DeleteCountryUseCase)
    await deleteCountryUseCase.execute(id)


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

export { DeleteCountryController }
