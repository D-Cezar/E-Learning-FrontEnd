import axios from "axios"
import { getUserInfo } from "../../../Authentification/HandleUserInfo";
import { getToken } from "../../../Authentification/HandleToken";


export const PostAnswer = async ({givenAnswer, questionId}) => {
    const userId = getUserInfo().id;
    const token = getToken();

    try {
        const response = await axios.post(
            'https://localhost:7143/Answers',
            {
                questionId,
                userId,
                givenAnswer,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error submitting answer:', error);
        throw error;  
    }
}




