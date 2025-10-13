import { GoogleGenerativeAI } from "@google/generative-ai";

export const AiGeneratorForRecomand = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an AI assistant that answers questions about waste management, 
      recycling, and sustainability in a simple and helpful way.
      Question: ${question}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({
      success: true,
      answer: response,
    });

  } catch (err) {
    console.error("Error While accessing the AI:", err.message);
    res.status(500).json({
      success: false,
      message: "Error While accessing the AI Agent",
      error: err.message,
    });
  }
};