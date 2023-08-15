from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.memory import ConversationBufferMemory
from langchain.embeddings import GPT4AllEmbeddings
from langchain.document_loaders import TextLoader
from langchain.agents import initialize_agent
from langchain import FewShotPromptTemplate
from langchain.vectorstores import FAISS
from langchain import PromptTemplate
from langchain.agents import Tool
from langchain.llms import OpenAI
from dotenv import load_dotenv
import os
import json
import sys

load_dotenv()

def getPrompt():
    # create our examples
    examples = [
        {
            "query": "Hello",
            "answer": "Hello, welcome to Walmart customer service. How can I help you?"
        }, {
            "query": "How can I order any product from the walmart?",
            "answer": """For availing our services, you can visit walmart.com on a web browser or install our app through app store or the playstore.
            You can select a product you want to order and and click the buy now button below the product description and then follow the instructions specified on the app or the webpage"""
        }
    ]

    # create a example template
    example_template = """
    User: {query}
    AI: {answer}
    """

    # create a prompt example from above template
    example_prompt = PromptTemplate(
        input_variables=["query", "answer"],
        template=example_template
    )

    # now break our previous prompt into a prefix and suffix
    # the prefix is our instructions
    prefix = """You are a polite assistant and talk in a very straight to the point manner . 
    The user's query will and should be in the context of Walmart company .You will ask the 
    user to only ask queries related to walmart as you have to assume that your knowledge about 
    Walmart is not enough to  provide a solution for the user . I encourage you to use the tools 
    you have at your disposal .  You will also compulsorily answer in one sentence and no longer.
    Here are some examples of conversation between the assistant and the customer: 
    """

    # and the suffix our user input and output indicator
    suffix = """
    User: {query}
    AI: """

    # now create the few shot prompt template
    few_shot_prompt_template = FewShotPromptTemplate(
        examples=examples,
        example_prompt=example_prompt,
        prefix=prefix,
        suffix=suffix,
        input_variables=["query"],
        example_separator="\n\n"
    )
    
    return few_shot_prompt_template

def getDB():
    return FAISS.load_local("src/data/faiss_index", gpt4allemb)

def getconvAgent():
    def walmartSearch(query: str) -> str:
        docs = db.similarity_search(query, 2)
        return docs[0].page_content
    tools = [
    Tool(
        name="Search",
        func=walmartSearch,
        description='Search functionality for walmart related queries'
        ),
    ]
    conversationalAgent = initialize_agent(
        agent='zero-shot-react-description', 
        tools=tools, 
        llm=llm,
        max_iterations=2,
        handle_parsing_errors=True,
    )
    
    return conversationalAgent

OPEN_AI_API_KEY = os.environ.get('OPEN_AI_API_KEY_SP')
llm = OpenAI(openai_api_key = OPEN_AI_API_KEY)
gpt4allemb =  GPT4AllEmbeddings()
db = getDB()

#Instantiating OpenAI model
def mainFunc():
    convAgent = getconvAgent()
    promptTemplate = getPrompt()
    # sampleQuery = "Who is the founder of Walmart?"
    result = convAgent(promptTemplate.format(query = sys.argv[2]))
    json_object_result = json.dumps(result, indent=4)
    with open(sys.argv[3], "w") as outfile:
        outfile.write(json_object_result)
    

if sys.argv[1] == 'mainFunc':
    mainFunc()
    
# sys.stdout.flush()