import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePlaceUseCase } from './multi-delete-place-use-case'
import { ListPlaceUseCase } from '../list-place/list-place-use-case'

class MultiDeletePlaceController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePlaceUseCase = container.resolve(MultiDeletePlaceUseCase)
    await multiDeletePlaceUseCase.execute(ids)


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

export { MultiDeletePlaceController }
