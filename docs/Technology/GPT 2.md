# GPT 2

Below are some methods I've come across on how to install and run AI models locally. The below can be installed and run fully offline as long as you have enough system resources to do so.

## Standard Install

Source, with additional information like training [here](https://www.geekslop.com/technology-articles/computers-programming/2020/what-is-gpt-2-and-how-do-i-install-configure-and-use-it-to-take-over-the-world).

1. Install [Anaconda](https://docs.anaconda.com/anaconda/install/windows/).
2. Run Anaconda.
3. Create environment `conda create -n GPT2 python=3`
4. Activate environment with `conda activate GPT2`
5. Clone the repo with `git clone https://github.com/openai/gpt-2.git`
6. `cd gpt-2`
7. Run `pip install --upgrade -r requirements.txt`
8. Download the model `python download_model.py 345M`
	1. Other options exist like 124M, 355M, 774M (~3.1 GB) and 1558M (~6.2 GB)
9. Open `src/interactive_conditional_samples.py`, and change `top_k=40` and `model_name='1558M'` (or whatever model size you downloaded).
10. Run the below

```powershell
conda install numpy
conda install tensorflow==1.15.0
conda install tensorflow-gpu==2.0.0
conda install regex==2017.4.5
conda install fire>=0.1.3
conda install requests==2.21.0
conda install tqdm==4.31.1
conda install _regex
conda install tensorflow-estimator=1.15
```

11. Finally run `python src/interactive_conditional_samples.py`, or ``python src/interactive_conditional_samples.py --top_k 40 --model_name 1558M`` if you didn't change the options in step 9. **Note** that GPT-2 expects you to "start the sentence". As is it's not a chat-based version, but rather gets a start from what you type, and runs with it. Some recommended changing the `temperature=0.9`, but need to play with it.

## Conversation AI

Source [here](https://github.com/huggingface/transfer-learning-conv-ai). Should make GPT more of a chatbot-style system, like ChatGPT. The provided model seems small enough that its use is limited, but may be useful with more data.

1. Install [Anaconda](https://docs.anaconda.com/anaconda/install/windows/).
2. Install [Rust compiler](https://www.rust-lang.org/tools/install).
3. Run PowerShell.
4. Create environment `conda create -n ConvAI python=3`
5. Activate environment with `conda activate ConvAI`
6. Clone the repo with `git clone https://github.com/huggingface/transfer-learning-conv-ai`
7. `cd transfer-learning-conv-ai`
8. Run `pip install -r requirements.txt`
9. Run `python -m spacy download en`
10. Finally, run `python ./interact.py`