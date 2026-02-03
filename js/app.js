let teams = [];
let timer = 15;
let interval = null;
let paused = false;
let tikPlayed = false;

// AUDIO
const benar = document.getElementById("benar");
const salah = document.getElementById("salah");
const menang = document.getElementById("menang");
const tik = document.getElementById("tik");

// POPUP
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");

function showPopup(title, text) {
    popupTitle.innerText = title;
    popupText.innerText = text;
    popup.classList.add("show");
}

function closePopup() {
    popup.classList.remove("show");
}

// SETUP TIM
function createTeams() {
    teamInputs.innerHTML = "";
    for (let i = 0; i < teamCount.value; i++) {
        teamInputs.innerHTML += `<input placeholder="Nama Tim ${i+1}" id="t${i}"><br>`;
    }
}

function startMatch() {
    teams = [];
    for (let i = 0; i < teamCount.value; i++) {
        teams.push({
            name: document.getElementById(`t${i}`).value || `Tim ${i+1}`,
            score: 0
        });
    }

    // --- TAMBAHKAN KODE INI ---
    // Menyembunyikan tulisan Fakultas agar layar skor lebih luas
    document.getElementById("subTitle").style.display = "none"; 
    // Mengurangi jarak header biar makin hemat tempat
    document.querySelector(".main-header").style.padding = "20px 0"; 
    // --------------------------

    setup.classList.add("hidden");
    match.classList.remove("hidden");
    render();
}

// SCORE
function render() {
    scoreBoard.innerHTML = "";
    teams.forEach((t, i) => {
        scoreBoard.innerHTML += `
        <div class="team-box">
            <h2>${t.name}</h2>
            <div class="score">${t.score}</div>
            <div class="score-btn">
                <button onclick="add(${i})">+</button>
                <button onclick="sub(${i})">−</button>
            </div>
        </div>`;
    });
}

function add(i) {
    teams[i].score += 10;
    benar.currentTime = 0;
    benar.play();
    render();
}

function sub(i) {
    teams[i].score -= 5;
    salah.currentTime = 0;
    salah.play();
    render();
}

function resetScore() {
    teams.forEach(t => t.score = 0);
    render();
}

// PEMENANG
function setWinner() {
    const top = teams.reduce((a, b) => b.score > a.score ? b : a);
    menang.currentTime = 0;
    menang.play();
    showPopup("PEMENANG", top.name);
}

// TIMER
function startTimer() {
    if (interval) return;
    timer = customTime.value || 15;
    paused = false;
    tikPlayed = false;
    timeDisplay.innerText = timer;

    interval = setInterval(() => {
        if (!paused) {
            timer--;
            timeDisplay.innerText = timer;

            if (timer <= 7 && !tikPlayed) {
                tikPlayed = true;
                tik.currentTime = 0;
                tik.play();
            }

            if (timer <= 0) {
                clearInterval(interval);
                interval = null;
                tik.pause();
                tik.currentTime = 0;
                salah.currentTime = 0;
                salah.play();
                showPopup("WAKTU HABIS", "Soal Selanjutnya");
            }
        }
    }, 1000);
}

function pauseTimer() {
    paused = !paused;
    if (paused) tik.pause();
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    paused = false;
    tik.pause();
    tik.currentTime = 0;
    timer = 15;
    timeDisplay.innerText = timer;
}
