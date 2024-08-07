const { Groq } = require("groq-sdk");
const { FUNCTION_DICT, SYSTEM_PROMPT, GROQ_MODEL } = require('../lib/constants');
const settings = require('../config/database');

require('dotenv').config();


class GroqHandlerSimple {
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


async function callFunction(funcName, ...args) {
    // [ { query: '' } ]
    console.log("callFunction", args)
    const convertedArgs = args.map(arg => 
        { console.log("INSIDE ARG", arg)
            return typeof arg === 'string' && !isNaN(arg) ? parseFloat(arg) : arg
        }
    );
    
    if (funcName in FUNCTION_DICT) {
        return await FUNCTION_DICT[funcName](...convertedArgs);
    } else {
        throw new Error("Function not found");
    }
}


class GroqHandler {
    constructor() {
        this.client = new Groq({ apiKey: settings.GROQ_API_KEY });
        this.model = GROQ_MODEL;
    }

    async getCompletion(userInput) {
      try {
          const chatCompletion = await this.client.chat.completions.create({
              messages: [
                  {
                      role: "system",
                      content: SYSTEM_PROMPT,
                  },
                  {
                      role: "user",
                      content: userInput,
                  }
              ],
              model: this.model,
          });
          return chatCompletion.choices[0].message.content;
      } catch (error) {
          console.error('Error in getCompletion:', error);
          throw error;
      }
    }
    
    processOutput(modelOutput) {
        try {
            const output = JSON.parse(modelOutput);
            if (Array.isArray(output)) {
                return output;
            } else if (typeof output === 'object' && 'function' in output) {
                return [output];
            } else {
                return ["parseError", {}];
            }
        } catch (error) {
            return ["parseError", {}];
        }
    }

    async executeOperations(processedOutput) {
        const results = [];
        const context = {
            createdArtists: [],
            createdBand: null
        };
    
        for (const operation of processedOutput) {
            const funcName = operation.function;
            const args = operation.arguments;
            
            let result;
            if (funcName === 'createArtist') {
                result = await callFunction(funcName, args);
                context.createdArtists.push(result);
            } else if (funcName === 'createBand') {
                if (args.memberIds) {
                    args.member_ids = args.memberIds;
                    delete args.memberIds;
                }
                if (!args.member_ids) {
                    args.member_ids = context.createdArtists.map(artist => artist.id);
                }
                result = await callFunction(funcName, args);
                context.createdBand = result;
            } else if (funcName === 'createAlbum') {
                if ('releaseDate' in args) {
                    args.releaseDate = new Date(args.releaseDate);
                }
                if ('bandId' in args && typeof args.bandId === 'number') {
                    args.bandId = context.createdBand ? context.createdBand.id : args.bandId;
                }
                result = await callFunction(funcName, args);
            } else {
                result = await callFunction(funcName, args);
            }
            
            results.push(result);
        }
    
        return results;
    }

    async determineFunctionAndCall(userInput) {
        const modelOutput = await this.getCompletion(userInput);
        
        const processedOutput = this.processOutput(modelOutput);
        console.log("#########", modelOutput)
        if (processedOutput[0] === "parseError") {
            return "Error: Could not parse the model output";
        }
        
        return this.executeOperations(processedOutput);
    }
}

module.exports = GroqHandler;
