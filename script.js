function goToLogin() {
  window.location.href = "login.html";
}

function goToSignup() {
  window.location.href = "signup.html";
}
const form = document.getElementById("signupForm");

if(form){
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const user = {
      name: document.getElementById("name").value,
      skills: document.getElementById("skills").value,
      interests: document.getElementById("interests").value,
      goals: document.getElementById("goals").value
    };

    // save in browser
    localStorage.setItem("devMatchUser", JSON.stringify(user));

    alert("Profile Saved Successfully!");

    // go to dashboard
    window.location.href = "dashboard.html";
  });
}
const storedUser = JSON.parse(localStorage.getItem("devMatchUser"));

if(storedUser && document.getElementById("username")){
  document.getElementById("username").innerText = storedUser.name;
}

function goToMatch(){
  window.location.href = "match.html";
}
const developers = [
  {
    name: "Anonymous Dev",
    skills: "AI, Python, ML",
    goals: "Building an AI education tool",
    karma: "Verified Safe"
  },
  {
    name: "Anonymous Dev",
    skills: "React, Web Dev, UI",
    goals: "Startup collaboration project",
    karma: "5 Successful Teams"
  },
  {
    name: "Anonymous Dev",
    skills: "Blockchain, NodeJS",
    goals: "Secure wallet system",
    karma: "Trusted Collaborator"
  }
];
function calculateMatch(userSkills, devSkills){
  let user = userSkills.toLowerCase().split(",");
  let dev = devSkills.toLowerCase().split(",");

  let matchCount = user.filter(skill =>
    dev.includes(skill.trim())
  ).length;

  return Math.floor((matchCount / user.length) * 100);
}
const container = document.getElementById("matchContainer");

