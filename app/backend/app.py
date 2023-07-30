import time
from flask import Flask, request, jsonify, send_from_directory
import os
from chat_module import chatRequest

app = Flask(__name__, static_folder="../client/dist")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_vite_app(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/about')
def about():
    return 'About page'

# define a route for a query to the chatbot, with a POST request
# the POST request will contain the user's message
# the request will take time to execute so we will await it


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    print(data)
    # wait 5 seconds before returning a response
    chat_response = chatRequest(data['message'])
    # return a response with 201 (created) status code

    return jsonify({'message': chat_response, "user": False}), 201


if __name__ == '__main__':
    app.run(debug=True, port=5000)
