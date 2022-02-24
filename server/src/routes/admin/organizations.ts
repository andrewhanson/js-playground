import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('ADMIN - Organizations')
})


export default router