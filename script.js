const sendForm = document.querySelector(".chat-form");
const msgContainer = document.querySelector(".chat-messages");
const inputBox = document.querySelector(".inputBox");
const jane = document.getElementById("jane");
const john = document.getElementById("john");
const clearBtn = document.getElementById("clearBtn");
const sendBtn = document.getElementById("sendBtn");

let user = true;
let msgArray = JSON.parse(localStorage.getItem("chatMessages")) || [];
let chatMessageElement = (message) =>
  `<div class="message">
              <div class="message-sender  ${message.sender === "John" ? "pink" : "blue"}"><span>~</span>${message.sender}</div>
              <div class="message-text">${message.msgText}</div>
              <div class="message-timestamp">${message.timeStamp}</div>
            </div>`;
let userName = "John";
let handleClick = (name) => {
  userName = name;
  localStorage.setItem("currUser", JSON.stringify(userName));
  updateUser();
};

let updateUser = () => {
  document.querySelector(".active-user").classList.remove("active-user");
  let user = JSON.parse(localStorage.getItem("currUser"));
  if (user === "Jane") {
    jane.classList.add("active-user");
  } else {
    john.classList.add("active-user");
  }
};
let updateMessage = () => {
  let timeStamp = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let message = {
    sender: userName,
    msgText: inputBox.value,
    timeStamp,
  };
  return message;
};

let addMessage = (e) => {
  e.preventDefault();
  if (inputBox.value === "") {
    alert("Please enter the message");
    return;
  }
  saveToLocalStorage(updateMessage());
  inputBox.value = "";
};

let saveToLocalStorage = (message) => {
  msgArray.push(message);
  localStorage.setItem("chatMessages", JSON.stringify(msgArray));
  user = false;
  getMessageFromLS();
};
let getMessageFromLS = () => {
  if (msgArray.length === 0) {
    return;
  } else {
    if (user) {
      msgArray.forEach((element) => {
        msgContainer.innerHTML += chatMessageElement(element);
      });
    } else {
      let idx = msgArray.length - 1;
      msgContainer.innerHTML += chatMessageElement(msgArray[idx]);
    }
    user = true;
  }
};

let clearChat = () => {
  msgContainer.innerHTML = "";
  localStorage.removeItem("chatMessages");
};
updateUser();
getMessageFromLS();
john.onclick = () => handleClick("John");
jane.onclick = () => handleClick("Jane");
sendForm.addEventListener("submit", addMessage);
sendBtn.addEventListener("click", addMessage);
clearBtn.addEventListener("click", clearChat);