# Stable Diffusion

## Current Directory
`%userprofile%\stable-diffusion-webui`

## Prompts

```
85mm vibrant food photo of a chocolate lasagne on a plate on a table at a restaurant. dof. bokeh. soft light. by harry fayt. centered. extremely detailed. Nikon D850. award winning photography 
```

```
A beautiful greek temple with colorful gases and dusts by Stephan Martiniere and Cameron Gray, trending on Artstation
```

```
an army man taking a selfie on the trenches of war, close up shoot, 50mm f2.8,tilt-shift,hyperrealism, super detailed, pencil sketch, trending on artstation, under exposed
```

```
a portrait of intergalactic robot, grim - lighting, high - contrast, intricate, elegant, highly detailed, centered, digital painting, artstation, concept art, smooth, sharp focus, illustration, artgerm, tomasz alen kopera, peter mohrbacher, donato giancola, joseph christian leyendecker, wlop, boris vallejo
```

```
beautiful vintage painting of a hummingbird, insanely detailed, traditional art, old, artistic, art by Katsushika Hokusai
```
 
```
full portrait of robot cat, 1970 style,realistic proportions, highly detailed, smooth, sharp focus, 8k, ray tracing, digital painting, concept art illustration by artgerm greg rutkowski alphonse mucha trending on artstation, nikon d850
```

```
Clean, sharp, vectorized logo of a dystopian sci-fi megacorporation named Amazon. Company logo, icon, trending, modern and minimalist
```

```
extremely beautiful softly lit interior photo of futuristic construction machinery, pneumatic, hydraulic, exoskeleton, yellow, white black, bar codes, logos, details, graphic, excavator, backhoe, black, polished metal, gleaming, black and white corporate decals, polished concrete floor, sharp focus, clear focus, beautiful, award winning photo, extremely beautiful lighting, cinematic, modern, render, architectural, architecture, realistic, clear 
```

```
borg, empty, deep space, detailed space ship, interstellar, octane render, unreal engine, hyper detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, art by artgerm and greg rutkowski and alphonse mucha
```

```
photograph national geographic mountain landscape magic the gathering John Avon, black, atmospheric, 8k high definition
```

## AUTOMATIC1111

