import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectStateUseCase } from './select-state-use-case'

class SelectStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectStateUseCase = container.resolve(SelectStateUseCase)

    const states = await selectStateUseCase.execute({
      filter: filter as string,
    })

    return response.json(states)
  }
}

export { SelectStateController }
