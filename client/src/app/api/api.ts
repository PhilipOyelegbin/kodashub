// API BASE URL HANDLER
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiHandler = async (endpoint: string, method: string, body?: any) => {
    try {
        const response: any = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export default apiHandler;
