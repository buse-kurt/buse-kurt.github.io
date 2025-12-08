/* ---------------------
   EMOJI SETLERİ
----------------------*/
const emojiSets = {
  general: ["🌍"],
  fashion: ["🛍️"],
  sports: ["🏟️"],
  entertainment: ["🎭"],
  nature: ["🍀"]
};

/* ---------------------
 ÇARK ELEMENTLERİ
----------------------*/
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const sliceAngle = 360 / 5;

const categories = [
  { name: "General Culture", key:"general" },
  { name: "Fashion", key:"fashion" },
  { name: "Sports", key:"sports" },
  { name: "Entertainment", key:"entertainment" },
  { name: "Nature", key:"nature" }
];

let currentRotation = 0;

function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* ---------------------
 ÇARKI DÖNDÜR
----------------------*/
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;

  const extraRotations = 360 * (3 + Math.floor(Math.random() * 3));
  const randomSliceAngle = Math.floor(Math.random() * 360);
  const finalRotation = currentRotation + extraRotations + randomSliceAngle;

  wheel.style.transition = "transform 4s cubic-bezier(.17,.67,.52,1.39)";
  wheel.style.transform = `rotate(${finalRotation}deg)`;

  currentRotation = finalRotation;

  setTimeout(() => {
    wheel.style.transition = "none";

    const normalized = ((finalRotation % 360) + 360) % 360;

    let adjustedAngle = (360 - normalized + sliceAngle/2) % 360;

    // Önce normal index
    let index = Math.floor(adjustedAngle / sliceAngle);

    // SAĞA KAYMA SORUNUNU DÜZELT
    index = (index + 4) % 5;  // index - 1

    const selected = categories[index];

    const catEmoji = document.querySelector(`.s${index+1} span`).textContent;

    explodeEmojis(catEmoji);
    startQuiz(selected);

    spinBtn.disabled = false;

}, 4200);

});

/* ---------------------
 EMOJI CONFETTI
----------------------*/
function explodeEmojis(emoji) {
  const container = document.getElementById("emojiExplosion");

  for (let i = 0; i < 35; i++) {
      const span = document.createElement("span");
      span.classList.add("emoji-piece");
      span.textContent = emoji;

      span.style.left = Math.random() * 100 + "vw";
      span.style.top = Math.random() * -20 + "vh";
      span.style.fontSize = (1.3 + Math.random() * 1.8) + "rem";

      container.appendChild(span);
      setTimeout(() => span.remove(), 1500);
  }
}

