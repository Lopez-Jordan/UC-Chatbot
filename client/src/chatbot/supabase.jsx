import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import fs from "fs/promises";

import dotenv from 'dotenv';
dotenv.config();

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const sbApiKey = import.meta.env.VITE_SB_API_KEY;
const sbUrl = import.meta.env.VITE_SB_URL;


async function readFileAsync() {
    try {
        const data1 = await fs.readFile("admission-info.txt", "utf-8");    // bringing in the 'scrimba-info.txt' file here
        const data2 = await fs.readFile("admission-info2.txt", "utf-8");    

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            separators: ['\n\n', '\n', ' ', ''],
            chunkOverlap: 50
        });

        const output = await splitter.createDocuments([data1, data2]);  // output after splitting the 'scrimba-info.txt'

        const client = createClient(sbUrl, sbApiKey);


        await SupabaseVectorStore.fromDocuments(
            output,                                             // putting output into our vector store 
            new OpenAIEmbeddings({ openAIApiKey }),
            {
               client,
               tableName: 'documents',
            }
        )
    } catch (error) {
        console.error(error);
    }
}

readFileAsync();
