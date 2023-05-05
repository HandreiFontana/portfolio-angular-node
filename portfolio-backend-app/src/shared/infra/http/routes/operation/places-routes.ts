import { Router } from 'express'
import { CreatePlaceController } from '@modules/operation/use-cases/place/create-place/create-place-controller'
import { ListPlaceController } from '@modules/operation/use-cases/place/list-place/list-place-controller'
import { CountPlaceController } from '@modules/operation/use-cases/place/count-place/count-place-controller'
import { SelectPlaceController } from '@modules/operation/use-cases/place/select-place/select-place-controller'
import { IdSelectPlaceController } from '@modules/operation/use-cases/place/id-select-place/id-select-place-controller'
import { GetPlaceController } from '@modules/operation/use-cases/place/get-place/get-place-controller'
import { UpdatePlaceController } from '@modules/operation/use-cases/place/update-place/update-place-controller'
import { DeletePlaceController } from '@modules/operation/use-cases/place/delete-place/delete-place-controller'
import { MultiDeletePlaceController } from '@modules/operation/use-cases/place/multi-delete-place/multi-delete-place-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const placesRoutes = Router()

const createPlaceController = new CreatePlaceController()
const listPlaceController = new ListPlaceController()
const countPlaceController = new CountPlaceController()
const selectPlaceController = new SelectPlaceController()
const idSelectPlaceController = new IdSelectPlaceController()
const getPlaceController = new GetPlaceController()
const updatePlaceController = new UpdatePlaceController()
const deletePlaceController = new DeletePlaceController()
const multiDeletePlaceController = new MultiDeletePlaceController()

placesRoutes.post('/', ensureAuthenticated, createPlaceController.handle )
placesRoutes.post('/list', ensureAuthenticated, listPlaceController.handle)
placesRoutes.post('/count', ensureAuthenticated, countPlaceController.handle)
placesRoutes.get('/select/:id', ensureAuthenticated, idSelectPlaceController.handle)
placesRoutes.get('/select', ensureAuthenticated, selectPlaceController.handle)
placesRoutes.get('/:id', ensureAuthenticated, getPlaceController.handle)
placesRoutes.put('/:id', ensureAuthenticated, updatePlaceController.handle)
placesRoutes.delete('/:id', ensureAuthenticated, deletePlaceController.handle)
placesRoutes.delete('/', ensureAuthenticated, multiDeletePlaceController.handle)

export { placesRoutes }
