const { OpenAI } = require('openai');

const dotenv = require('dotenv');
dotenv.config();


const openAIAPIKey = process.env.OPEN_AI_KEY_REVIEWER;

const inputEssay = `During my tenure as the president of our high school's environmental club, I immersed myself in fostering a sense of community and driving positive change. From the outset, my leadership was defined by a hands-on approach, focusing not just on organizational tasks but on inspiring collective action and sustainable impact. In the realm of dispute resolution, I encountered a challenge when two members disagreed on the theme for our Earth Day event. Instead of dismissing the issue, I facilitated a structured dialogue where each perspective was heard. Drawing on effective communication and empathy, I guided the group towards a consensus that integrated both viewpoints, resulting in a richer and more inclusive event. One of the pivotal decisions I made involved spearheading a community cleanup initiative. Recognizing the tangible impact we could have, I mobilized the team to collaborate with local residents and businesses. We meticulously planned the logistics, communicated with stakeholders, and ensured everyone felt a sense of ownership in the project. The cleanup not only transformed neglected areas but also strengthened community bonds and instilled a lasting commitment to environmental stewardship. In the broader context of leadership, my actions spoke louder than words. I initiated a recycling program in our school, partnering with local recycling facilities and raising awareness about sustainable practices. This endeavor not only reduced our ecological footprint but also cultivated a culture of responsibility among students. Addressing the prompt, these experiences illuminate how I positively influenced others, resolved disputes, and contributed to group efforts. The narrative is grounded in specific examples, from navigating interpersonal conflicts to organizing impactful events. Each decision and action is meticulously detailed to underscore the tangible outcomes achieved under my leadership. This essay mirrors a real-time interview response, eschewing academic formalities for a conversational tone. It reflects a genuine passion for community and environmental causes, showcasing my ability to lead with authenticity and foster positive change.`;
const essayPrompt = `Describe an example of leadership experience in which you positively influenced others, helped resolve disputes, or contributed to group efforts over time `;

const openai = new OpenAI({
  apiKey: openAIAPIKey,
});

async function getJSONscore(essayPrompt, inputEssay) {
  const JSONprompt = await openai.chat.completions.create({
    messages: [{
        role: "system",
        content: ``,
      },
      { role: "user", content: `You are a helpful essay reviewer designed to output JSON. Please score the following essay from 1-100 on this criteria (labeled: Impact, Self, Examples, Prompt, Grammar)
      1: Essay focuses on impact of individual on community/self through the unique experience/perspective of writer
      2: Written in first person POV (uses "I" and "my" words etc.)
      3: Provides MANY specific/tangible examples that focus on decision, action and impact of writer
      4: Effectively and directly answers prompt without use of figurative language, creative writing, similes or metaphors
      5: Writing Quality, grammar and punctuation
      
      Essay Prompt: ${essayPrompt}
      Essay: ${inputEssay}` 
    
    },],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });
  
  return JSONprompt.choices[0].message.content;

}

async function getJSONreview (essayPrompt, inputEssay, JSONscore){

  const JSONpromptTwo = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `  `,
      },
      { role: "user", content: `You are an essay reviewer, given an essay and a JSON object representing the score for the essay with multiple categories: (labeled: Impact, Self, Examples, Prompt, Grammar)
        that are represented like this:
          1: Essay focuses on impact of individual on community/self through the unique experience/perspective of writer
          2: Written in first person POV (uses "I" and "my" words etc.)
          3: Provides MANY specific/tangible examples that focus on decision, action and impact of writer
          4: Effectively and directly answers prompt without use of figurative language, creative writing, similes or metaphors
          5: Writing Quality, grammar and punctuation

          Essay Prompt: ${essayPrompt}
          Essay: ${inputEssay}
          JSON Score: ${JSONreview}

          return a JSON Object of minimum 100-word cohesive comments for each category based on the score it got from the JSON Score

          JSON Object:
         ` },

    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });
  let JSONcomments = JSONpromptTwo.choices[0].message.content

  return JSONcomments;
}


module.exports = {
  getJSONscore,
  getJSONreview
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
