import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteStateUseCase } from './multi-delete-state-use-case'
import { ListStateUseCase } from '../list-state/list-state-use-case'

class MultiDeleteStateController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteStateUseCase = container.resolve(MultiDeleteStateUseCase)
    await multiDeleteStateUseCase.execute(ids)


    // restore list with updated records

    const listStateUseCase = container.resolve(ListStateUseCase)
    const states = await listStateUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(states)
  }
}

export { MultiDeleteStateController }
