import { Router } from 'express'
import { CreateCityController } from '@modules/common/use-cases/city/create-city/create-city-controller'
import { ListCityController } from '@modules/common/use-cases/city/list-city/list-city-controller'
import { CountCityController } from '@modules/common/use-cases/city/count-city/count-city-controller'
import { SelectCityController } from '@modules/common/use-cases/city/select-city/select-city-controller'
import { IdSelectCityController } from '@modules/common/use-cases/city/id-select-city/id-select-city-controller'
import { GetCityController } from '@modules/common/use-cases/city/get-city/get-city-controller'
import { UpdateCityController } from '@modules/common/use-cases/city/update-city/update-city-controller'
import { DeleteCityController } from '@modules/common/use-cases/city/delete-city/delete-city-controller'
import { MultiDeleteCityController } from '@modules/common/use-cases/city/multi-delete-city/multi-delete-city-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const citiesRoutes = Router()

const createCityController = new CreateCityController()
const listCityController = new ListCityController()
const countCityController = new CountCityController()
const selectCityController = new SelectCityController()
const idSelectCityController = new IdSelectCityController()
const getCityController = new GetCityController()
const updateCityController = new UpdateCityController()
const deleteCityController = new DeleteCityController()
const multiDeleteCityController = new MultiDeleteCityController()

citiesRoutes.post('/', ensureAuthenticated, createCityController.handle )
citiesRoutes.get('/', ensureAuthenticated, listCityController.handle)
citiesRoutes.post('/count', ensureAuthenticated, countCityController.handle)
citiesRoutes.get('/select/:id', ensureAuthenticated, idSelectCityController.handle)
citiesRoutes.get('/select', ensureAuthenticated, selectCityController.handle)
citiesRoutes.get('/:id', ensureAuthenticated, getCityController.handle)
citiesRoutes.put('/:id', ensureAuthenticated, updateCityController.handle)
citiesRoutes.delete('/:id', ensureAuthenticated, deleteCityController.handle)
citiesRoutes.delete('/', ensureAuthenticated, multiDeleteCityController.handle)

export { citiesRoutes }
