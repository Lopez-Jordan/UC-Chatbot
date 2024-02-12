const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
const { StringOutputParser } = require('langchain/schema/output_parser');
const { retriever } = require('./retriever.js');
const { combineDocuments } = require('./combineDocuments.js');
const { RunnablePassthrough, RunnableSequence } = require("langchain/schema/runnable");
const dotenv = require('dotenv');

dotenv.config();

const openAIApiKey = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI({ 
    openAIApiKey,
    temperature: 0,
    model: "gpt-3.5-turbo-1106",
});

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    `Given some conversation history (if any) and a question, convert the question to a standalone question. 
        conversation history: {conv_history}
        question: {question} 
        standalone question:`
);

const answerPrompt = PromptTemplate.fromTemplate(
    
    `You are a helpful and enthusiastic support bot who can answer a given question about
    the University of California admission processes based on the context provided.
    Try to find the answer in the context and answer in a short and cohesive way. OR try find the answer in the conversation history.
    If you can't find the answer from the context or conversation history, say "I'm sorry, I don't know the answer to that." 
    And direct the questioner to email ucinfo@applyucsupport.net. Don't try to make up an answer. Always speak as if you were chatting to a friend.

    context: {context}
    conversation history: {conv_history}
    question: {question}
    answer: `

);

const standaloneQuestionChain = standaloneQuestionPrompt
    .pipe(llm)
    .pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
    prevResult => prevResult.standalone_question,
    retriever,
    combineDocuments
]);

const answerChain = answerPrompt
    .pipe(llm)
    .pipe(new StringOutputParser());

const chain = RunnableSequence.from([
    {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough()
    },
    {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
        conv_history: ({ original_input }) => original_input.conv_history

    },
    answerChain
]);

function getResponse(inputStr, convHistory) {
    const response = chain.invoke({
        question: inputStr,
        conv_history: convHistory
    });
    return response;
}

module.exports = { getResponse };
