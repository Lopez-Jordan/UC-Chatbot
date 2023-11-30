const { SupabaseVectorStore } = require('langchain/vectorstores/supabase');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();


const openAIApiKey = process.env.OPENAI_API_KEY;
const sbApiKey = process.env.SB_API_KEY;
const sbUrl = process.env.SB_URL;

const embeddings = new OpenAIEmbeddings({ openAIApiKey });

const client = createClient(sbUrl, sbApiKey);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: 'documents',
  queryName: 'match_documents'
});

const retriever = vectorStore.asRetriever();

module.exports = { retriever };
