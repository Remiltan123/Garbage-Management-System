
export const predictWaste = async (file: File) => {
    const formdata = new FormData();
    formdata.append("file", file)

    const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formdata
    })
    if (!response.ok) {
        throw new Error("Failed to get prediction");
    }
    const data = await response.json();
    console.log(".....>", data)
    return data;
}

export const askQuestion = async (question: string): Promise<string> => {
    try {
        const response = await fetch("http://localhost:3000/api/ask/question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),

        })
        if (!response.ok) {
            throw new Error("Failed to fetch response");
        }
        const data = await response.json();
        return data.answer || "No answer found.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "⚠️ Error fetching answer. Please try again.";
    }
}
