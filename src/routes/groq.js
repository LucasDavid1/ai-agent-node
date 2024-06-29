const express = require('express');
const router = express.Router();
const GroqHandler = require('../interactors/groqHandler');

const groqHandler = new GroqHandler();


router.post('/simple-test', async (req, res) => {
    const { userInput } = req.body;
    if (!userInput) {
        return res.status(400).json({ error: "User input is required" });
    }

    try {
        const result = await groqHandler.testConnection(userInput);
        res.json({ result });
    } catch (error) {
        console.error("Error in Groq test route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/', async (req, res) => {
    try {
        const result = await groqHandler.determineFunctionAndCall(req.body.userInput);
        res.json(result);
    } catch (error) {
        console.log("ERROR", error)
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
