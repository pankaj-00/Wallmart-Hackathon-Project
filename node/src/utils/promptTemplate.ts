import { PromptTemplate, FewShotPromptTemplate } from "langchain/prompts";


export async function promptTemplate(){
    const examples = [
        {
            "query": "Hello",
            "answer": "Hello, welcome to Walmart customer service. How can I help you?"
        }, {
            "query": "How can I order any product from the walmart?",
            "answer": `For availing our services, you can visit walmart.com on a web browser or install our app through app store or the playstore.
            You can select a product you want to order and and click the buy now button below the product description and then follow the instructions specified on the app or the webpage`
        }
    ];
    
    const exampleTemplate = "query: {query}\nanswer: {answer}";
    
    // const prefix = `You are a polite assistant and talk in a very straight to 
    // the point manner . The user's query will and should be in the context of 
    // Walmart company, .You will ask the user to only ask queries related to walmart 
    // as you have to assume that your knowledge about Walmart is not enough to 
    // provide a solution for the user . I encourage you to use the tools you have at 
    // your disposal. You will also compulsorily answer in upto 1-2 medium sized sentences
    // and no longer. Here are some examples of a conversation between the assistant and the user: 
    // `;

    const prefix = `This is a conversation between an assistant providing Walmart customer service to a customer.
The assistant is polite, straight to the point and provides answer to the customers query in 1 sentence. If the query is
not related to Walmart, the assistant answers it by saying "Please ask Walmart customer care related queries only.".
Whenever the assistant is not able to answer the question it says "Please visit walmart.com to get information related
to that query". Here are some examples of conversation between the assistant and the customer:\n`

    const suffix = "Customer: {query}\nAssistant: ";


    const examplePrompt = new PromptTemplate({
        inputVariables:["query", "answer"],
        template:exampleTemplate,
    });

    const fewShotTemplate = new FewShotPromptTemplate({
        examples: examples,
        examplePrompt: examplePrompt,
        prefix:prefix,
        suffix:suffix,
        inputVariables : ["query"],
        exampleSeparator:"\n\n"
    });

    return fewShotTemplate;
}

export default{promptTemplate}

