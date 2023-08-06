import time
from flask import Flask, request, jsonify, send_from_directory
import os
from chat_module import chatRequest
from langchain.llms import OpenAI
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from recipeFunctions import recipeOrchestrator

app = Flask(__name__, static_folder="../client/dist")


def load_faiss_index():
    # Example: a new index for vectors of dimension 128
    embeddings = OpenAIEmbeddings()
    index = FAISS.load_local("./faiss_index_combined", embeddings)
    retriever = index.as_retriever(search_type="similarity_score_threshold", search_kwargs={
                                   "k": 1, "score_threshold": .7})

    return retriever


def load_llm():
    llm = OpenAI()
    return llm


app.retriever = load_faiss_index()
app.llm = load_llm()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_vite_app(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/data/<path:path>')
def serve_data(path):
    return send_from_directory('data', path)


@app.route('/about')
def about():
    return 'About page'

# define a route for a query to the chatbot, with a POST request
# the POST request will contain the user's message
# the request will take time to execute so we will await it


@app.route('/api/chat', methods=['POST'])
def chat():

    # intialize the index from faiss
    retriever = app.retriever
    llm = app.llm
    data = request.json
    query = data['message']

    llm_output = recipeOrchestrator(query, retriever, llm)

    print(llm_output)

    chat_response = llm_output['recipe_summary']

    source_pdf_path = llm_output['recipe_path']
    recipe_image = llm_output['recipe_image']

    return (jsonify({'message': chat_response, "user": False, "recipe_json": llm_output['recipe_json'], "source_pdf_path": source_pdf_path, "recipe_image": recipe_image}), 201)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