/* ---------------------
 SORULAR (50 soru)
----------------------*/
const QUESTIONS = {
  general: [{ text: "Which country has the largest population?", options: ["China","India","USA","Indonesia"], correctIndex: 1 },
  { text: "Capital of Australia?", options: ["Sydney","Melbourne","Canberra","Perth"], correctIndex: 2 },
  { text: "Who painted Mona Lisa?", options: ["Picasso","Da Vinci","Van Gogh","Monet"], correctIndex: 1 },
  { text: "Longest river?", options: ["Nile","Amazon","Yangtze","Mississippi"], correctIndex: 1 },
  { text: "Symbol for gold?", options: ["Ag","Au","Gd","Go"], correctIndex: 1 },
  { text: "Which ancient wonder exists today?", options: ["Hanging Gardens","Alexandria Lighthouse","Colossus","Great Pyramid"], correctIndex: 3 },
  { text: "Closest planet to the Sun?", options: ["Earth","Mars","Mercury","Venus"], correctIndex: 2 },
  { text: "Olympics originated in?", options: ["Italy","Greece","France","Spain"], correctIndex: 1 },
  { text: "Most native speakers?", options: ["English","Mandarin","Spanish","Hindi"], correctIndex: 1 },
  { text: "How many continents?", options: ["5","6","7","8"], correctIndex: 2 }
],
  fashion: [
    { text: "Which brand has the double C logo?", options: ["Gucci","Chanel","Prada","Dior"], correctIndex: 1 },
    { text: "Denim is made from?", options: ["Cotton","Silk","Nylon","Wool"], correctIndex: 0 },
    { text: "Little black dress creator?", options: ["Chanel","Versace","YSL","Armani"], correctIndex: 0 },
    { text: "Which is footwear?", options: ["Fedora","Boot","Shawl","Tote"], correctIndex: 1 },
    { text: "Pattern with dots?", options: ["Plaid","Stripes","Polka dot","Houndstooth"], correctIndex: 2 },
    { text: "Smooth shiny fabric?", options: ["Linen","Silk","Fleece","Canvas"], correctIndex: 1 },
    { text: "Red sole brand?", options: ["Louboutin","Balenciaga","Jimmy Choo","Fendi"], correctIndex: 0 },
    { text: "Kimono origin?", options: ["China","Korea","Japan","Thailand"], correctIndex: 2 },
    { text: "Accessory that tells time?", options: ["Bracelet","Belt","Watch","Ring"], correctIndex: 2 },
    { text: "Famous Hermès bag?", options: ["Birkin","Neverfull","Saddle","Puzzle"], correctIndex: 0 }
],
  sports: [
    { text: "Players on soccer team?", options: ["9","10","11","12"], correctIndex: 2 },
    { text: "Most World Cups?", options: ["Italy","Germany","Brazil","Argentina"], correctIndex: 2 },
    { text: "Sport with shuttlecock?", options: ["Tennis","Badminton","Squash","Volleyball"], correctIndex: 1 },
    { text: "Free throw points?", options: ["1","2","3","4"], correctIndex: 0 },
    { text: "Olympic rings?", options: ["3","4","5","6"], correctIndex: 2 },
    { text: "Lightning Bolt?", options: ["Bolt","Phelps","Tyson Gay","Mo Farah"], correctIndex: 0 },
    { text: "Zero in tennis?", options: ["Null","Love","Zero","Nil"], correctIndex: 1 },
    { text: "Pommel horse sport?", options: ["Gymnastics","Fencing","Wrestling","Rugby"], correctIndex: 0 },
    { text: "Wimbledon country?", options: ["USA","Australia","France","UK"], correctIndex: 3 },
    { text: "Marathon length?", options: ["10 km","21 km","42.195 km","50 km"], correctIndex: 2 }
],
  entertainment: [
    { text: "Jack Sparrow movie?", options: ["Harry Potter","Pirates","Titanic","Avatar"], correctIndex: 1 },
    { text: "King of pop?", options: ["Elvis","Bruno Mars","Michael Jackson","Prince"], correctIndex: 2 },
    { text: "Stranger Things platform?", options: ["HBO","Netflix","Amazon","Disney+"], correctIndex: 1 },
    { text: "88-key instrument?", options: ["Guitar","Violin","Piano","Flute"], correctIndex: 2 },
    { text: "2020 Best Picture?", options: ["Joker","Parasite","1917","Ford v Ferrari"], correctIndex: 1 },
    { text: "Marvel hero?", options: ["Batman","Superman","Spider-Man","Flash"], correctIndex: 2 },
    { text: "Inception director?", options: ["Spielberg","Nolan","Tarantino","Cameron"], correctIndex: 1 },
    { text: "Who sings Hello?", options: ["Adele","Rihanna","Sia","Dua Lipa"], correctIndex: 0 },
    { text: "Not streaming?", options: ["Spotify","Hulu","Prime","Apple TV"], correctIndex: 0 },
    { text: "Oscars city?", options: ["Paris","NYC","LA","London"], correctIndex: 2 }
],
  nature: [
    { text: "Plants produce?", options: ["CO₂","Nitrogen","Oxygen","Helium"], correctIndex: 2 },
    { text: "Largest mammal?", options: ["Elephant","Blue whale","Giraffe","Orca"], correctIndex: 1 },
    { text: "Spider legs?", options: ["6","8","10","12"], correctIndex: 1 },
    { text: "Blue planet?", options: ["Mars","Earth","Neptune","Uranus"], correctIndex: 1 },
    { text: "Bees collect?", options: ["Leaves","Nectar","Soil","Seeds"], correctIndex: 1 },
    { text: "Fastest land animal?", options: ["Lion","Horse","Cheetah","Gazelle"], correctIndex: 2 },
    { text: "Water absorber?", options: ["Leaves","Roots","Stem","Flower"], correctIndex: 1 },
    { text: "Largest ocean?", options: ["Atlantic","Indian","Arctic","Pacific"], correctIndex: 3 },
    { text: "Water → vapor?", options: ["Condensation","Evaporation","Freezing","Melting"], correctIndex: 1 },
    { text: "Changes color?", options: ["Chameleon","Tiger","Kangaroo","Panda"], correctIndex: 0 }
]
};
// (Buraya önceki mesajda verdiğim 50 soruyu aynen JSON formatında ekliyorum — istersen doldurayım!)

