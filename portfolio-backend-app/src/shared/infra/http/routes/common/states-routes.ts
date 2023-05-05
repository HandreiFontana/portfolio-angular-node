import { Router } from 'express'
import { CreateStateController } from '@modules/common/use-cases/state/create-state/create-state-controller'
import { ListStateController } from '@modules/common/use-cases/state/list-state/list-state-controller'
import { CountStateController } from '@modules/common/use-cases/state/count-state/count-state-controller'
import { SelectStateController } from '@modules/common/use-cases/state/select-state/select-state-controller'
import { IdSelectStateController } from '@modules/common/use-cases/state/id-select-state/id-select-state-controller'
import { GetStateController } from '@modules/common/use-cases/state/get-state/get-state-controller'
import { UpdateStateController } from '@modules/common/use-cases/state/update-state/update-state-controller'
import { DeleteStateController } from '@modules/common/use-cases/state/delete-state/delete-state-controller'
import { MultiDeleteStateController } from '@modules/common/use-cases/state/multi-delete-state/multi-delete-state-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const statesRoutes = Router()

const createStateController = new CreateStateController()
const listStateController = new ListStateController()
const countStateController = new CountStateController()
const selectStateController = new SelectStateController()
const idSelectStateController = new IdSelectStateController()
const getStateController = new GetStateController()
const updateStateController = new UpdateStateController()
const deleteStateController = new DeleteStateController()
const multiDeleteStateController = new MultiDeleteStateController()

statesRoutes.post('/', ensureAuthenticated, createStateController.handle )
statesRoutes.post('/list', ensureAuthenticated, listStateController.handle)
statesRoutes.post('/count', ensureAuthenticated, countStateController.handle)
statesRoutes.get('/select/:id', ensureAuthenticated, idSelectStateController.handle)
statesRoutes.get('/select', ensureAuthenticated, selectStateController.handle)
statesRoutes.get('/:id', ensureAuthenticated, getStateController.handle)
statesRoutes.put('/:id', ensureAuthenticated, updateStateController.handle)
statesRoutes.delete('/:id', ensureAuthenticated, deleteStateController.handle)
statesRoutes.delete('/', ensureAuthenticated, multiDeleteStateController.handle)

export { statesRoutes }
