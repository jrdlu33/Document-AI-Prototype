# Initial code to setup the backend infrastructure! Bear with me as this is still a bit rough. We will: 
# (1) import the necessary framework classes from Flask and Llamaindex 
# (2) initialize_index() by processing all the already-uploaded content in our local 'documents' folder
# (3) utilize insert_into_index() and upload_file() to take any uploaded file, break it into text nodes (i.e. "earnings were $200 million"), and store these nodes as indexes
# (4) Define our API server parameters using Flask. Initial routes include the default hello world ("/"), taking a question and querying GPT ("/query"), and processing uploads ("/upload")
# Questions and feedback are highly appreciated! Feel free to message me for anything

import os
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from llama_index import Document, SimpleDirectoryReader, VectorStoreIndex, Document, ServiceContext, StorageContext, load_index_from_storage, ServiceContext

app = Flask(__name__)
CORS(app)


# NOTE: For local deployments only
os.environ['OPENAI_API_KEY'] = "Insert your OpenAI Key here"

index = None
index_dir = "./index"

def initialize_index():
    global index
    storage_context = StorageContext.from_defaults()
    if os.path.exists(index_dir):
        index = load_index_from_storage(StorageContext.from_defaults(persist_dir=index_dir))
    else:
        documents = SimpleDirectoryReader("./documents").load_data()
        index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
        storage_context.persist(index_dir)


def insert_into_index(doc_text, doc_id=None):
    index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
    
    document = SimpleDirectoryReader(input_files=[doc_text]).load_data()[0]

    if doc_id is not None:
        document.doc_id = doc_id

       # Add the document to the index
    if index is not None:
        
        index.insert(document)



def upload_file():
    if 'file' not in request.files:
        return "Please send a POST request with a file", 400

    filepath = None
    try:
        uploaded_file = request.files["file"]
        filename = uploaded_file.filename
        filepath = os.path.join('documents', os.path.basename(filename))
        uploaded_file.save(filepath)

        if request.form.get("filename_as_doc_id", None) is not None:
            insert_into_index(filepath, doc_id=filename)
        else:
            insert_into_index(filepath)
    except Exception as e:
        # Cleanup temp file
        if filepath is not None and os.path.exists(filepath):
            os.remove(filepath)
        return "Error: {}".format(str(e)), 500

    # Cleanup temp file
    if filepath is not None and os.path.exists(filepath):
        os.remove(filepath)

    return "File inserted!", 200

@app.route("/")
def home():
    return "Hello World!"

@app.route("/query", methods=["GET"])
def query_index():
    global index
    query_text = request.args.get("text", None)
    if query_text is None:
        return "No text found, please include a ?text=blah parameter in the URL", 400
    query_engine = index.as_query_engine()
    response = query_engine.query(query_text)
    return str(response), 200


@app.route("/uploadFile", methods=["POST"])
def upload_file():
    if 'file' not in request.files:
        return "Please send a POST request with a file", 400

    filepath = None
    try:
        uploaded_file = request.files["file"]
        filename = uploaded_file.filename
        filepath = os.path.join('documents', os.path.basename(filename))
        uploaded_file.save(filepath)

        if request.form.get("filename_as_doc_id", None) is not None:
            insert_into_index(filepath, doc_id=filename)
        else:
            insert_into_index(filepath)
    except Exception as e:
        # cleanup temp file
        if filepath is not None and os.path.exists(filepath):
            os.remove(filepath)
        return "Error: {}".format(str(e)), 500

    return "File inserted!", 200


if __name__ == "__main__":
    initialize_index()
    app.run(host="0.0.0.0", port=5601)



