import { Router } from 'express'
import { CreateCustomerController } from '@modules/operation/use-cases/customer/create-customer/create-customer-controller'
import { ListCustomerController } from '@modules/operation/use-cases/customer/list-customer/list-customer-controller'
import { CountCustomerController } from '@modules/operation/use-cases/customer/count-customer/count-customer-controller'
import { SelectCustomerController } from '@modules/operation/use-cases/customer/select-customer/select-customer-controller'
import { IdSelectCustomerController } from '@modules/operation/use-cases/customer/id-select-customer/id-select-customer-controller'
import { GetCustomerController } from '@modules/operation/use-cases/customer/get-customer/get-customer-controller'
import { UpdateCustomerController } from '@modules/operation/use-cases/customer/update-customer/update-customer-controller'
import { DeleteCustomerController } from '@modules/operation/use-cases/customer/delete-customer/delete-customer-controller'
import { MultiDeleteCustomerController } from '@modules/operation/use-cases/customer/multi-delete-customer/multi-delete-customer-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const customersRoutes = Router()

const createCustomerController = new CreateCustomerController()
const listCustomerController = new ListCustomerController()
const countCustomerController = new CountCustomerController()
const selectCustomerController = new SelectCustomerController()
const idSelectCustomerController = new IdSelectCustomerController()
const getCustomerController = new GetCustomerController()
const updateCustomerController = new UpdateCustomerController()
const deleteCustomerController = new DeleteCustomerController()
const multiDeleteCustomerController = new MultiDeleteCustomerController()

customersRoutes.post('/', ensureAuthenticated, createCustomerController.handle )
customersRoutes.post('/list', ensureAuthenticated, listCustomerController.handle)
customersRoutes.post('/count', ensureAuthenticated, countCustomerController.handle)
customersRoutes.get('/select/:id', ensureAuthenticated, idSelectCustomerController.handle)
customersRoutes.get('/select', ensureAuthenticated, selectCustomerController.handle)
customersRoutes.get('/:id', ensureAuthenticated, getCustomerController.handle)
customersRoutes.put('/:id', ensureAuthenticated, updateCustomerController.handle)
customersRoutes.delete('/:id', ensureAuthenticated, deleteCustomerController.handle)
customersRoutes.delete('/', ensureAuthenticated, multiDeleteCustomerController.handle)

export { customersRoutes }
