import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListStateUseCase } from './list-state-use-case'

class ListStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order
    } = request.query

    const listStateUseCase = container.resolve(ListStateUseCase)

    const states = await listStateUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string
    })

    return response.json(states)
  }
}

export { ListStateController }
