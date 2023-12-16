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
      
      You are a very critical essay grader designed to output JSON. As accurately as possible, grade the following essay from 1-100 on this criteria:
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
      
      You are helpful and very essay reviewer given an essay and its corresponding already scored categories:

        1: Essay focuses on impact of individual on community/self through the unique experience/perspective of writer (score: ${JSONscore.Impact})
        2: Essay is written in first person point of view and uses "I" and "my" words etc. (score: ${JSONscore.Self})
        3: Essay provides many specific/tangible examples that focus on decision, action and impact of writer (score: ${JSONscore.Examples})
        4: Essay effectively and directly answers prompt without use of figurative language, creative writing, similes or metaphors etc. (score: ${JSONscore.Prompt})
        5: Essay has high writing quality, grammar and punctuation (score: ${JSONscore.Grammar})

          Essay Prompt: ${essayPrompt}
          Essay: ${inputEssay}

          write me a very critical, 600 word cohesive review (with examples from the essay) for each scored category. Also provide examples on where to improve if necessary.

          just the review with specific examples:
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
