const express = require('express');
const { getResponse } = require('./chatbot/LLM');
const { getJSONscore, getJSONreview } = require('./esssayReviewer/main')
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/response', async (req, res) => {
  try {
    let userInput = req.body.message;
    let botResponse = await getResponse(userInput);

    if (botResponse) {
      res.status(200).json({ message: botResponse });
    } else {
      console.log("Something went wrong ://");
      res.status(500).json({ error: "Something went wrong :/" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


app.post('/api/JSONscore', async (req, res) => {
  try {
    let currEssayPrompt = req.body.essayPrompt;
    let currInputEssay = req.body.inputEssay;

    let responseObj = await getJSONscore(currEssayPrompt, currInputEssay);

    if (responseObj){
      res.status(200).json({message: responseObj})
    } else {
      console.log("Something went wrong ://");
      res.status(400).json({ error: "Something went wrong :/" });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/JSONreview', async (req, res) => {
  try {
    let currEssayPrompt = req.body.essayPrompt;
    let currInputEssay = req.body.inputEssay;
    let currJSONscore = req.body.JSONscore;

    let comments = await getJSONscore(currEssayPrompt, currInputEssay, currJSONscore)
  
    if (comments){
      res.status(200).json({message: comments});
    } else {
      res.status(400).json({ error: "Something went wrong :/" })
    }
  } catch (error) {
    console.error(error);
  }
}); 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => console.log(`NOW Listening http://localhost:${PORT}`));

