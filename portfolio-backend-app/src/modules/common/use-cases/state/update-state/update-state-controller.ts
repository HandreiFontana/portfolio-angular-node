import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateStateUseCase } from './update-state-use-case'

class UpdateStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      federativeUnit,
      stateName,
      ibgeCode
    } = request.body

    const { id } = request.params

    const updateStateUseCase = container.resolve(UpdateStateUseCase)

    const result = await updateStateUseCase.execute({
        id,
        federativeUnit,
        stateName,
        ibgeCode
      })
      .then(stateResult => {
        return stateResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateStateController }
