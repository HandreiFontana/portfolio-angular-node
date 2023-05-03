import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCustomerUseCase } from './count-customer-use-case'

class CountCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCustomerUseCase = container.resolve(CountCustomerUseCase)

    const customersCount = await countCustomerUseCase.execute({
      search: search as string
    })

    return response.status(customersCount.statusCode).json(customersCount)
  }
}

export { CountCustomerController }
