import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('yo from the status page')
})


export default router