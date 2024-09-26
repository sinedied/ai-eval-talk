# Demo
- This, we want to evaluate a RAG prompt
- Open `prompt.md`
- RAG works on a given context, so we also have to provide a context
  * Open `context.md`
  * We hardcoded the context here, so we can focus on testing the prompt/models
  * We won't cover that here, but you can go further and test the retrieval part, for example to compare embedding models
- Open `promptfooconfig.yaml` and explain the configuration
- `promptfoo eval`
- `promptfoo view -y`
  * show a bit the eval output
  * show a previous run with repeat 20
  