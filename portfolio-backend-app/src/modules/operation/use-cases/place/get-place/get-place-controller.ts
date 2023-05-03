import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPlaceUseCase } from './get-place-use-case'

class GetPlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPlaceUseCase = container.resolve(GetPlaceUseCase)
    const place = await getPlaceUseCase.execute(id)

    return response.status(place.statusCode).json(place.data)
  }
}

export { GetPlaceController }
