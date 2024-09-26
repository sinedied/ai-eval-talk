const API_URL = "https://ashy-sand-01eb5160f.5.azurestaticapps.net/api/chat";

export default class CookingApiProvider {
  constructor(options) {
    // Provider ID can be overridden by the config file (e.g. when using multiple of the same provider)
    this.providerId = options.id || "my cooking api";

    // options.config contains any custom options passed to the provider
    this.config = options.config;
  }

  id() {
    return this.providerId;
  }

  async callApi(prompt, context) {
    // Add your custom API logic here
    // Use options like: `this.config.temperature`, `this.config.max_tokens`, etc.
    // `context.vars` contains the variables from the current test case

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });
    const data = await response.json();

    return {
      output: data.message.content,
    };
  }
}
