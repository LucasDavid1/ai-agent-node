const express = require('express');
const router = express.Router();
const GroqHandler = require('../services/groqHandler');

const groqHandler = new GroqHandler();


router.post('/', async (req, res) => {
    console.log("GROQ", req.body)
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

module.exports = router;
