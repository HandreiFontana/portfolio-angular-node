import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPlaceUseCase } from './count-place-use-case'

class CountPlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPlaceUseCase = container.resolve(CountPlaceUseCase)

    const placesCount = await countPlaceUseCase.execute({
      search: search as string
    })

    return response.status(placesCount.statusCode).json(placesCount)
  }
}

export { CountPlaceController }
