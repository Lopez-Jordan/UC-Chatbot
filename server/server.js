const express = require('express');
const { getResponse } = require('./chatbot/LLM');
const { getJSONscore, getCommentary } = require('./esssayReviewer/main');
const sequelize = require('./config/connection');
const User = require('./model/User');
const path = require('path');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3003"}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/response', async (req, res) => {
  try {
    let userInput = req.body.message;
    let convHistory = req.body.convHistory
    let botResponse = await getResponse(userInput, convHistory);

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

app.post('/api/commentary', async (req, res) => {
  try {
    let currEssayPrompt = req.body.essayPrompt;
    let currInputEssay = req.body.inputEssay;
    let currJSONscore = req.body.JSONscore;

    let comments = await getCommentary(currEssayPrompt, currInputEssay, currJSONscore)
  
    if (comments){
      res.status(200).send(comments);
    } else {
      res.status(400).json({ error: "Something went wrong :/" })
    }
  } catch (error) {
    console.error(error);
  }
}); 




///////////////////////////////////////////////////////////////////////////////////////
const storeItems = new Map([
  [1, { priceInCents: 500, name: "Basic (4 credits)" }],
  [2, { priceInCents: 1000, name: "Professional (12 credits)" }],
]);

app.post("/api/create-checkout-session", async (req, res) => {
  const credits = req.body.credits;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:3003/successfulPurchase/${credits}`,
      cancel_url: `http://localhost:3003/purchase`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});


///////////////////////////////////////////////////////////////////////////////////////
// metadata : {
//   user : req.body.email,
//   credits: req.body.credits
// },

app.post('/api/login', async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where : {
        email : req.body.email
      }
    })
    if (!existingUser){
      const newUser = await User.create({
        email: req.body.email,
        credits: 1
      });
      res.status(200).json(newUser);
    } else {
      res.status(200).json(existingUser);
    }

  } catch (error) {
    res.status(500).json({error: error});
  }
});

app.put('/api/addCredits', async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where : {
        email: req.body.email
      }
    });

    if (!existingUser){
      res.status(400).json({message : "no user found with that email! :/"});
      return;
    }

    await existingUser.increment('credits', { by: req.body.credits });

    res.status(200).json({message: "successful update!"});
    
  } catch (error) {
    console.error('Error updating credits:', error);
  }
});



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`NOW Listening http://localhost:${PORT}`));
});

