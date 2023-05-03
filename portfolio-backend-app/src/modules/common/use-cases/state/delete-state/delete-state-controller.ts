import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteStateUseCase } from './delete-state-use-case'
import { ListStateUseCase } from '../list-state/list-state-use-case'

class DeleteStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteStateUseCase = container.resolve(DeleteStateUseCase)
    await deleteStateUseCase.execute(id)


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

export { DeleteStateController }
