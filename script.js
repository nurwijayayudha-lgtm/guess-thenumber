document.body.style.overflow = "hidden";
setTimeout(() => {
  document.body.style.overflow = "auto";
}, 2500);

// =============================
// SETTING AWAL
// =============================
let maxAngka = 25;
let nyawa = 7;
let angkaRahasia = buatAngkaRandom();

function buatAngkaRandom() {
  return Math.floor(Math.random() * maxAngka) + 1;
}

function updateNyawa() {
  const nyawaEl = document.getElementById("nyawa");
  nyawaEl.innerHTML = "";

  for (let i = 0; i < nyawa; i++) {
    nyawaEl.innerHTML += `<span class="heart">❤️</span>`;
  }
}



// =============================
// GANTI MODE
// =============================
function gantiMode() {
  const select = document.getElementById("difficulty");
select.classList.remove("mode-change");
void select.offsetWidth; // restart animasi
select.classList.add("mode-change");


  if (difficulty === "easy") {
    maxAngka = 25;
    nyawa = 7;
  } else if (difficulty === "medium") {
    maxAngka = 50;
    nyawa = 5;
  } else {
    maxAngka = 150;
    nyawa = 3;
  }

  angkaRahasia = buatAngkaRandom();
  input.value = "";
  input.disabled = false;

  updateNyawa();
  hasil.innerHTML = `🎮 Mode diganti! Tebak angka 1 - ${maxAngka}`;
  hasil.style.color = "#ffb3ff";
}

// =============================
// CEK ANGKA
// =============================
function cekAngka() {
  const input = document.getElementById("tebakan");
  const tebakan = input.value;
  const hasil = document.getElementById("hasil");

  if (input.disabled) return;

  if (tebakan === "") {
    hasil.innerHTML = "⚠️ Masukin angka dulu bro!";
    hasil.style.color = "orange";
    return;
  }

  if (tebakan < 1 || tebakan > maxAngka) {
    hasil.innerHTML = `⚠️ Angka harus 1 - ${maxAngka}!`;
    hasil.style.color = "orange";
    return;
  }

  // ✅ JIKA BENAR
  if (tebakan == angkaRahasia) {
    hasil.innerHTML = `🎉 GG! Angkanya ${angkaRahasia}`;
    hasil.style.color = "lightgreen";
    input.disabled = true;
    return;
  }

  // ❌ JIKA SALAH (INI BAGIAN 4 YANG DIMAKSUD)
  nyawa--;              // nyawa berkurang
  updateNyawa();        // icon ❤️ di-update

  // 💀 JIKA NYAWA HABIS
  if (nyawa <= 0) {
    hasil.innerHTML = `💀 GAME OVER! Angkanya ${angkaRahasia}`;
    hasil.style.color = "red";
    input.disabled = true;
    return;
  }

  // 🔻 KASIH PETUNJUK
  if (tebakan < angkaRahasia) {
    hasil.innerHTML = "❌ Terlalu kecil!";
  } else {
    hasil.innerHTML = "❌ Terlalu besar!";
  }
  hasil.style.color = "red";
}


// =============================
// RESET GAME
// =============================
function resetGame() {
  const difficulty = document.getElementById("difficulty").value;
  if (difficulty === "easy") nyawa = 7;
  else if (difficulty === "medium") nyawa = 5;
  else nyawa = 3;

  angkaRahasia = buatAngkaRandom();
  document.getElementById("tebakan").value = "";
  document.getElementById("tebakan").disabled = false;

  updateNyawa();
  const hasil = document.getElementById("hasil");
  hasil.innerHTML = "🔄 Game direset! Tebak lagi.";
  hasil.style.color = "#ffffff";
}

function pilihMode(mode) {
  const modeScreen = document.getElementById("mode-screen");
  const gameScreen = document.getElementById("game-screen");
  const modeInfo = document.getElementById("mode-info");

  if (mode === "easy") {
    maxAngka = 25;
    nyawa = 7;
    modeInfo.innerHTML = "Mode: EASY (1 - 25)";
  } else if (mode === "medium") {
    maxAngka = 50;
    nyawa = 5;
    modeInfo.innerHTML = "Mode: MEDIUM (1 - 50)";
  } else {
    maxAngka = 150;
    nyawa = 3;
    modeInfo.innerHTML = "Mode: HARD (1 - 150)";
  }

  angkaRahasia = buatAngkaRandom();
  updateNyawa();

  modeScreen.style.display = "none";
  gameScreen.style.display = "block";
}

function backToMenu() {
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("mode-screen").style.display = "block";

  document.getElementById("hasil").innerHTML = "";
  document.getElementById("tebakan").value = "";
}
