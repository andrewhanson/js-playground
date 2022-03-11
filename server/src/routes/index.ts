import express from 'express'
import adminRoutes from './admin'
import statusRoutes from './status'
import profileRoutes from './profile'

const router = express.Router()

router.get('/', (req, res) => {
  const {clock, facilityId } = req.context

  res.send(`Hello World from routers folder.  It is ${clock.now()} and ${clock.localInZone(clock.timeZone)} in ${clock.timeZone} at ${facilityId}`)
})

router.use('/admin', adminRoutes)
router.use('/profile', profileRoutes)
router.use('/status', statusRoutes)


export default router