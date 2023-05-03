import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetStateUseCase } from './get-state-use-case'

class GetStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getStateUseCase = container.resolve(GetStateUseCase)
    const state = await getStateUseCase.execute(id)

    return response.status(state.statusCode).json(state.data)
  }
}

export { GetStateController }
