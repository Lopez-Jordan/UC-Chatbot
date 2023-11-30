const express = require('express');
const { getResponse } = require('./chatbot/LLM');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/response', async (req, res) => {
  try {
    let userInput = req.query.message;
    let botResponse = await getResponse(userInput);

    if (botResponse) {
      res.status(200).json({ message: botResponse });
    } else {
      console.log("Something went wrong :/");
      res.status(500).json({ error: "Something went wrong :/" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => console.log(`NOW Listening http://localhost:${PORT}`));

