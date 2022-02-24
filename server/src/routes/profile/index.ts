import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('you from profile page')
})


export default router