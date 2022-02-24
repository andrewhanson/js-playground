import organizations from './organizations'
import users from './users'

import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Yo from admin index')
})

router.use('/organizations', organizations )
router.use('/users', users)


export default router