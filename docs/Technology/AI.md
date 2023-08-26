# AI

## Local Models

### GUIs

- [LM Studio](https://lmstudio.ai/)
- [Oobabooga](https://github.com/oobabooga/text-generation-webui)

### Coding

Can use LM studio for local APIs, then something like [Wingman](https://github.com/nvms/wingman) in VS Code to get support during programming.

### Models

- [TheBloke](https://huggingface.co/TheBloke) on HuggingFace
	- [CodeLlama 13B](https://huggingface.co/models?search=thebloke/codellama)
	- [Llama 2 13B](https://huggingface.co/models?sort=trending&search=thebloke%2Fllama-2-13b)

Code Llama comes in three model sizes, and three variants, and have been trained between January 2023 and July 2023.

- Code Llama: our base models designed for general code synthesis and understanding
- Code Llama - Python: designed specifically for Python
- Code Llama - Instruct: for instruction following and safer deployment

### Quantization

Good read on what this means [here](https://postgresml.org/blog/announcing-gptq-and-ggml-quantized-llm-support-for-huggingface-transformers).

- GGUF: Successor to GGML, CPU + GPU inference (but mostly CPU).
	- GGUF is a new format introduced by the llama.cpp team on August 21st 2023. It is a replacement for GGML, which is no longer supported by llama.cpp. The key benefit of GGUF is that it is a extensible, future-proof format which stores more information about the model as metadata. It also includes significantly improved tokenization code, including for the first time full support for special tokens. This should improve performance, especially with models that use new special tokens and implement custom prompt templates.
- GGML: CPU + GPU inference (but mostly CPU). No longer supported by [llama.cpp](https://github.com/ggerganov/llama.cpp).
- GPTQ: GPU inference

Note the RAM below can be split between GPU and "CPU" RAM, depending on the quantization method used. 

| Quant method | Bits | Max RAM required | Use case                                                 |
| ------------ | ---- | ---------------- | -------------------------------------------------------- |
| Q2_K         | 2    | 16.71 GB         | smallest, significant quality loss - not recommended     |
| Q3_K_S       | 3    | 17.11 GB         | very small, high quality loss                            |
| Q3_K_M       | 3    | 18.78 GB         | very small, high quality loss                            |
| Q3_K_L       | 3    | 20.27 GB         | small, substantial quality loss                          | 
| Q4_K_S       | 4    | 21.65 GB         | small, greater quality loss                              |
| Q4_K_M       | 4    | 22.72 GB         | medium, balanced quality - **recommended**               |
| Q5_K_S       | 5    | 25.74 GB         | large, low quality loss - **recommended**                |
| Q5_K_M       | 5    | 26.34 GB         | large, very low quality loss - **recommended**           |
| Q6_K         | 6    | 30.18 GB         | very large, extremely low quality loss                   |
| Q8_0         | 8    | 38.29 GB         | very large, extremely low quality loss - not recommended |

As the models are currently fully loaded into memory, you will need adequate disk space to save them and sufficient RAM to load them. At the moment, memory and disk requirements are the same.

| Model  | Original size  | Quantized size (4-bit) |
|--------|----------------|------------------------|
| 7B     | 13 GB          | 3.9 GB                 |
| 13B    | 24 GB          | 7.8 GB                 |
| 30B    | 60 GB          | 19.5 GB                |
| 65B    | 120 GB         | 38.5 GB                |

Several quantization methods are supported. They differ in the resulting model disk size and inference speed.

| Model  | Measure       | F16     | Q4_0    | Q4_1    | Q5_0    | Q5_1    | Q8_0   |
|--------|---------------|---------|---------|---------|---------|---------|--------|
| 7B     | perplexity    | 5.9066  | 6.1565  | 6.0912  | 5.9862  | 5.9481  | 5.9070 |
| 7B     | file size     | 13.0G   | 3.5G    | 3.9G    | 4.3G    | 4.7G    | 6.7G   |
| 7B     | ms/tok @ 4th  | 127     | 55      | 54      | 76      | 83      | 72     |
| 7B     | ms/tok @ 8th  | 122     | 43      | 45      | 52      | 56      | 67     |
| 7B     | bits/weight   | 16.0    | 4.5     | 5.0     | 5.5     | 6.0     | 8.5    |
| 13B    | perplexity    | 5.2543  | 5.3860  | 5.3608  | 5.2856  | 5.2706  | 5.2548 |
| 13B    | file size     | 25.0G   | 6.8G    | 7.6G    | 8.3G    | 9.1G    | 13G    |
| 13B    | ms/tok @ 4th  | -       | 103     | 105     | 148     | 160     | 131    |
| 13B    | ms/tok @ 8th  | -       | 73      | 82      | 98      | 105     | 128    |
| 13B    | bits/weight   | 16.0    | 4.5     | 5.0     | 5.5     | 6.0     | 8.5    |

You can use the `perplexity` example to measure perplexity over a given prompt (lower perplexity is better). For more information, see [https://huggingface.co/docs/transformers/perplexity](https://huggingface.co/docs/transformers/perplexity).

The perplexity measurements in table above are done against the `wikitext2` test dataset ([https://paperswithcode.com/dataset/wikitext-2](https://paperswithcode.com/dataset/wikitext-2)), with context length of 512. The time per token is measured on a MacBook M1 Pro 32GB RAM using 4 and 8 threads.


## GPT 2

Below are some methods I've come across on how to install and run AI models locally. The below can be installed and run fully offline as long as you have enough system resources to do so.

### Standard Install

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

### Conversation AI

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