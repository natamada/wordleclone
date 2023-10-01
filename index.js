const PORT = 8000
const axios = require('axios');
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())

app.get('/word', async (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getRandom',
        params: {wordLength: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.WORD_API_KEY,
          'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
      };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.json(response.data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})




app.listen(PORT, () => console.log('Server running on port ', PORT))