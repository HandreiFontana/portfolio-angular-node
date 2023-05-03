import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePlaceUseCase } from './create-place-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      placeName,
      customerId,
      stateId,
      cityId,
      size,
      address
    } = request.body

    const createPlaceUseCase = container.resolve(CreatePlaceUseCase)

    const result = await createPlaceUseCase.execute({
        placeName,
        customerId,
        stateId,
        cityId,
        size,
        address
      })
      .then(placeResult => {
        return placeResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePlaceController }
