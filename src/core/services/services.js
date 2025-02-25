const api_key = "AIzaSyCjXDV4zGQbZPm22nUVbfKch6jvmj8mVGo"


export const fetchResponse = async (history) => {
    const requestOpstions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({contents: history})
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`, requestOpstions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message || "Algo ha ido mal...");

        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        console.log(data)
        return apiResponseText
    } catch (error) {
        return error.message;
    }
}