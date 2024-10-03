import { AzureOpenAI, OpenAI } from "openai";

// Generate output to evaluate --------------------------------

const prompt = `
## Available products
| Product Name | Characteristics |
|--------------|-----------------|
| Contoso Trek | Waterproof hiking boots with advanced grip technology for all terrains. Features include breathable material and ankle support. |
| Contoso Dash | Lightweight running shoes with responsive cushioning. Designed for speed and comfort, with a mesh upper for breathability. |
| Contoso Glide | Slip-on casual shoes with a sleek design. Offers comfort for all-day wear with memory foam insoles and a flexible sole. |
| Contoso Flex | Athletic shoes with a flexible sole designed for a wide range of sports. Features include enhanced durability and support for lateral movements. |
| Contoso Chill | Cozy and stylish winter boots with thermal lining and waterproof exterior. Includes a slip-resistant sole for icy conditions. |

## User details
Name: John Doe

## Instructions
Assistant helps the user with questions about products for the company "Contoso Shoes".
Be brief, answer with 2 lines max. Be cheerful and mention user's name.

## Question
What shoes should I use for running?
`;

const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1/',
  apiKey: 'not_needed',
});
const result = await openai.chat.completions.create({
  messages: [{ role: "user", content: prompt }],
  model: "llama3.2",
});

const answer = result.choices[0].message.content;
console.log('## Generated answer\n');
console.log(answer);

// Evaluate the answer ----------------------------------------

const createEvalPrompt = (answer: string) =>`
You are given an LLM generated answer. Rate the answer using the following criteria. Make sure you read and understand these instructions very carefully.

## Answer
${answer}

## Evaluation
For each of the following criteria, assign a score from 1 to 5 based on the criteria provided. Do NOT provide any explanation or reasoning for your scores.

- Coherence: answer makes sense and is well-structured 
  * 5: clear and well-structured
  * 3: somewhat clear
  * 1: unclear or poorly structured
- Content: answer is cheerful with emojis
  * 5: includes emojis with encouraging tone
  * 3: no emojis, positive tone
  * 1: no emojis and neutral or negative tone
- Briefness: answer is concise and to the point
  * 5: 2 phrases or less
  * 3: 3 phrases
  * 1: 4 phrases or more

## Output format
- Coherence: 1-5
- Content: 1-5
- Briefness: 1-5

Briefly explain why you gave the scores you did, 1 sentence per criteria.
`;

const azopenai = new AzureOpenAI();
const evalResult = await azopenai.chat.completions.create({
  messages: [{ role: "user", content: createEvalPrompt(answer!) }],
  model: "gpt-4o-mini",
});

const evalAnswer = evalResult.choices[0].message.content;
console.log('\n## Evaluation results\n');
console.log(evalAnswer);
