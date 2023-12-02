const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { createClient } = require('@supabase/supabase-js');
const { SupabaseVectorStore } = require('langchain/vectorstores/supabase');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const fs = require('fs').promises;
const dotenv = require('dotenv');
dotenv.config();

const openAIApiKey = process.env.OPENAI_API_KEY;
const sbApiKey = process.env.SB_API_KEY;
const sbUrl = process.env.SB_URL;

async function readFileAsync() {
  try {
    const data1 = await fs.readFile("admission-info.txt", "utf-8");
    const data2 = await fs.readFile("admission-info2.txt", "utf-8");

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      separators: ['\n\n', '\n', ' ', ''],
      chunkOverlap: 50
    });

    const output = await splitter.createDocuments([data1, data2]);

    const client = createClient(sbUrl, sbApiKey);

    await SupabaseVectorStore.fromDocuments(
      output,
      new OpenAIEmbeddings({ openAIApiKey }),
      {
        client,
        tableName: 'documents',
      }
    );
  } catch (error) {
    console.error(error);
  }
}

readFileAsync();
