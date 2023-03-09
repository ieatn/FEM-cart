
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const stripe = require('stripe')(process.env.SECRET)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.send('hi')
})

app.post('/checkout', async (req, res) => {
    const items = req.body.items
    let lineItems = []
    items.forEach((item) => {
        lineItems.push(
            {
                price: 20,
                quantity: 1
            }
        )
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://localhost:5173/success',
        cancel_url: 'https://localhost:5173/cancel'
    })

    res.send(JSON.stringify({
        url: session.url
    }))
})



app.listen(4000, () => console.log('listening port 4000'))