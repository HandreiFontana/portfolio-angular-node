import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectStateUseCase } from './id-select-state-use-case'

class IdSelectStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectStateUseCase = container.resolve(IdSelectStateUseCase)

    const state = await idSelectStateUseCase.execute({
      id: id as string
    })

    return response.json(state.data)
  }
}

export { IdSelectStateController }
