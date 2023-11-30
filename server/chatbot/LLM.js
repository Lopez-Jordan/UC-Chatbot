const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
const { StringOutputParser } = require('langchain/schema/output_parser');
const { retriever } = require('./retriever.js');  // Assuming retriever is in retriever.js
const { combineDocuments } = require('./combineDocuments.js');
const { RunnablePassthrough, RunnableSequence } = require("langchain/schema/runnable");
const dotenv = require('dotenv');

dotenv.config();


const openAIApiKey = process.env.OPENAI_API_KEY;

const llm = new ChatOpenAI({ 
    openAIApiKey,
    temperature: 0,
    model: "gpt-3.5-turbo",
});

const standaloneQuestionPrompt = PromptTemplate.fromTemplate('Given a question, convert it to a standalone question. question: {question} standalone question:');

const answerPrompt = PromptTemplate.fromTemplate(
    
    `You are a helpful and enthusiastic support bot who can answer a given question about
    the University of California admission processes based on the context provided.
    Try to find the answer in the context and answer in a short and cohesive way. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." 
    And direct the questioner to email help@example.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.

    context: {context}
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
        question: ({ original_input }) => original_input.question
    },
    answerChain
]);

function getResponse(inputStr) {
    const response = chain.invoke({
        question: inputStr
    });
    return response;
}

module.exports = { getResponse };
