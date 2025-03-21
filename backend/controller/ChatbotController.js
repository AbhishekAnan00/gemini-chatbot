import { chatbotResponse } from "../service/ChatbotService.js";

export const chatWithGemini = async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await chatbotResponse(message);
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
