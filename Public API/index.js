const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.blockchain.com/v3/exchange/tickers');
        const data = response.data;

        // Sort the data by the 24-hour volume in descending order.
        const sortedData = data.filter(ticker => ticker.symbol.includes('-USD') && ticker.volume_24h > 0)
                               .sort((a, b) => b.volume_24h - a.volume_24h)
                               .slice(0, 10);

        res.render('index', { tickers: sortedData });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send('Error fetching data from Blockchain');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
