import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePlaceUseCase } from './delete-place-use-case'
import { ListPlaceUseCase } from '../list-place/list-place-use-case'

class DeletePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePlaceUseCase = container.resolve(DeletePlaceUseCase)
    await deletePlaceUseCase.execute(id)


    // restore list with updated records

    const listPlaceUseCase = container.resolve(ListPlaceUseCase)
    const places = await listPlaceUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(places)
  }
}

export { DeletePlaceController }