/* ---------------------
 QUIZ LOGIC
----------------------*/
let questionIndex = 0;
let score = 0;
let timerInterval;

const wheelScreen = document.getElementById("wheelScreen");
const questionScreen = document.getElementById("questionScreen");
const resultScreen = document.getElementById("resultScreen");

const categoryTitle = document.getElementById("categoryTitle");
const questionText = document.getElementById("questionText");
const timerBox = document.getElementById("timer");
const scoreText = document.getElementById("scoreText");

const optBtns = [
  document.getElementById("opt0"),
  document.getElementById("opt1"),
  document.getElementById("opt2"),
  document.getElementById("opt3")
];

function startQuiz(cat){
  // Giriş ekranını kapat
  document.getElementById("introScreen").classList.add("hidden");

  // Soru ekranını aç
  document.getElementById("questionScreen").classList.remove("hidden");

  // Kategori bilgisi
  currentCategory = cat.key;
  categoryTitle.textContent = cat.name;

  // Quiz reset
  questionIndex = 0;
  score = 0;

  // İlk soruyu yükle
  loadQuestion();
}

function loadQuestion(){
  const q = QUESTIONS[currentCategory][questionIndex];
  questionText.textContent = q.text;

  optBtns.forEach((btn,i)=>{
      btn.textContent = q.options[i];
      btn.onclick = () => checkAnswer(i);
  });

  startTimer();
}

function startTimer(){
  let time = 15;
  timerBox.textContent = "⏳ " + time;

  clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
      time--;
      timerBox.textContent = "⏳ " + time;

      if(time === 0){
          clearInterval(timerInterval);
          checkAnswer(-1); // zaman doldu
      }
  },1000);
}

function checkAnswer(choice){
  clearInterval(timerInterval);

  const q = QUESTIONS[currentCategory][questionIndex];

  // Yanlış tıklanan şık
  if(choice !== q.correctIndex && choice !== -1){
      optBtns[choice].classList.add("wrong");
  }

  // Doğru şık HER ZAMAN gösterilecek
  optBtns[q.correctIndex].classList.add("correct");

  // Emoji efektleri
  if(choice === q.correctIndex){
      score++;
      explodeEmojis("✨");
  } else {
      explodeEmojis("❌");
  }

  // Sonraki soruya geç
  questionIndex++;

  setTimeout(()=>{
      // Temizle
      optBtns.forEach(btn => btn.classList.remove("correct", "wrong"));

      if(questionIndex < 10){
          loadQuestion();
      } else {
          showResults();
      }

  },1200);
}

function showResults(){
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreText.textContent = `You scored ${score} / 10`;
}

document.getElementById("restartBtn").onclick = () => {
  resultScreen.classList.add("hidden");
  wheelScreen.classList.remove("hidden");
};
