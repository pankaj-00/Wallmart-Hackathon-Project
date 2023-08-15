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
    json = open('src/data/faqs.json')
    examples = json.load(json)

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
    You will ask the user to only ask queries related to walmart. You can make use of the tools given
    only when necessary otherwise refer to the examples given below. You will also compulsorily answer in one sentence 
    and no longer. Here are some examples of conversation between the assistant and the customer: 
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
    return {
        "searchDB": FAISS.load_local("src/data/walmart_index", gpt4allemb),
        "productDB": FAISS.load_local("src/data/product_index", gpt4allemb),
        "policiesDB": FAISS.load_local("src/data/policies_index", gpt4allemb)
    }

def getconvAgent():
    def walmartSearch(query: str) -> str:
        docs = searchDB.similarity_search(query, 2)
        return docs[0].page_content+docs[1].page_content

    def walmartProduct(query: str) -> str:
        docs = productDB.similarity_search(query, 2)
        return docs[0].page_content+docs[1].page_content

    def walmartPolicies(query: str) -> str:
        docs = policiesDB.similarity_search(query, 2)
        return docs[0].page_content

    # Set of tools for the conversational agent.
    tools = [
        Tool(
            name="Walmart Information",
            func=walmartSearch,
            description='Use this tool to get information related Walmart as a company.'
        ),
        Tool(
            name="Walmart Products",
            func=walmartProduct,
            description="Use this tool to get information related to the products sold by Walmart."
        ),
        Tool(
            name="Walmart Policies",
            func=walmartPolicies,
            description="Use this tool to get information related to the return policies, coupon policies and price-match policies."
        ),
    ]
    conversationalAgent = initialize_agent(
        agent='zero-shot-react-description', 
        tools=tools, 
        llm=llm,
        # max_iterations=3,
        handle_parsing_errors=True,
        verbose = True
    )
    
    return conversationalAgent


OPEN_AI_API_KEY = os.environ.get('OPEN_AI_API_KEY_SP')
llm = OpenAI(openai_api_key = OPEN_AI_API_KEY)
gpt4allemb =  GPT4AllEmbeddings()
db = getDB()
searchDB = db['searchDB']
productDB = db['productDB']
policiesDB = db['policiesDB']


#Instantiating OpenAI model
def mainFunc():
    convAgent = getconvAgent()
    promptTemplate = getPrompt()
    # sampleQuery = "My order was not delivered. Can you help me track?"
    result = convAgent(promptTemplate.format(query = sys.argv[2]))
    # result = convAgent(promptTemplate.format(query = sampleQuery))
    json_object_result = json.dumps(result, indent=4)
    with open(sys.argv[3], "w") as outfile:
        outfile.write(json_object_result)
    print(json_object_result)    
    
    

if sys.argv[1] == 'mainFunc':
    mainFunc()
# mainFunc()
sys.stdout.flush()