import axios from 'axios';

class AIService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_OPENAI_API_URL || 'https://api.openai.com/v1',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async generateContent({ prompt, type = 'text', maxTokens = 500 }) {
    try {
      const response = await this.client.post('/v1/chat/completions', {
        model: "gpt-4",
        messages: [{
          role: "system",
          content: `You are a professional content creator for websites. Generate ${type} content that is SEO-friendly and engaging.`
        }, {
          role: "user",
          content: prompt
        }],
        max_tokens: maxTokens,
        temperature: 0.7
      });

      return {
        success: true,
        content: response.data.choices[0].message.content
      };
    } catch (error) {
      console.error('Error generating content:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async suggestSEOImprovements(content) {
    try {
      const response = await this.client.post('/v1/chat/completions', {
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "You are an SEO expert. Analyze the content and provide specific improvements."
        }, {
          role: "user",
          content: content
        }],
        max_tokens: 500,
        temperature: 0.7
      });

      return {
        success: true,
        suggestions: response.data.choices[0].message.content
      };
    } catch (error) {
      console.error('Error getting SEO suggestions:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async generateMetaTags(content) {
    try {
      const response = await this.client.post('/v1/chat/completions', {
        model: "gpt-4",
        messages: [{
          role: "system",
          content: "Generate SEO-optimized meta tags including title, description, and keywords based on the content."
        }, {
          role: "user",
          content: content
        }],
        max_tokens: 200,
        temperature: 0.5
      });

      return {
        success: true,
        metaTags: JSON.parse(response.data.choices[0].message.content)
      };
    } catch (error) {
      console.error('Error generating meta tags:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new AIService();
