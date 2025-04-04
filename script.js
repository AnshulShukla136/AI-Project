async function sendMessage() {
    
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const fromLang = document.getElementById("from-language").value;
    const toLang = document.getElementById("to-language").value;
    
  
    const message = userInput.value.trim();
    if (message === "") return;
  
    // Show user message
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user-message");
    userMsg.innerText = message;
    chatBox.appendChild(userMsg);
  
    // Show loading bot message
    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot-message");
    botMsg.innerText = "Translating...";
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Call LibreTranslate API
    try {
        const response = await fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              q: message,
              source: fromLang,
              target: toLang,
              format: "text"
            })
          });
          
  
      const data = await response.json();
      botMsg.innerText = data.translatedText;
    }  catch (error) {
        botMsg.innerText = "Error: Could not translate message.";
        console.error("Translation error:", error);
      }
      
  
    userInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  