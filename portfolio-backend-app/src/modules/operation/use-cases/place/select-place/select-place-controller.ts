import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPlaceUseCase } from './select-place-use-case'

class SelectPlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPlaceUseCase = container.resolve(SelectPlaceUseCase)

    const places = await selectPlaceUseCase.execute({
      filter: filter as string,
    })

    return response.json(places)
  }
}

export { SelectPlaceController }
