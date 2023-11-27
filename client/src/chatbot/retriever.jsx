import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { createClient } from '@supabase/supabase-js'



const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const sbApiKey = import.meta.env.VITE_SB_API_KEY;
const sbUrl = import.meta.env.VITE_SB_URL;



const embeddings = new OpenAIEmbeddings({ openAIApiKey })

const client = createClient(sbUrl, sbApiKey)

const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents'
})

const retriever = vectorStore.asRetriever()

export { retriever }