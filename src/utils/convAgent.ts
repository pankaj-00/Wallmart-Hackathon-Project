import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { BufferWindowMemory } from "langchain/memory";
import { OpenAI } from "langchain/llms/openai";
import { InitializeAgentExecutorOptions } from "langchain/agents";
import { promptTemplate } from "./promptTemplate";
import { WikipediaQueryRun } from "langchain/tools";
//Tools
import { DynamicTool } from "langchain/tools";
import { searchText } from "./Tools/searchText";
import { Calculator } from "langchain/tools/calculator";


let llm: OpenAI;

export async function initializeModel(temperature: number) {
    try {
        llm = new OpenAI({
            openAIApiKey: process.env['OPEN_AI_API_KEY_SP'],
            temperature: temperature,
        });
        console.log("Model initialized successfully");

    } catch (e) {
        console.error("Model Initialization error", e)
    }
}

export async function convAgent(query: string) {

    try {

        // const memory = new BufferWindowMemory({
        //     memoryKey: "chat_history"
        // });

        const walmartSearchTool = new DynamicTool({
            name: "Walmart Search Tool",
            description: "Use this tool to get information related to Walmart",
            func: searchText,
        })

        const tools = [walmartSearchTool]

        let options: InitializeAgentExecutorOptions = {
            agentType: "chat-zero-shot-react-description",
            verbose: true,
        };

        const conversationalAgent = initializeAgentExecutorWithOptions(tools, llm, options);

        const prompt = await (await promptTemplate()).format({ query });
        const result = (await conversationalAgent).call({ input: prompt }); 

        return result;
    } catch (e) {
        console.error("ConvAgent Error", e)
    }
}

export default { convAgent };