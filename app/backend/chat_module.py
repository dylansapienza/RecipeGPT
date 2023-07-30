# ensure that the OPENAI_API_KEY is set in the environment
from langchain.llms import OpenAI
# from langchain.vectorstores import FAISS
# from langchain.embeddings.openai import OpenAIEmbeddings

# # load the vector store database
# embeddings = OpenAIEmbeddings()
# db = FAISS.load_local("faiss_index", embeddings)

llm = OpenAI()

# define a chat request function so that it can be exported to flask app


def chatRequest(query: str):
    return llm(query)


# def chatRequest():

# show available engines
