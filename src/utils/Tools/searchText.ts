import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import path from "path";


let vectorStore: FaissStore;

export async function initializeVectorStore() {
    try {
        const text = fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'walmart.txt'), "utf8");
        const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 2000, chunkOverlap:300 });
        const docs = await textSplitter.createDocuments([text]);

        // Load the docs into the vector store
        vectorStore = await FaissStore.fromDocuments(
            docs,
            new OpenAIEmbeddings({ openAIApiKey: process.env['OPEN_AI_API_KEY_SP'] })
        );

        console.log("VectorStore Initialized!");

        return vectorStore;
    } catch (e) {
        console.error("Vector Store Initialization failed!\n", e);
    }
}

export async function searchText(query: string) {
    // Search for the most similar document
    const result = await vectorStore.similaritySearch(query, 1);
    return result[0].pageContent;
}

export default { searchText };