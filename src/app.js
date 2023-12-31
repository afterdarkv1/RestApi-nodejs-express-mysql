import express from 'express'
import productsRoutes from './routes/products.routes.js'


const app = express()

app.use(express.json( ))

app.use('/api', productsRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app