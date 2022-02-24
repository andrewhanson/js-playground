import { PrismaClient } from '@prisma/client'
import express from 'express'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', (req, res) => {
  const results = prisma.user.findMany()
  res.json(results)
})


export default router