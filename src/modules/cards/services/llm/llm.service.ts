import { ILLMService } from "modules/cards/card.interfaces";
import axios from "axios";

export class LLMService implements ILLMService {
    async generateQuestionAndAnswer(content: string): Promise<{ question: string; answer: string }> {
    const url = 'https://chat.maritaca.ai/api/chat/inference';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Key 6532ccfe9aed8cf1b231484c$f5cec2382d3eb5ad9acfe7774be64ab07b743e9041d7e0e511f0f7a98c54142c'
    };
    const body = {
      messages: [
        {
          role: "user",
          content: `Com base na anotação abaixo me de uma pergunta e uma resposta, seguindo o modelo SRS sobre o conteudo estudado. Formate seu retorno em formato json com a pergunta estando na tag data.question e a resposta na tag data.answer: '${content}'`
        }
      ],
      do_sample: "true"
    };
  
    try {
      const response = await axios.post(url, body, { headers });
      const responseData = JSON.parse(response.data.answer).data;
  
      return { question: responseData.question, answer: responseData.answer };
    } catch (error) {
      console.error('Erro ao chamar a API do Maritaca:', error);
      throw new Error('Erro ao gerar pergunta e resposta');
    }
  }
}
