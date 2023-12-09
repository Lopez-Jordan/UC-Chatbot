import { addLineBreaks } from "./utils.js";

function addLineBreaks(text) {
    // Use regular expression to add a newline after each number
    const newText = text.replace(/(\d:)/g, '$1\n');
    return newText;
  }
  
  
  const newTextWithLineBreaks = addLineBreaks(`1: The essay effectively focuses on the impact of the individual (the writer) on the community and self through a unique and compelling experience. The writer demonstrates a deep understanding of the transformative power of community service through their volunteer work at the local animal shelter. They convey a profound sense of personal growth and understanding of the interconnectedness between individual actions and community impact. The essay effectively communicates the writer's passion for making a meaningful difference and showcases a mature reflection on the impact of their experiences on their perspective of community and self. 2: The essay is skillfully written in the first person point of view, utilizing "I" and "my" words to effectively convey the writer's personal involvement and emotional connection to the subject matter. By sharing their own experiences and perspective throughout the narrative, the writer adds a genuine and relatable tone to the essay, thus effectively engaging the reader. This first-person approach enhances the authenticity and sincerity of the writer's account, allowing the reader to empathize with the writer's journey and the impact it had on their community and self. 3: The essay provides numerous specific and tangible examples that vividly illustrate the writer's decision-making, actions, and their tangible impact on the community. Through the writer's initiative to lead fundraising campaigns, contribute to the renovation of living spaces at the animal shelter, and organize community outreach programs, the essay effectively demonstrates the writer's proactive and impactful involvement. These examples not only showcase the writer's hands-on approach to community service but also underline their ability to initiate positive change and inspire others to join their cause. 4: The essay directly and effectively addresses the prompt without resorting to figurative language, creative writing, similes, or metaphors. The writer remains focused on the concrete actions and impact of their volunteer work at the animal shelter, staying true to the specific experiences that shaped their perspective on community and self. By avoiding unnecessary embellishments, the essay maintains a clear and concise narrative that allows the reader to fully grasp the writer's experiences and the transformative effects they had on both the community and the writer's personal growth. 5: The essay exhibits high-quality writing, showcasing strong grammar and punctuation throughout. The writer effectively conveys their ideas with clarity and precision, ensuring that the narrative flows smoothly and is easily comprehensible. The well-crafted sentences and coherent structure enhance the overall readability of the essay, allowing the reader to remain fully engaged with the writer's compelling story. Additionally, the essay's attention to detail and adherence to grammatical conventions contribute to a polished and professional presentation, further bolstering the essay's impact.`);
  console.log(newTextWithLineBreaks);
  