import { GoogleGenerativeAI } from "@google/generative-ai";

export const AiGeneratorForRecomand = async(req,res) => {
    try {
        const { question } = req.body;
        if (!question) {
            res.status(400).json({ error: "Question is required" });
        }

        const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" })
        const prompt = `You are an AI assistant that answers waste classification and recycling questions.
                        User asked: ${question}`;

        const result = await model.generateContent(prompt)
        const response = result.response.text();
        res.json({
            success: true,
            answer: response 
        })


    } catch (err) {
        console.error("Error While accesing the Ai:", err.message);
        res.status(500).json({
            success: false,
            message: "Error While accesing the AI Agent",
            error: err.message,
        });
    }
}