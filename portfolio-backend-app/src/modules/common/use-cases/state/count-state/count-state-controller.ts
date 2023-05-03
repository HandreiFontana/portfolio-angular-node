import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountStateUseCase } from './count-state-use-case'

class CountStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countStateUseCase = container.resolve(CountStateUseCase)

    const statesCount = await countStateUseCase.execute({
      search: search as string
    })

    return response.status(statesCount.statusCode).json(statesCount)
  }
}

export { CountStateController }
