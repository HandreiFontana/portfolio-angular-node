import { Router } from 'express'
import { CreateCountryController } from '@modules/common/use-cases/country/create-country/create-country-controller'
import { ListCountryController } from '@modules/common/use-cases/country/list-country/list-country-controller'
import { CountCountryController } from '@modules/common/use-cases/country/count-country/count-country-controller'
import { SelectCountryController } from '@modules/common/use-cases/country/select-country/select-country-controller'
import { IdSelectCountryController } from '@modules/common/use-cases/country/id-select-country/id-select-country-controller'
import { GetCountryController } from '@modules/common/use-cases/country/get-country/get-country-controller'
import { UpdateCountryController } from '@modules/common/use-cases/country/update-country/update-country-controller'
import { DeleteCountryController } from '@modules/common/use-cases/country/delete-country/delete-country-controller'
import { MultiDeleteCountryController } from '@modules/common/use-cases/country/multi-delete-country/multi-delete-country-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const countriesRoutes = Router()

const createCountryController = new CreateCountryController()
const listCountryController = new ListCountryController()
const countCountryController = new CountCountryController()
const selectCountryController = new SelectCountryController()
const idSelectCountryController = new IdSelectCountryController()
const getCountryController = new GetCountryController()
const updateCountryController = new UpdateCountryController()
const deleteCountryController = new DeleteCountryController()
const multiDeleteCountryController = new MultiDeleteCountryController()

countriesRoutes.post('/', ensureAuthenticated, createCountryController.handle )
countriesRoutes.post('/list', ensureAuthenticated, listCountryController.handle)
countriesRoutes.post('/count', ensureAuthenticated, countCountryController.handle)
countriesRoutes.get('/select/:id', ensureAuthenticated, idSelectCountryController.handle)
countriesRoutes.get('/select', ensureAuthenticated, selectCountryController.handle)
countriesRoutes.get('/:id', ensureAuthenticated, getCountryController.handle)
countriesRoutes.put('/:id', ensureAuthenticated, updateCountryController.handle)
countriesRoutes.delete('/:id', ensureAuthenticated, deleteCountryController.handle)
countriesRoutes.delete('/', ensureAuthenticated, multiDeleteCountryController.handle)

export { countriesRoutes }
