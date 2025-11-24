const yesBtn = document.getElementById("yesButton");
const noBtn = document.getElementById("noButton");
const title = document.getElementById("title");
const mainImg = document.getElementById("image");

let noClickCount = 0;
let yesScale = 1;

// 15 farklı başlık
const titles = [
    "Cidden Hayır mı 😢",
    "Bir Daha Düşün lütfeen 🥺",
    "Hayır Deme Askimmm Noluur 🥺",
    "Askiiim 😣",
    "Lütfeeen 🥺",
    "Özür Dilerim Askimmm 😭",
    "Ama Seni Seviyorum 😔",
    "Bir Şans Daha Yalvaririmmm 😢",
    "Yapmaaa 😭",
    "Özür Dilerim Askimmm 😣",
    "Hayır Deme Askimmm Yaaa 🥺",
    "Bir Taneemm Nolur Evet De Artik!! 🥺"
];

// 15 farklı fotoğraf (sen düzenleyeceksin)
const images = [
    "https://s12.gifyu.com/images/b9Nf1.png",
    "https://s12.gifyu.com/images/b9NfO.png",
    "https://s12.gifyu.com/images/b9Ntm.png",
    "https://s12.gifyu.com/images/b9NYs.png",
    "https://s12.gifyu.com/images/b9NYi.png",
    "https://s12.gifyu.com/images/b9NYk.png",
    "https://s12.gifyu.com/images/b9N5N.png",
    "https://s12.gifyu.com/images/b9NtG.png",
    "https://s12.gifyu.com/images/b9Ntn.jpg",
    "https://s12.gifyu.com/images/b9N5m.png",
    "https://s12.gifyu.com/images/b9Noy.png",
    "https://s12.gifyu.com/images/b9N12.png",
];


// -----------------------------
// HAYIR BASINCA
// -----------------------------
noBtn.addEventListener("click", function () {

    if (noClickCount >= 15) return;

    noClickCount++;
    // 14. hayırdan sonra hayır butonunu yok et
    if (noClickCount === 14) {
        noBtn.style.display = "none";
    }
// Evet butonu büyüsün
yesScale *= 1.25;
yesBtn.style.transform = `scale(${yesScale})`;
yesBtn.style.transition = "0.3s ease";

// --- SADECE TITLE YUKARI ÇIKSIN ---
let titleUp = Math.min(noClickCount * 10, 120); 
title.style.transform = `translateY(-${titleUp}px)`;
title.style.transition = "0.3s ease";

// Değişen fotoğraf da title ile birlikte yukarı çıksın
image.style.transform = `translateY(-${titleUp}px)`;
image.style.transition = "0.3s ease";


// Evet büyüdükçe kalp oluştur
createBurstHeart(yesBtn);

    // Hayır butonu kaçsın
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Başlık + fotoğraf değişsin
    title.textContent = titles[noClickCount - 1];
    mainImg.src = images[noClickCount - 1];
});


// -----------------------------
// EVET BASINCA
// -----------------------------
yesBtn.addEventListener("click", function () {

    // Fade-in efektli yeni ekrana geçiş
    document.getElementById("container").style.display = "none";
    
    const result = document.getElementById("result");
    result.classList.remove("hidden");
    result.classList.add("fade-in");

    result.querySelector("#newImage").src =
        "https://i.hizliresim.com/a1geoub.gif";

    // PEMBE KONFETİ PATLASIN
    startConfetti();

    // KALP YAĞMURU BAŞLASIN
    setInterval(createHeart, 150);
});


// -----------------------------
// PEMBE KONFETİ FONKSİYONU
// -----------------------------
function startConfetti() {
    for (let i = 0; i < 40; i++) {
        const conf = document.createElement("div");
        conf.classList.add("confetti");

        const size = Math.random() * 10 + 8;
        conf.style.width = size + "px";
        conf.style.height = size + "px";

        conf.style.left = Math.random() * 100 + "vw";
        conf.style.animationDuration = (Math.random() * 1 + 1) + "s";
        conf.style.backgroundColor = "rgb(255, 150, 180)";

        document.body.appendChild(conf);

        setTimeout(() => conf.remove(), 2000);
    }
}


// -----------------------------
// KALP YAĞMURU
// -----------------------------
function createHeart() {
    const heart = document.createElement("i");
    heart.className = "fas fa-heart rain-heart";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";
    heart.style.animationDuration = (Math.random() * 2 + 2) + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}
function createBurstHeart(button) {
    const heart = document.createElement("div");
    heart.innerHTML = "💗";
    heart.style.position = "absolute";
    heart.style.fontSize = (Math.random() * 20 + 20) + "px";

    // Butonun konumunu bul
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top + rect.height / 2 + "px";

    heart.style.opacity = "1";
    heart.style.transition = "1s ease-out";
    
    document.body.appendChild(heart);

    // Yukarı doğru uçar
    setTimeout(() => {
        heart.style.transform = "translateY(-80px)";
        heart.style.opacity = "0";
    }, 50);

    // Kaybolduktan sonra sil
    setTimeout(() => {
        heart.remove();
    }, 1200);
}
document.addEventListener("mousemove", function (e) {
    const heart = document.createElement("div");
    heart.classList.add("cursor-heart");
    heart.innerHTML = "💗";

    heart.style.left = e.pageX + "px";
    heart.style.top = e.pageY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 900); // animasyon süresi
});
