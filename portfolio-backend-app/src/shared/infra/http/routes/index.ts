import { Router } from 'express'
import { authenticateRoutes } from './authentication/authenticate-routes'
import { userGroupsRoutes } from './security/user-groups-routes'
import { blockReasonsRoutes } from './security/block-reasons-routes'
import { usersRoutes } from './authentication/users-routes'
import { tfaRoutes } from './authentication/tfa-routes'
import { usersSecurityRoutes } from './security/users-security-routes'
import { passwordsRoutes } from './authentication/passwords-routes'
import { modulesRoutes } from './security/modules-routes'
import { menuOptionsRoutes } from './security/menu-options-routes'
import { profilesRoutes } from './security/profiles-routes'
import { profileOptionsRoutes } from './security/profile-options-routes'
import { usersProfilesRoutes } from './security/users-profiles-routes'
import { navigationsRoutes } from './security/navigations-routes'
import { configsRoutes } from './security/configs-routes'
import { filtersRoutes } from './security/filters-routes'
import { countriesRoutes } from './common/countries-routes'
import { statesRoutes } from './common/states-routes'
import { citiesRoutes } from './common/cities-routes'
import { customersRoutes } from './operation/customers-routes'
import { placesRoutes } from './operation/places-routes'

const router = Router()

router.use(authenticateRoutes)
router.use('/block-reasons', blockReasonsRoutes)
router.use('/user-groups', userGroupsRoutes)
router.use('/users', usersRoutes)
router.use('/tfa', tfaRoutes)
router.use('/users-security', usersSecurityRoutes)
router.use('/passwords', passwordsRoutes)
router.use('/modules', modulesRoutes)
router.use('/menu-options', menuOptionsRoutes)
router.use('/profiles', profilesRoutes)
router.use('/profile-options', profileOptionsRoutes)
router.use('/users-profiles', usersProfilesRoutes)
router.use('/navigations', navigationsRoutes)
router.use('/configs', configsRoutes)
router.use('/filters', filtersRoutes)
router.use('/countries', countriesRoutes)
router.use('/states', statesRoutes)
router.use('/cities', citiesRoutes)
router.use('/customers', customersRoutes)
router.use('/places', placesRoutes)

export { router }
