# Chat

This section has to do with text generation models (same ideas as ChatGPT) that can run **100% local**. See [Stable Diffusion](Draw.md) for the information on image generation AI, 100% local.

**Want the TL;DR on how to run a model 100% locally?**

1. Regardless if you have a CPU or GPU, download [LM Studio](https://lmstudio.ai/). It's the best GUI I've found, and integrates with HuggingFace, can act as a API server, and allows for running on CPU, GPU, or a mix of both.
2. Open the app, and download one of the models on the home page. Smaller models are a good start (something with 2B or 7B in the name).
3. Download the model **Quantization Q4_K_M** to start with. We can get smaller or larger ones after seeing how this one performs.
4. After it's downloaded it will appear in LM Studio under the 📂 icon in the app.
5. Click on the 💬 icon, **New Chat**.
6. On the right you may want to select *GPU Acceleration* under **Model Initialization** if you have one, and start with **10 layers** (we can always modify later).
7. From the top, select one of the models you downloaded and load it.
8. Chat away!

> [!example]
> What size model should you get? See the below table **4-bit Model Requirements for GPU inference** for a starting point. For example, assuming you have at least 32GB RAM and a 3090, you can run a 4-bit 34B with good performance.

## Models

- Leaderboards [here](https://chat.lmsys.org/?leaderboard) and [here](https://tatsu-lab.github.io/alpaca_eval/)
- [TheBloke](https://huggingface.co/TheBloke) on 🤗 offers great models.

More parameters (i.e. more data) in the model, the higher quality the output. Consumer hardware typically doesn't have the capability to fit the largest models and run them. With some exceptions the typical parameters you can run locally is up to 34B with nice hardware (3090, 32GB Ram). Some do run 70B and 180B parameter models, but that gets into custom built AI machines (64GB+ RAM and 2+ GPUs, or professional level GPUs like the NVIDIA A100). Here's an example of where things stand today. [Source](https://lifearchitect.ai/models/).

![](_assets/2024-Alan-D-Thompson-AI-Bubbles-Planets-Rev-1.png)

![](_assets/2023-Alan-D-Thompson-LLM-Emerging-Rev-0.png)

## GUIs

- [LM Studio](https://lmstudio.ai/)
	- Beta versions [here](https://lmstudio.ai/beta-releases.html).
- [Oobabooga](https://github.com/oobabooga/text-generation-webui)

## System Requirements

Note the below is *system* RAM.

**8-bit Model Requirements for GPU inference**

| Model                    | VRAM Used  | Card examples          | RAM/Swap to Load* |
|--------------------------|------------|------------------------|-------------------|
| LLaMA 7B / Llama 2 7B    | 10GB       | 3060 12GB, 3080 10GB   | 24 GB             |
| LLaMA 13B / Llama 2 13B  | 20GB       | 3090, 3090 Ti, 4090    | 32 GB             |
| LLaMA 33B / Llama 2 34B  | ~40GB      | A6000 48GB, A100 40GB  | ~64 GB            |
| LLaMA 65B / Llama 2 70B  | ~80GB      | A100 80GB              | ~128 GB           |

**4-bit Model Requirements for GPU inference**

| Model                   | Minimum Total VRAM | Card examples                                             | RAM/Swap to Load* |
| ----------------------- | ------------------ | --------------------------------------------------------- | ----------------- |
| LLaMA 7B / Llama 2 7B   | 6GB                | GTX 1660, 2060, AMD 5700 XT, RTX 3050, 3060               | 6 GB              |
| LLaMA 13B / Llama 2 13B | 10GB               | AMD 6900 XT, RTX 2060 12GB, 3060 12GB, 3080, A2000        | 12 GB             |
| LLaMA 33B / Llama 2 34B | ~20GB              | RTX 3080 20GB, A4500, A5000, 3090, 4090, 6000, Tesla V100 | ~32 GB            |
| LLaMA 65B / Llama 2 70B | ~40GB              | A100 40GB, 2x3090, 2x4090, A40, RTX A6000, 8000           | ~64 GB            |

**System RAM, not VRAM, required to load the model, in addition to having enough VRAM. Not required to run the model.*

**llama.cpp Requirements for CPU inference**

| Model  | Original Size  | Quantized Size (4-bit) |
|--------|----------------|------------------------|
| 7B     | 13 GB          | 3.9 GB                 |
| 13B    | 24 GB          | 7.8 GB                 |
| 33B    | 60 GB          | 19.5 GB                |
| 65B    | 120 GB         | 38.5 GB                |

## Coding

Can use LM studio as a local API with a VS Code extension like [Continue](https://github.com/continuedev/continue).

## Quantization

Good read on what this means [here](https://postgresml.org/blog/announcing-gptq-and-ggml-quantized-llm-support-for-huggingface-transformers).

**My dumbed down take is this.** Imagine the "full" model stores a bunch of numbers. BILLIONS of them. Those numbers have a lot of digits hanging off the back (i.e. 3.123982709717963...). That's a lot of data to store when you store a lot of digits like that. but do we need them all? What if we just dropped a bunch of digits towards the end of those numbers? So our new number we store is 3.123982. What if we did it again? At some point the number isn't really close enough to the original number from the full model to be useful. Basically how long can you go on rounding the numbers until they lose their meaning? That's where **quantization** comes in. Smaller files are easier to run on hardware, but at what point does the model spit out gibberish?

- GGUF: Successor to GGML, CPU + GPU inference (you can adjust what percentage of the model is processed by which part). 
	- GGUF is a new format introduced by the llama.cpp team on August 21st 2023. It is a replacement for GGML, which is no longer supported by llama.cpp. The key benefit of GGUF is that it is a extensible, future-proof format which stores more information about the model as metadata. It also includes significantly improved tokenization code, including for the first time full support for special tokens. This should improve performance, especially with models that use new special tokens and implement custom prompt templates.
- GGML: CPU + GPU inference (but mostly CPU). No longer supported by [llama.cpp](https://github.com/ggerganov/llama.cpp), which is the foundation of most of these desktop applications.
- GPTQ: GPU inference

Note the RAM below can be split between GPU and system RAM, depending on the quantization method used. The below is an extract on a specific model, but should serve as a good guideline in terms of what model quantization are best. The reason a model like `Q5_K_M` is preferred over `Q8_0` is because the quality different between the two is so small, loading the larger model doesn't really provide any benefit (it's less than half a percent "better" go to with the full model, at the expense of requiring more resources to load and use).

| Quant method | Bits | Use case                                                 |
| ------------ | ---- | -------------------------------------------------------- |
| Q2_K         | 2    | smallest, significant quality loss - not recommended     |
| Q3_K_S       | 3    | very small, high quality loss                            |
| Q3_K_M       | 3    | very small, high quality loss                            |
| Q3_K_L       | 3    | small, substantial quality loss                          |
| Q4_K_S       | 4    | small, greater quality loss                              |
| Q4_K_M       | 4    | medium, balanced quality - **recommended**               |
| Q5_K_S       | 5    | large, low quality loss - **recommended**                |
| Q5_K_M       | 5    | large, very low quality loss - **recommended**           |
| Q6_K         | 6    | very large, extremely low quality loss                   |
| Q8_0         | 8    | very large, extremely low quality loss - not recommended |

The following new quantization types are added to `ggml`:

- `GGML_TYPE_Q2_K` - "type-1" 2-bit quantization in super-blocks containing 16 blocks, each block having 16 weight. Block scales and mins are quantized with 4 bits. This ends up effectively using `2.5625` bits per weight (bpw)
- `GGML_TYPE_Q3_K` - "type-0" 3-bit quantization in super-blocks containing 16 blocks, each block having 16 weights. Scales are quantized with 6 bits. This end up using `3.4375` bpw.
- `GGML_TYPE_Q4_K` - "type-1" 4-bit quantization in super-blocks containing 8 blocks, each block having 32 weights. Scales and mins are quantized with 6 bits. This ends up using `4.5` bpw.
- `GGML_TYPE_Q5_K` - "type-1" 5-bit quantization. Same super-block structure as `GGML_TYPE_Q4_K` resulting in `5.5` bpw
- `GGML_TYPE_Q6_K` - "type-0" 6-bit quantization. Super-blocks with 16 blocks, each block having 16 weights. Scales are quantized with 8 bits. This ends up using `6.5625` bpw
- `GGML_TYPE_Q8_K` - "type-0" 8-bit quantization. Only used for quantizing intermediate results. The difference to the existing `Q8_0` is that the block size is 256. All 2-6 bit dot products are implemented for this quantization type.

This is exposed via `llama.cpp` quantization types that define various "quantization mixes" as follows:

- `LLAMA_FTYPE_MOSTLY_Q2_K` - uses `GGML_TYPE_Q4_K` for the `attention.vw` and `feed_forward.w2` tensors, `GGML_TYPE_Q2_K` for the other tensors.
- `LLAMA_FTYPE_MOSTLY_Q3_K_S` - uses `GGML_TYPE_Q3_K` for all tensors
- `LLAMA_FTYPE_MOSTLY_Q3_K_M` - uses `GGML_TYPE_Q4_K` for the `attention.wv`, `attention.wo`, and `feed_forward.w2` tensors, else `GGML_TYPE_Q3_K`
- `LLAMA_FTYPE_MOSTLY_Q3_K_L` - uses `GGML_TYPE_Q5_K` for the `attention.wv`, `attention.wo`, and `feed_forward.w2` tensors, else `GGML_TYPE_Q3_K`
- `LLAMA_FTYPE_MOSTLY_Q4_K_S` - uses `GGML_TYPE_Q4_K` for all tensors
- `LLAMA_FTYPE_MOSTLY_Q4_K_M` - uses `GGML_TYPE_Q6_K` for half of the `attention.wv` and `feed_forward.w2` tensors, else `GGML_TYPE_Q4_K`
- `LLAMA_FTYPE_MOSTLY_Q5_K_S` - uses `GGML_TYPE_Q5_K` for all tensors
- `LLAMA_FTYPE_MOSTLY_Q5_K_M` - uses `GGML_TYPE_Q6_K` for half of the `attention.wv` and `feed_forward.w2` tensors, else `GGML_TYPE_Q5_K`
- `LLAMA_FTYPE_MOSTLY_Q6_K`- uses 6-bit quantization (`GGML_TYPE_Q8_K`) for all tensors

As the models are currently fully loaded into memory, you will need adequate disk space to save them and sufficient RAM to load them. At the moment, memory and disk requirements are the same.

| Model  | Original size  | Quantized size (4-bit) |
|--------|----------------|------------------------|
| 7B     | 13 GB          | 3.9 GB                 |
| 13B    | 24 GB          | 7.8 GB                 |
| 30B    | 60 GB          | 19.5 GB                |
| 65B    | 120 GB         | 38.5 GB                |

## Perplexity

Simply, perplexity means to be surprised. We measure how much the model is surprised by seeing new data. The lower the perplexity, the better the training is. The take away here is it's *always* better to use a larger model, even if the quantization is greater. From a functional perspective, get the largest model (parameter-wise) you can, with the largest bit quantization until it's too slow for you to want to use.

![](_assets/Perplexity.png)

Here are a few charts showing various models and quantization levels.

| Model | Measure      | F16    | Q4_0   | Q4_1   | Q5_0   | Q5_1   | Q8_0   |
| ----- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 7B    | perplexity   | 5.9066 | 6.1565 | 6.0912 | 5.9862 | 5.9481 | 5.9070 |
| 7B    | file size    | 13.0G  | 3.5G   | 3.9G   | 4.3G   | 4.7G   | 6.7G   |
| 7B    | ms/tok @ 4th | 127    | 55     | 54     | 76     | 83     | 72     |
| 7B    | ms/tok @ 8th | 122    | 43     | 45     | 52     | 56     | 67     |
| 7B    | bits/weight  | 16.0   | 4.5    | 5.0    | 5.5    | 6.0    | 8.5    |
| 13B   | perplexity   | 5.2543 | 5.3860 | 5.3608 | 5.2856 | 5.2706 | 5.2548 |
| 13B   | file size    | 25.0G  | 6.8G   | 7.6G   | 8.3G   | 9.1G   | 13G    |
| 13B   | ms/tok @ 4th | -      | 103    | 105    | 148    | 160    | 131    |
| 13B   | ms/tok @ 8th | -      | 73     | 82     | 98     | 105    | 128    |
| 13B   | bits/weight  | 16.0   | 4.5    | 5.0    | 5.5    | 6.0    | 8.5    |

Shown another way...

| Model  | Measure     | Q2_K    | Q3_K_S  | Q3_K_M  | Q3_K_L  | Q4_0    | Q4_1    | Q4_K_S  | Q4_K_M  | Q5_0    | Q5_1    | Q5_K_S  | Q5_K_M  | Q6_K    | Q8_0    | F16    |
|--------|-------------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|--------|
| 7B     | perplexity  | 6.7764  | 6.4571  | 6.1503  | 6.0869  | 6.1565  | 6.0912  | 6.0215  | 5.9601  | 5.9862  | 5.9481  | 5.9419  | 5.9208  | 5.9110  | 5.9070  | 5.9066 |
| 13B    | perplexity  | 5.8545  | 5.6033  | 5.4498  | 5.4063  | 5.3860  | 5.3608  | 5.3404  | 5.3002  | 5.2856  | 5.2706  | 5.2785  | 5.2638  | 5.2568  | 5.2548  | 5.2543 |

## Embeddings

Good intro [here](https://simonwillison.net/2023/Sep/4/llm-embeddings/). An embedding model lets you take a string of text - a word, sentence, paragraph or even a whole document - and turn that into an array of floating point numbers called an *embedding vector*.

I like to think of an embedding vector as a location in 1,536-dimensional space. The distance between two vectors is a measure of how semantically similar they are in meaning, at least according to the model that produced them.

![](_assets/EmbeddingsInSpace.jpeg)

“One happy dog” and “A playful hound” will end up close together, even though they don’t share any keywords. The embedding vector represents the language model’s interpretation of the meaning of the text.

## Parameters

**Temperature** is like a knob that adjusts how creative or focused the output becomes. Higher temperatures (eg., 1.2) increase randomness, resulting in more imaginative and diverse text. Lower temperatures (eg., 0.5) make the output more focused, predictable, and conservative. When the temperature is set to 0, the output becomes completely deterministic, always selecting the most probable next token and producing identical results each time. A safe range would be around 0.6 - 0.85, but you are free to search what value fits best for you.

**Top-P** limits the selection of the next token to a subset of tokens with a cumulative probability above a threshold P. This method, also known as nucleus sampling, finds a balance between diversity and quality by considering both token probabilities and the number of tokens available for sampling. When using a higher value for top-P (eg., 0.95), the generated text becomes more diverse. On the other hand, a lower value (eg., 0.1) produces more focused and conservative text. The default value is 0.4, which is aimed to be the middle ground between focus and diversity, but for more creative tasks a higher top-p value will be beneficial, about 0.5-0.9 is a good range for that.

**Top-K** sampling selects the next token only from the top K most likely tokens predicted by the model. It helps reduce the risk of generating low-probability or nonsensical tokens, but it may also limit the diversity of the output. A higher value for top-K (eg., 100) will consider more tokens and lead to more diverse text, while a lower value (eg., 10) will focus on the most probable tokens and generate more conservative text. 30 - 60 is a good range for most tasks.