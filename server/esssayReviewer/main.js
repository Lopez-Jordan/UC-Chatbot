const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openAIAPIKey = process.env.OPEN_AI_KEY_REVIEWER;

const openai = new OpenAI({
  apiKey: openAIAPIKey,
});

async function getJSONscore(essayPrompt, inputEssay) {
  const JSONprompt = await openai.chat.completions.create({
    messages: [{
        role: "system",
        content: ``,
      },
      { role: "user", content: `
      
      You are a helpful essay grader designed to output JSON. As accurately as possible, grade the following essay from 1-100 on this criteria:
      1: Impact: Essay focuses on impact of individual on community/self through the unique experience/perspective of writer
      2: Self: Essay is written in first person point of view (uses "I" and "my" words etc.)
      3: Examples: Provides MANY specific/tangible examples that focus on decision, action and impact of writer
      4: Prompt: Effectively and directly answers prompt without use of figurative language, creative writing, similes or metaphors
      5: Grammar: Writing Quality, grammar and punctuation
      6: Overall: Total Score (out of 100)

      Essay Prompt: ${essayPrompt}
      Essay: ${inputEssay}
      
      `},],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });
  
  return JSONprompt.choices[0].message.content;
}

async function getCommentary (essayPrompt, inputEssay, JSONscore){

  const JSONpromptTwo = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `  `,
      },
      { role: "user", content: `
      
      You are helpful and enthusiastic essay reviewer given an essay and its corresponding already scored categories:

        1: Essay focuses on impact of individual on community/self through the unique experience/perspective of writer (score: ${JSONscore.Impact})
        2: Essay is written in first person point of view and uses "I" and "my" words etc. (score: ${JSONscore.Self})
        3: Essay provides many specific/tangible examples that focus on decision, action and impact of writer (score: ${JSONscore.Examples})
        4: Essay effectively and directly answers prompt without use of figurative language, creative writing, similes or metaphors etc. (score: ${JSONscore.Prompt})
        5: Essay has high writing quality, grammar and punctuation (score: ${JSONscore.Grammar})

          Essay Prompt: ${essayPrompt}
          Essay: ${inputEssay}


          write me a nicely formatted, 600 word cohesive and thorough review (with examples from the essay) for each scored category (just the review)

          review with examples:
         ` },

    ],
    model: "gpt-3.5-turbo-1106",
  });
  let JSONcomments = JSONpromptTwo.choices[0].message.content  
  return JSONcomments;
}


module.exports = {
  getJSONscore,
  getCommentary,
}




// R E Q U I R M E N T S:

// PROS:
// - Focuses on impact of writer and/or impact on others  (unique experience from their perspective) (Impact)
// - centers self in response  (Uses "I" and "my" throughout essay)     (Self)
// - provides specific, tangible examples in response (focus on decision, action and impact of student) (Examples) 
// - answers prompt direct and to the point - (no figurative language, creative writing, metaphors/similes) (Prompt)
// - more of an interview (not an essay)  (Interview)

// CONS:
// - Does not provide much context about writer's personal experience
// - focuses more on structure rather than content (explaining too much about the story's setting and scene rather than how the story impacted themself)
// - Centers others' narratives rather than their own
// - Writes about hardship to get sympathy rather than to show growth 





// - Make front page responsive

// - update .txt files with more info (and links)
// - fix secondary UC prompt
// - add memory to the chatbot
// - optimize chatbot (prompts, chunk size, etc. combine document size)
// - make a really good readme with all the diagrams and shit
// - build 2nd page functionality (essay reviewer
