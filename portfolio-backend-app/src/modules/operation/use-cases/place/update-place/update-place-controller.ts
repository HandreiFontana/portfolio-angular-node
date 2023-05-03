import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePlaceUseCase } from './update-place-use-case'

class UpdatePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      placeName,
      customerId,
      stateId,
      cityId,
      size,
      address
    } = request.body

    const { id } = request.params

    const updatePlaceUseCase = container.resolve(UpdatePlaceUseCase)

    const result = await updatePlaceUseCase.execute({
        id,
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

export { UpdatePlaceController }
