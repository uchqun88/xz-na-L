const questions = [
  { flag: "https://flagcdn.com/w320/fr.png", correct: "Fransiya", options: ["Fransiya", "Italiya", "Ispaniya", "Germaniya"] },
  { flag: "https://flagcdn.com/w320/de.png", correct: "Germaniya", options: ["Avstriya", "Germaniya", "Shvetsiya", "Norvegiya"] },
  { flag: "https://flagcdn.com/w320/jp.png", correct: "Yaponiya", options: ["Xitoy", "Koreya", "Yaponiya", "Tailand"] },
  { flag: "https://flagcdn.com/w320/gb.png", correct: "Buyuk Britaniya", options: ["AQSh", "Kanada", "Buyuk Britaniya", "Avstraliya"] },
  { flag: "https://flagcdn.com/w320/ru.png", correct: "Rossiya", options: ["Ukraina", "Rossiya", "Belarus", "Qozog‘iston"] },
  { flag: "https://flagcdn.com/w320/uz.png", correct: "O‘zbekiston", options: ["Tojikiston", "O‘zbekiston", "Qirg‘iziston", "Turkmaniston"] },
  { flag: "https://flagcdn.com/w320/it.png", correct: "Italiya", options: ["Italiya", "Fransiya", "Ispaniya", "Gretsiya"] },
  { flag: "https://flagcdn.com/w320/br.png", correct: "Braziliya", options: ["Argentina", "Kolumbiya", "Braziliya", "Peru"] },
  { flag: "https://flagcdn.com/w320/cn.png", correct: "Xitoy", options: ["Xitoy", "Yaponiya", "Koreya", "Vyetnam"] },
  { flag: "https://flagcdn.com/w320/kr.png", correct: "Janubiy Koreya", options: ["Janubiy Koreya", "Xitoy", "Yaponiya", "Indoneziya"] }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  const name = document.getElementById("fullname").value;
  if (!name.trim()) {
    alert("Iltimos, ismingizni kiriting.");
    return;
  }
  document.getElementById("user-form").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").textContent = `⏳ Vaqt: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `⏳ Vaqt: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);

  const q = questions[currentQuestion];
  document.getElementById("flag").src = q.flag;
  document.getElementById("question-text").textContent = "Bu qaysi davlatning bayrog‘i?";
  const shuffled = shuffleArray([...q.options]);
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  shuffled.forEach((ans) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-light answer-btn";
    btn.textContent = ans;
    btn.onclick = () => checkAnswer(ans === q.correct);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(isCorrect) {
  clearInterval(timer);
  if (isCorrect) score++;
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById("quiz").style.display = "none";
  const name = document.getElementById("fullname").value;
  document.getElementById("result").textContent = `${name}, sizning natijangiz: ${score} / ${questions.length}`;
  document.getElementById("restart-btn").style.display = "inline-block";
}

function restartQuiz() {
  document.getElementById("user-form").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("restart-btn").style.display = "none";
  document.getElementById("result").textContent = "";
  document.getElementById("fullname").value = "";
}
