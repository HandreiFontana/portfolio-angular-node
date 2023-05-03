import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCustomerUseCase } from './delete-customer-use-case'
import { ListCustomerUseCase } from '../list-customer/list-customer-use-case'

class DeleteCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase)
    await deleteCustomerUseCase.execute(id)


    // restore list with updated records

    const listCustomerUseCase = container.resolve(ListCustomerUseCase)
    const customers = await listCustomerUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(customers)
  }
}

export { DeleteCustomerController }
