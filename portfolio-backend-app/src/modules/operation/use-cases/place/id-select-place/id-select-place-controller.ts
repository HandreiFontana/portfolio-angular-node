import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPlaceUseCase } from './id-select-place-use-case'

class IdSelectPlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPlaceUseCase = container.resolve(IdSelectPlaceUseCase)

    const place = await idSelectPlaceUseCase.execute({
      id: id as string
    })

    return response.json(place.data)
  }
}

export { IdSelectPlaceController }