1.  Install [Python 3.10.6](https://www.python.org/downloads/windows/), checking "Add Python to PATH"
2.  Install [git](https://git-scm.com/download/win).
3.  Download the stable-diffusion-webui repository, for example by running `git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git`.
4.  Place `model.ckpt` in the `models` directory (see [dependencies](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Dependencies) for where to get it).
5.  __(Optional)__ Place `GFPGANv1.4.pth` in the base directory, alongside `webui.py` (see [dependencies](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Dependencies) for where to get it).
6.  Run `webui-user.bat` from Windows Explorer as normal, non-administrator, user.

## Models

For any of the below, make sure you add the correct keyword. For example for Disney, you need to add `modern disney`, so a query would be `modern disney brad pitt`. Using AUTOMATIC1111 you can change the active model in the top left of the web app.

Disney: https://huggingface.co/nitrosocke/mo-di-diffusion
Classic Disney: https://huggingface.co/nitrosocke/classic-anim-diffusion

## Images That Don't Suck

So you've taken the dive and [installed Stable Diffusion](https://github.com/hlky/stable-diffusion). But this isn't quite like Dalle2. There's sliders everywhere, different diffusers, seeds... Enough to make anyone's head spin. But don't fret. These settings will give you a better experience once you get comfortable with them. In this guide, I'm going to talk about how to generate text2image artwork using Stable Diffusion. **I'm going to go over basic prompting theory, what different settings do, and in what situations you might want to tweak the settings.**

_Disclaimer_: Ultimately we are ALL beginners at this, including me. If anything I say sounds totally different than your experience, please comment and show me with examples! Let's share information and learn together in the comments!

_Note_: if the thought of reading this long post is giving you a throbbing migraine, just use the following settings:

> **CFG (Classifier Free Guidance): 8**

> **Sampling Steps: 50**

> **Sampling Method: k_lms**

> **Random seed**

These settings are completely fine for a wide variety of prompts. That'll get you having fun at least. Save this post and come back to this guide when you feel ready for it.

### Prompting

Prompting could easily be its own post (let me know if you like this post and want me to work on that). But I can go over some good practices and broad brush stuff here.

**Sites that have repositories of AI imagery with included prompts and settings like** [**https://lexica.art/**](https://lexica.art/) **are your god.** Flip through here and look for things similar to what you want. Or just let yourself be inspired. Take note of phrases used in prompts that generate good images. Steal liberally. Remix. Steal their prompt verbatim and then take out an artist. What happens? Have fun with it. Ultimately, the process of creating images in Stable Diffusion is self-driven. I can't tell you what to do.

You can add as much as you want at once to your prompts. Don't feel the need to add phrases one at a time to see how the model reacts. The model likes shock and awe. Typically, the longer and more detailed your prompt is, the better your results will be. Take time to be specific. My theory for this is that people don't waste their time describing in detail images that they don't like. The AI is weirdly intuitively trained to see "Wow this person has a lot to say about this piece!" as "quality image". So be bold and descriptive. Just keep in mind every prompt has a token limit of (I believe) 75. Get yourself a GUI that tells you when you've hit this limit, or you might be banging your head against your desk: some GUIs will happily let you add as much as you want to your prompt while silently truncating the end. Yikes.

If your image looks straight up bad (or nowhere near what you're imagining) at _k_euler_a, step 15, CFG 8_ (I'll explain these settings in depth later), messing with other settings isn't going to help you very much. Go back to the drawing board on your prompt. At the early stages of prompt engineering, you're mainly looking toward mood, composition (how the subjects are laid out in the scene), and color. Your spit take, essentially. If it looks bad, add or remove words and phrases until it doesn't look bad anymore. Try to debug what is going wrong. Look at the image and try to see why the AI made the choices it did. There's always a reason in your prompt (although sometimes that reason can be utterly inscrutable).

Allow me a quick aside on using artist names in prompts: use them. They make a big difference. Studying artists' techniques also yields great prompt phrases. Find out what fans and art critics say about an artist. How do they describe their work?

---

Keep tokenizing in mind:

> scary swamp, dark, terrifying, greg rutkowski

This prompt is an example of one possible way to tokenize a prompt. See how I'm separating descriptions from moods and artists with commas? You _can_ do it this way, but you don't have to. _"moody greg rutkowski piece"_ instead of _"greg rutkowski"_ is cool and valid too. Or "_character concept art by greg rutkowski_". These types of variations can have a massive impact on your generations. Be creative.

Just keep in mind **order matters**. The things near the front of your prompt are weighted more heavily than the things in the back of your prompt. If I had the prompt above and decided I wanted to get a little more greg influence, I could reorder it:

> greg rutkowski, dark, scary swamp, terrifying

Essentially, each chunk of your prompt is a slider you can move around by physically moving it through the prompt. If your faces aren't detailed enough? Add something like _"highly-detailed symmetric faces"_ to the front. Your piece is a little _TOO_ dark? Move "_dark_" in your prompt to the very end. The AI also pays attention to emphasis! If you have something in your prompt that's important to you, be annoyingly repetitive. Like if I was imagining a spooky piece and thought the results of the above prompt weren't scary enough I might change it to:

> greg rutkowski, dark, surreal scary swamp, terrifying, horror, poorly lit

Imagine you were trying to get a glass sculpture of a unicorn. You might add "_glass, slightly transparent, made of glass_". The same repetitious idea goes for quality as well. This is why you see many prompts that go like:

> greg rutkowski, highly detailed, dark, surreal scary swamp, terrifying, horror, poorly lit, trending on artstation, incredible composition, masterpiece

Keeping in mind that putting "quality terms" near the front of your prompt makes the AI pay attention to quality FIRST since order matters. Be a fan of your prompt. When you're typing up your prompt, word it like you're excited. Use natural language that you'd use in real life OR pretentious bull crap. Both are valid. Depends on the type of image you're looking for. Really try to describe your mind's eye and don't leave out mood words.

_PS: In my experimentation, capitalization doesn't matter. Parenthesis and brackets don't matter. Exclamation points work only because the AI thinks you're really exited about that particular word. Generally, write prompts like a human. The AI is trained on how humans talk about art._

Ultimately, prompting is a skill. It takes practice, an artistic eye, and a poetic heart. You should speak to ideas, metaphor, emotion, and energy. Your ability to prompt is not something someone can steal from you. **So if you share an image, please share your prompt and settings.** Every prompt is a unique pen. But it's a pen that's infinitely remixable by a hypercreative AI and the collective intelligence of humanity. The more we work together in generating cool prompts and seeing what works well, the better we _ALL_ will be. That's why I'm writing this at all. I could sit in my basement hoarding my knowledge like a cackling goblin, but I want _everyone_ to do better.

### Classifier Free Guidance (CFG)

Probably the coolest singular term to play with in Stable Diffusion. **CFG measures how much the AI will listen to your prompt vs doing its own thing.** Practically speaking, it is a measure of how confident you feel in your prompt. Here's a CFG value gut check:

-   CFG 2 - 6: Let the AI take the wheel.
    
-   CFG 7 - 11: Let's collaborate, AI!
    
-   CFG 12 - 15: No, seriously, this is a good prompt. Just do what I say, AI.
    
-   CFG 16 - 20: DO WHAT I SAY OR ELSE, AI.
    

All of these are valid choices. It just depends on where you are in your process. I recommend most people mainly stick to the CFG 7-11 range unless you really feel like your prompt is great and the AI is ignoring important elements of it (although it might just not understand). If you'll let me get on my soap box a bit, I believe we are entering a stage of AI history where human-machine teaming is going to be where we get the best results, rather than an AI alone or a human alone. And the CFG 7-11 range represents this collaboration.

The more you feel your prompt sucks, the more you might want to try CFG 2-6. Be open to what the AI shows you. Sometimes you might go "Huh, that's an interesting idea, actually". Rework your prompt accordingly. The AI can run with even the shittiest prompt at this level. At the end of the day, the AI is a hypercreative entity who has ingested most human art on the internet. It knows a thing or two about art. So trust it.

Powerful prompts can survive at CFG 15-20. But like I said above, CFG 15-20 is you screaming at the AI. Sometimes the AI will throw a tantrum (few people like getting yelled at) and say "Shut up, your prompt sucks. I can't work with this!" past CFG 15. If your results look like crap at CFG 15 but you still think you have a pretty good prompt, you might want to try CFG 12 instead. CFG 12 is a softer, more collaborative version of the same idea.

One more thing about CFG. CFG will change how reactive the AI is to your prompts. Seems obvious, but sometimes if you're noodling around making changes to a complex prompt at CFG 7, you'd see more striking changes at CFG 12-15. Not a reason not to stay at CFG 7 if you like what you see, just something to keep in mind.

Sampling Method / Sampling Steps / Batch Count

These are closely tied, so I'm bundling them. Sampling steps and sampling method are kind of technical, so I won't go into what these are actually doing under the hood. I'll be mainly sticking to how they impact your generations. These are also frequently misunderstood, and our understanding of what is _"best"_ in this space is very much in flux. So take this section with a grain of salt. I'll just give you some good practices to get going. I'm also not going to talk about _every_ sampler. Just the ones I'm familiar with.

### k_lms: The Old Reliable

k_lms at 50 steps will give you fine generations most of the time if your prompt is good. k_lms runs pretty quick, so the results will come in at a good speed as well. You could easily just stick with this setting forever at CFG 7-8 and be ok. If things are coming out looking a little cursed, you could try a higher step value, like 80. But, as a rule of thumb, **make sure your higher step value is actually getting you a benefit, and you're not just wasting your time**. You can check this by holding your seed and other settings steady and varying your step count up and down. You might be shocked at what a low step count can do. I'm very skeptical of people who say their every generation is 150 steps.

### k_ddim: The Speed Demon

k_ddim at 8 steps (**yes, you read that right. 8 steps**) can get you great results at a blazing fast speed. This is a wonderful setting for generating a lot of images quickly. When I'm testing new prompt ideas, I'll set k_ddim to 8 steps and generate a batch of 4-9 images. This gives you a _fantastic_ birds eye view of how your prompt does across multiple seeds. This is a terrific setting for rapid prompt modification. You can add one word to your prompt at k_ddim:8 and see how it affects your output across seeds in less than 5 seconds (graphics card depending). For more complex prompts, k_ddim might need more help. Feel free to go up to 15, 25, or even 35 if your output is still coming out looking garbled (or is the prompt the issue??). You'll eventually develop an eye for when increasing step count will help. Same rule as above applies, though. Don't waste your own time. Every once in a while make sure you need all those steps.

### k_euler_a: The Chameleon

Everything that applies to k_ddim applies here as well. This sampler is also lightning fast and also gets great results at extremely low step counts (steps 8-16). But it also changes generation style a lot more. Your generation at step count 15 might look very different than step count 16. And then they might BOTH look very different than step count 30. And then THAT might be very different than step count 65. This sampler is wild. It's also worth noting here in general: **your results will look** _**TOTALLY**_ **different depending on what sampler you use**. So don't be afraid to experiment. If you have a result you already like a lot in k_euler_a, pop it into k_ddim (or vice versa).

### k_dpm_2_a: The Starving Artist

In my opinion, this sampler might be the best one, but it has serious tradeoffs. It is _VERY_ slow compared to the ones I went over above. However, for my money, k_dpm_2_a in the 30-80 step range is very very good. It's a bad sampler for experimentation, but if you already have a prompt you love dialed in, let it rip. Just be prepared to wait. And wait. If you're still at the stage where you're adding and removing terms from a prompt, though, you should stick to k_euler_a or k_ddim at a lower step count.

I'm currently working on a theory that certain samplers are better at certain types of artwork. Some better at portraits, landscapes, etc. I don't have any concrete ideas to share yet, but it can be worth modulating your sampler a bit according to what I laid down above if you feel you have a good prompt, but your results seem uncharacteristically bad.

_A note on large step sizes_: Many problems that can be solved with a higher step count can also be solved with better prompting. If your subject's eyes are coming out terribly, try adding stuff to your prompt talking about their "symmetric highly detailed eyes, fantastic eyes, intricate eyes", etc. This isn't a silver bullet, though. Eyes, faces, and hands are difficult, non-trivial things to prompt to. Don't be discouraged. Keep experimenting, and don't be afraid to _remove_ things from a prompt as well. Nothing is sacred. You might be shocked by what you can omit. For example, I see many people add "attractive" to amazing portrait prompts... But most people in the images the AI is drawing from _are already_ attractive. In my experience, most of the time "attractive" simply isn't needed. _(Attractiveness is extremely subjective, anyway. Try "unique nose" or something. That usually makes cool faces. Make cool models.)_

_A note on large batch sizes_: Some people like to make 500 generations and choose, like, the best 4. I think in this situation you're better off reworking your prompt more. Most solid prompts I've seen get really good results within 10 generations.

### Seed

Have we saved the best for last? Arguably. If you're looking for a _singular good image_ to share with your friends or reap karma on reddit, looking for a good seed is _very high priority_. A good seed can enforce stuff like composition and color across a wide variety of prompts, samplers, and CFGs. Use k_ddim:8-16 to go seed hunting with your prompt. However, if you're mainly looking for a _fun prompt that gets consistently good results_, seed is less important. In that situation, you want your prompt to be adaptive across seeds and overfitting it to one seed can sometimes lead to it looking worse on other seeds. Tradeoffs.

The actual seed integer number is not important. It more or less just initializes a random number generator that defines the diffusion's starting point. Maybe someday we'll have cool seed galleries, but that day isn't today.

Seeds are fantastic tools for A/B testing your prompts. Lock your seed (choose a random number, choose a seed you already like, whatever) and add a detail or artist to your prompt. Run it. How did the output change? Repeat. This can be super cool for adding and removing artists. As an exercise for the reader, try running _"Oasis by HR Giger"_ and then _"Oasis by beeple"_ on the same seed. See how it changes a lot but some elements remain similar? Cool. Now try _"Oasis by HR Giger and beeple"_. It combines the two, but the composition remains pretty stable. That's the power of seeds.

Or say you have a nice prompt that outputs a portrait shot of a _"brunette"_ woman. You run this a few times and find a generation that you like. Grab that particular generation's seed to hold it steady and change the prompt to a _"blonde"_ woman instead. The woman will be in an identical or very similar pose but now with blonde hair. You can probably see how insanely powerful and easy this is. _Note:_ a higher CFG (12-15) can sometimes help for this type of test so that the AI actually listens to your prompt changes.

