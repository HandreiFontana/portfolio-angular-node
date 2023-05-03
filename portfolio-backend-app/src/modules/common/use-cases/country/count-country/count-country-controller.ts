import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCountryUseCase } from './count-country-use-case'

class CountCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCountryUseCase = container.resolve(CountCountryUseCase)

    const countriesCount = await countCountryUseCase.execute({
      search: search as string
    })

    return response.status(countriesCount.statusCode).json(countriesCount)
  }
}

export { CountCountryController }
