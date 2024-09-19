# Demo scenario

Start from scratch (delete promptfooconfig.yaml)

* `promptfoo init` => compare models
* update config:

```
providers:
  - ollama:chat:llama3.1

defaultTest:
  options:
    provider: file://../gpt4o-mini.yaml
```

* `promptfoo eval`
* `promptfoo view -y`

* `promptfoo eval --repeat 3`
* `promptfoo view -y`

* update config, comment first prompt + add providers:

```
  - ollama:chat:phi3:mini-4k
  - ollama:chat:llama3.1
  - ollama:chat:gemma2:2b
```

* `promptfoo eval`
* `promptfoo view -y`

