<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" :class="message.sender">
        <div class="message-content">
          {{ message.text }}
        </div>
      </div>
    </div>
    <div class="input-area">
      <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatBox',
  data() {
    return {
      messages: [],
      inputMessage: '',
    };
  },
  methods: {
    async sendMessage() {
      if (this.inputMessage.trim() === '') return;

      const userMessage = { sender: 'user', text: this.inputMessage };
      this.messages.push(userMessage);
      this.inputMessage = '';

      try {
        const response = await axios.post(
          'https://api.mistral.ai/v1/chat/completions',
          {
            model: "mistral-tiny",
            messages: [{ role: "user", content: userMessage.text }],
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.VUE_APP_MISTRAL_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const aiMessage = { sender: 'ai', text: response.data.choices[0].message.content };
        this.messages.push(aiMessage);
      } catch (error) {
        console.error('Error sending message:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    },
  },
};
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh; /* ปรับความสูงของแชท */
  max-width: 600px; /* ปรับความกว้างของแชท */
  margin: 0 auto; /* จัดกลางหน้าจอ */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}

.message-content {
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  max-width: 80%;
  word-wrap: break-word;
}

.user {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
}

.ai {
  align-self: flex-start;
  background-color: #e9ecef;
  color: black;
}

.input-area {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>