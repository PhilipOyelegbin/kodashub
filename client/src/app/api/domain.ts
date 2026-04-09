// Domain API Handler
import apiHandler from "./api"

export const checkDomain = async (domain: string) => {
    try {
        const response = await apiHandler(`domain/check`, "POST", { domain })
        return response;
    } catch (error) {
        return error;
    }
}

