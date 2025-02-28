<template>
  <div id="app">
    <header>
      <h1>Mistral AI Chat</h1>
      <p>Chat with Mistral AI in real-time!</p>
    </header>
    <ChatBox />
  </div>
</template>

<script>
import ChatBox from './components/ChatBox.vue';

export default {
  components: {
    ChatBox,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f8;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 2.5rem;
  color: #007bff;
  margin: 0;
}

header p {
  font-size: 1.2rem;
  color: #666;
  margin: 5px 0 0;
}
</style>