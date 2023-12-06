import { ILLMService } from "modules/cards/card.interfaces";
import axios from "axios";

const url = 'https://api.openai.com/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer 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'
};

export class LLMService implements ILLMService {
  async generateQuestionAndAnswer(content: string): Promise<{ question: string; answer: string }> {
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é um assistente virtual prestativo e especializado em SRS que ajuda a estudar."
        },
        {
          role: "system",
          content: `Com base na anotação abaixo me de uma pergunta e uma resposta, seguindo o modelo SRS sobre o conteudo estudado. Formate seu retorno em formato json com a pergunta estando na tag data.question e a resposta na tag data.answer: '${content}'`
        }
      ]
    };
  
    try {
      const response = await axios.post(url, body, { headers });
      const responseData = JSON.parse(response.data.choices.message.content).data;
  
      return { question: responseData.question, answer: responseData.answer };
    } catch (error) {
      console.error('Erro ao chamar a API da OpenAI:', error);
      throw new Error('Erro ao gerar pergunta e resposta');
    }
  }

  async evaluateAnswer(question: string, answer: string, content: string): Promise<{ score: number; interpretation: string}> {
    const body = {
      messages: [
        {
          role: "system",
          content: "Você é um assistente virtual prestativo e especializado em SRS que ajuda a estudar."
        },
        {
          role: "user",
          content: `Com base na pergunta '${question}' e na resposta padrão '${answer}' me de uma nota de 0 a 10 para a resposta abaixo: '${content}'`
        }
      ],
      do_sample: "true"
    };

    try {
      const response = await axios.post(url, body, { headers });
      const responseData = JSON.parse(response.data.choices.message.content).data;

      return { score: responseData.score, interpretation: responseData.interpretation };
    } catch (error) {
      console.error('Erro ao chamar a API da OpenAI:', error);
      throw new Error('Erro ao tentar avaliar a resposta');
    }
  }
}
