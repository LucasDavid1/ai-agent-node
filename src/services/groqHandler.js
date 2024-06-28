const { Groq } = require("groq-sdk");
require('dotenv').config();


class GroqHandler {
  constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    this.model = process.env.GROQ_MODEL || "llama2-70b-4096";
  }

  async testConnection(userInput) {
    try {
      const chatCompletion = await this.client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        model: this.model,
      });

      return chatCompletion.choices[0]?.message?.content || "No response";
    } catch (error) {
      console.error("Error connecting to Groq:", error);
      return "Error connecting to Groq";
    }
  }
}

module.exports = GroqHandler;
