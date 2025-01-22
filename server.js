const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51QkBuyHH7ykn4D8GhePJbbyiRAWbnogqFJukVtasNZylzevnYtjZrq1celjHQHDgGB0y3JMNs9hrrYQxEqAQEIGD00L79fvOw5');

const app = express();
app.use(bodyParser.json());

app.post('/charge', async (req, res) => {
    const { token, amount } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source: token,
            description: 'Donation Charge'
        });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
