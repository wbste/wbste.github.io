# Chat with Docs

Based on [this](https://blog.streamlit.io/build-a-chatbot-with-custom-data-sources-powered-by-llamaindex/). Added a few lines to run local. This changes the API base URL to whatever you want.

```python
...
import openai, os
os.environ["OPENAI_API_BASE"] = "http://localhost:8000/v1"
openai.api_key = "nothing"
...
```

A lot of the other stuff, like the `venv` setup, used the same [steps](Remove%20Background.md#Setup) as previously. I also added `include-system-site-packages = true` to `pyvenv.cfg` so I wouldn't have to download CUDA and torch again. Entire code is below.

```python
import streamlit as st
from llama_index import VectorStoreIndex, ServiceContext, StorageContext, load_index_from_storage
from llama_index.llms import OpenAI
import openai, os
from llama_index import SimpleDirectoryReader

# All based on this: https://blog.streamlit.io/build-a-chatbot-with-custom-data-sources-powered-by-llamaindex/
# To do: Figure out storing, loading, and updating indices.

os.environ["OPENAI_API_BASE"] = "http://localhost:8000/v1"

st.set_page_config(page_title="PrivateChat", page_icon="🦙", layout="centered", initial_sidebar_state="auto", menu_items=None)
openai.api_key = "nothing"
st.title("Chat with your docs!")
st.info("Thanks to LlamaIndex and LM Studio", icon="🔥")
         
if "messages" not in st.session_state.keys(): # Initialize the chat messages history
    st.session_state.messages = [
        {"role": "assistant", "content": "Ask me a question about Streamlit's open-source Python library!"}
    ]

@st.cache_resource(show_spinner=False)
def load_data():
    with st.spinner(text="Loading and indexing the docs – hang tight! This should take 1-2 minutes."):
        reader = SimpleDirectoryReader(input_dir="./data", recursive=True)
        docs = reader.load_data()
        service_context = ServiceContext.from_defaults(embed_model="local:BAAI/bge-base-en-v1.5")
        index = VectorStoreIndex.from_documents(docs, service_context=service_context)
        return index

index = load_data() # Builds index
# index.storage_context.persist(persist_dir="./storage") # To save data to disk.
# index = load_index_from_storage(StorageContext.from_defaults(persist_dir="./storage")) # To load existing data

if "chat_engine" not in st.session_state.keys(): # Initialize the chat engine
        st.session_state.chat_engine = index.as_chat_engine(chat_mode="condense_question", verbose=True)

if prompt := st.chat_input("Your question"): # Prompt for user input and save to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})

for message in st.session_state.messages: # Display the prior chat messages
    with st.chat_message(message["role"]):
        st.write(message["content"])

# If last message is not from assistant, generate a new response
if st.session_state.messages[-1]["role"] != "assistant":
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            response = st.session_state.chat_engine.chat(prompt)
            st.write(response.response)
            message = {"role": "assistant", "content": response.response}
            st.session_state.messages.append(message) # Add response to message history
```