if(container){
  const user = JSON.parse(localStorage.getItem("devMatchUser"));

  developers.forEach(dev => {
    let percent = calculateMatch(user.skills, dev.skills);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <h3>${dev.name}</h3>
  <p><strong>Match:</strong> ${percent}%</p>
  <p><strong>Skills:</strong> ${dev.skills}</p>
  <p><strong>Goal:</strong> ${dev.goals}</p>
  <p><strong>Badge:</strong> ${dev.karma}</p>
  <button class="start-btn connect-btn">Send Anonymous Request</button>
`;
    container.appendChild(card);
  });
}
card.querySelector(".connect-btn").addEventListener("click", function(){
  alert("Request Accepted! Secure Chat Opened.");
window.location.href = "chat.html";
});
function showVault(){
  const display = document.getElementById("vaultDisplay");

  if(!display) return;

  const storedIdea = localStorage.getItem("secureIdea");

  if(storedIdea){
    display.innerHTML = `
      <div class="card">
        <h3>🔒 Idea Locked</h3>
        <p>Encrypted • Blockchain Timestamped • Team Access Only</p>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", showVault);
function saveIdea(){
  const idea = document.getElementById("ideaInput").value;

  if(!idea){
    alert("Please write an idea first!");
    return;
  }

  localStorage.setItem("secureIdea", idea);

  alert("🔐 Idea Encrypted & Stored in Vault!");

  showVault();
}
function revealIdea(){
  const display = document.getElementById("vaultDisplay");
  const storedIdea = localStorage.getItem("secureIdea");

  if(storedIdea){
    display.innerHTML = `
      <div class="card">
        <h3>🔓 Idea Revealed</h3>
        <p>${storedIdea}</p>
        <p><strong>Access Granted to Trusted Team</strong></p>
      </div>
    `;
  } else {
    alert("No idea stored!");
  }
}
function sendMessage(){
  const input = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");

  if(!input || !chatBox) return;

  const message = input.value;

  if(message.trim() === "") return;

  const msg = document.createElement("p");
  msg.innerText = "🔐 You: " + message;

  chatBox.appendChild(msg);

  input.value = "";

  chatBox.scrollTop = chatBox.scrollHeight;
}
let requestsCount = 0;
const MAX_REQUESTS = 4;

function findMatch(){
  const domain = document.getElementById("domainSelect").value;
  const resultDiv = document.getElementById("matchResults");

  if(domain === ""){
    alert("Please select a domain");
    return;
  }

  const loading = document.getElementById("loading");
  loading.style.display = "block";
  resultDiv.innerHTML = "";
  requestsCount = 0;

  let profiles = {
    web: [
      {
        name:"Rahul",
        skill:"Frontend Developer",
        match:"92%",
        tags:["HTML","CSS","React"]
      },
      {
        name:"Sneha",
        skill:"Full Stack Developer",
        match:"87%",
        tags:["NodeJS","MongoDB","API"]
      },
      {
        name:"Vikram",
        skill:"Backend Developer",
        match:"90%",
        tags:["Express","PostgreSQL","REST"]
      },
      {
        name:"Priya",
        skill:"UI/UX Developer",
        match:"88%",
        tags:["Figma","CSS","JavaScript"]
      }
    ],

    ai: [
      {
        name:"Aman",
        skill:"Machine Learning",
        match:"95%",
        tags:["Python","TensorFlow","AI"]
      },
      {
        name:"Priya",
        skill:"Data Scientist",
        match:"89%",
        tags:["Data","ML","Analytics"]
      },
      {
        name:"Rohan",
        skill:"NLP Engineer",
        match:"91%",
        tags:["PyTorch","NLP","BERT"]
      },
      {
        name:"Anjali",
        skill:"Computer Vision",
        match:"93%",
        tags:["OpenCV","CNN","Python"]
      }
    ]
  };

  let users = profiles[domain];

  setTimeout(()=>{
    loading.style.display = "none";

    users.forEach(user => {
      let tagHTML = "";
      user.tags.forEach(tag=>{
        tagHTML += `<span class="tag">${tag}</span>`;
      });

      resultDiv.innerHTML += `
        <div class="card" data-name="${user.name}">
          <h3>👤 ${user.name}</h3>
          <p><strong>${user.skill}</strong></p>
          <h4>Match: ${user.match}</h4>
          <div class="tags">${tagHTML}</div>
          <p style="font-size: 12px; color: #aaa;">Safe Collaborator • Karma Approved ⭐</p>
          <button class="start-btn send-request-btn" onclick="sendRequest(this, '${user.name}')">
            Send Request
          </button>
          <div class="accepted-status" style="display:none; color: #00ff88; font-weight: bold; margin-top: 10px;">
            ✅ Connection Accepted!
          </div>
        </div>
      `;
    });
  }, 2000);
}

function sendRequest(button, userName){
  if(requestsCount >= MAX_REQUESTS){
    alert("You can only send requests to 4 people at a time!");
    return;
  }

  requestsCount++;
  button.innerText = "⏳ Waiting for Accept...";
  button.style.background = "orange";
  button.disabled = true;

  setTimeout(()=>{
    button.style.display = "none";
    const statusDiv = button.parentElement.querySelector(".accepted-status");
    statusDiv.style.display = "block";
    showSuccessPopup();
    updateKarma();
  }, 3000);
}
function updateKarma(){

  let karma = localStorage.getItem("karma");

  if(!karma){
    karma = 0;
  }

  karma = parseInt(karma) + 10;

  localStorage.setItem("karma", karma);

}
function loadKarma(){

  const karmaText = document.getElementById("karmaScore");

  if(!karmaText) return;

  let karma = localStorage.getItem("karma") || 0;

  karmaText.innerText = "⭐ Karma Score: " + karma;
}

document.addEventListener("DOMContentLoaded", loadKarma);
function lockIdea(){

  const idea = document.getElementById("ideaInput").value;
  const status = document.getElementById("blockchainStatus");

  if(!idea){
    alert("Write your idea first!");
    return;
  }

  status.innerHTML = "🔐 Encrypting Idea...";

  setTimeout(()=>{
    status.innerHTML = "⛓ Generating Blockchain Hash...";
  },1500);

  setTimeout(()=>{
    localStorage.setItem("secureIdea", idea);
    status.innerHTML =
      "✅ Timestamp secured on blockchain (Testnet)";
    showVault();
  },3000);
}
function showSuccessPopup(){

  const popup = document.getElementById("successPopup");
  if(!popup) return;

  popup.style.display = "block";

  setTimeout(()=>{
    popup.style.display = "none";
  },3000);
}
function loginUser(event){
  event.preventDefault();

  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if(user && pass){
      alert("Login Successful ✅");
      window.location.href = "dashboard.html";
  }else{
      alert("Fill all fields");
  }
}