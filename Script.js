// Globale Zustände und Konfigurationen
let partyConfettiInterval = null;
let cinemaInterval = null;
let currentSlideIndex = 0;
let isBgMusicPlaying = false;
let speedMultiplier = 1;

// Audio-Elemente abfangen
const bgMusic = document.getElementById('bg-music');
const sadMusic = document.getElementById('sad-music');
const musicBtn = document.getElementById('music-btn');

// Slideshow Beschriftungen
const slideCaptions = [
    "Stefan Kallinich – Unendlicher Support in schweren Zeiten! ⭐",
    "Marvin Kurzmanowski – Ein absolutes Herzstück der ChaosCrew! ⭐",
    "Ramona Eichert – Danke für alles in der CookieCrew! ❤️",
    "Steven Tanu – Wir sehen uns alle an der Ziellinie! 🏁",
    "Anna Hoff - Super Dozentin! Geduld aus stahl, wir sehen uns wieder!" 
    
];

// 1. REITER-STEUERUNG (NAVIGATON)
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        if(btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(sectionId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function startExperience() {
    document.getElementById('experience-intro').style.display = 'none';
    if(bgMusic) {
        bgMusic.play().catch(e => console.log("Audio-Wiedergabe bereit:", e));
        isBgMusicPlaying = true;
        if(musicBtn) {
            musicBtn.innerText = "⏸️ Hintergrundmusik AUS";
            musicBtn.style.background = "#2c3e50";
        }
    }
    showSection('home');
    initScrollReveal();
}

// 2. AUDIO LOGIK
function toggleMusic() {
    if (!bgMusic || !musicBtn) return;
    
    if (!isBgMusicPlaying) {
        bgMusic.play().catch(e => console.log("Audio blockiert:", e));
        isBgMusicPlaying = true;
        musicBtn.innerText = "⏸️ Hintergrundmusik AUS";
        musicBtn.style.background = "#2c3e50";
    } else {
        bgMusic.pause();
        isBgMusicPlaying = false;
        musicBtn.innerText = "🎵 Hintergrundmusik AN";
        musicBtn.style.background = "#e74c3c";
    }
}

function triggerDeepEmotion() {
    if (bgMusic) bgMusic.pause();
    if (sadMusic) {
        sadMusic.currentTime = 0;
        sadMusic.play().catch(e => console.log("Audio blockiert:", e));
    }
    document.getElementById('tear-jerker-overlay').style.display = 'block';
    
    if (typeof confetti === 'function') {
        var duration = 6 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            var particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
}

function closeOverlay() {
    if (sadMusic) sadMusic.pause();
    document.getElementById('tear-jerker-overlay').style.display = 'none';
    speedMultiplier = 25;
    setTimeout(() => {
        speedMultiplier = 1;
        if (isBgMusicPlaying && bgMusic) {
            bgMusic.play().catch(e => console.log(e));
        }
    }, 800);
}

// 3. INTERAKTIVES KLASSEN-TERMINAL (Mit geheimer Bonus-Freischaltung!)
function checkSpaceCode() {
    const input = document.getElementById('space-input').value.trim().toLowerCase();
    const response = document.getElementById('space-response');
    const secretBtn = document.getElementById('nav-secret');
    
    if (input === 'modul3' || input === 'chaos' || input === 'chaoscrew') {
        response.innerHTML = "🔓 <strong>ZUGRIFF GEWÄHRT:</strong> Kern-Protokoll der ChaosCrew aktiv! Ihr seid spitze. Startet die Zündung unten für die Botschaft! 🌟";
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else if (input === 'reise' || input === 'danke' || input === 'bonus') {
        // GEHEIMER REITER FREISCHALTUNG!
        secretBtn.style.display = 'inline-block';
        secretBtn.classList.add('secret-unlocked-animation');
        response.innerHTML = "✨ <strong>BONUS SYSTEM AKTIVIERT:</strong> Ein verstecktes Datenpaket wurde geladen! Ein neuer Reiter <strong>[✨ Bonus: Dankbarkeit]</strong> ist oben im Menü erschienen!";
        confetti({ particleCount: 80, spread: 100, colors: ['#00f3ff', '#ffd166', '#ff007f'] });
        setTimeout(() => { showSection('secret-log'); }, 1500);
    } else if (input === 'linux') {
        response.innerHTML = "🐧 <code>chmod -R 777 /heart</code>. Zugriff erlaubt. Patrick sendet Grüße aus dem Terminal!";
    } else if (input === 'python') {
        response.innerHTML = "🐍 <code>import heart; heart.fill_with_love()</code>. Die Triebwerke laufen stabil!";
    } else if (input === '') {
        response.innerHTML = "❌ Bitte tippe zuerst einen Befehl ein.";
    } else {
        response.innerHTML = `🛰️ Code "${input}" empfangen, aber nicht im Verzeichnis gefunden. Versuche es mit "Modul3", "Linux" oder dem Geheimcode "reise"!`;
    }
}
// Schreibmaschienen-Effekt für Dossiers
function revealDossier(dossierId) {
    const element = document.getElementById(dossierId);
    if (!element) return;
    
    // Wenn das Element bereits sichtbar ist, blende es aus (Toggle)
    if (element.style.display === 'block') {
        element.style.display = 'none';
        element.innerHTML = '';
        return;
    }
    
    // Hole den versteckten Text aus dem data-Attribut
    const fullText = element.getAttribute('data-text');
    element.innerHTML = '';
    element.style.display = 'block';
    
    // Schreibmaschinen-Effekt für die persönliche Nachricht
    let index = 0;
    function typeLetter() {
        if (index < fullText.length) {
            element.innerHTML += fullText.charAt(index);
            index++;
            setTimeout(typeLetter, 15); // Schnelles, flüssiges Eintippen
        }
    }
    typeLetter();
}

// 5. CINEMA FILMSLIDESHOW ENGINE (Automatisiert & reaktiv)
function playCinemaFilm() {
    // Falls keine Bilder da sind, abbrechen
    const cinemaSlides = document.querySelectorAll('.cinema-slide');
    if (cinemaSlides.length === 0) return;

    // Das aktuelle Bild ausblenden
    cinemaSlides[currentSlideIndex].classList.remove('active');

    // Index erhöhen (und am Ende wieder bei 0 anfangen)
    currentSlideIndex = (currentSlideIndex + 1) % cinemaSlides.length;

    // Das neue Bild einblenden
    cinemaSlides[currentSlideIndex].classList.add('active');

    // Optionale Beschriftung aktualisieren (falls gewünscht)
    const captionContainer = document.getElementById('cinema-caption');
    if (captionContainer) {
        captionContainer.innerText = slideCaptions[currentSlideIndex] || cinemaSlides[currentSlideIndex].alt;
    }
}

function jumpToSlide(index) {
    clearInterval(cinemaInterval);
    const slides = document.querySelectorAll('.cinema-slide');
    const dots = document.querySelectorAll('.cinema-dot');
    const captionContainer = document.getElementById('cinema-caption');

    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.remove('active-dot');

    currentSlideIndex = index;

    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active-dot');
    captionContainer.innerText = slideCaptions[currentSlideIndex] || slides[currentSlideIndex].alt;

    cinemaInterval = setInterval(playCinemaFilm, 3500);
}

// 6. GÄSTEBUCH ENGINE
function loadMessages() {
    const messagesList = document.getElementById('messages-list');
    if (!messagesList) return;
    
    const savedMessages = JSON.parse(localStorage.getItem('abschieds_nachrichten')) || [];
    messagesList.innerHTML = "";
    
    if (savedMessages.length === 0) {
        messagesList.innerHTML = `<div class="user-msg">Noch keine Spuren hinterlassen. Sei der Erste! ❤️</div>`;
        return;
    }

    savedMessages.forEach(messageText => {
        const newDiv = document.createElement('div');
        newDiv.className = 'user-msg';
        newDiv.innerHTML = `<strong>Hinterlassene Spur:</strong> ${messageText}`;
        messagesList.appendChild(newDiv);
    });
}

function addMessageFromForm() {
    const textInput = document.getElementById('note-text');
    const messageText = textInput.value.trim();

    if (messageText === "") {
        alert("Bitte schreibe zuerst eine Nachricht!");
        return;
    }

    const savedMessages = JSON.parse(localStorage.getItem('abschieds_nachrichten')) || [];
    savedMessages.unshift(messageText);
    localStorage.setItem('abschieds_nachrichten', JSON.stringify(savedMessages));
    
    loadMessages();
    textInput.value = "";
    alert("Deine Nachricht wurde der Pinnwand hinzugefügt! ❤️");
}

// 7. COUNTDOWN ENGINE
const targetDate = new Date();
targetDate.setMonth(targetDate.getMonth() + 2);

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
}

// 8. SCROLL REVEAL EFFEKT
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.classList.add('reveal-section'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.05 });
    
    sections.forEach(sec => observer.observe(sec));
}

// 9. ANIMIERTER MAUSZEIGER + BUTTON-EFFEKTE (Feuerwerk & Sternschnuppe)
let shootingStars = [];

function initCustomCursorAndEffects() {
    const heart = document.getElementById('custom-heart-cursor');
    if (!heart) return;

    window.addEventListener('mousemove', (e) => {
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', () => { heart.classList.add('active'); });
    document.addEventListener('mouseleave', () => { heart.classList.remove('active'); });

    // Buttons überwachen für das Feuerwerk & Sternschnuppen-Schießen
    const updateButtonListeners = () => {
        const buttons = document.querySelectorAll('.nav-btn, .enter-btn, .audio-control, .submit-btn, .trigger-btn, .close-overlay-btn, .space-command-box button');
        buttons.forEach(btn => {
            // Verhindert doppelte Listener
            btn.removeEventListener('mouseenter', handleButtonEnter);
            btn.removeEventListener('mouseleave', handleButtonLeave);
            btn.addEventListener('mouseenter', handleButtonEnter);
            btn.addEventListener('mouseleave', handleButtonLeave);
        });
    };

    function handleButtonEnter() {
        heart.innerText = "💥"; // Verwandlung in Feuerwerk-Explosion
        heart.style.transform = "translate(-50%, -50%) scale(1.5)";
        triggerShootingStar();
    }

    function handleButtonLeave() {
        heart.innerText = "❤️"; // Zurück zum Herz
        heart.style.transform = "translate(-50%, -50%) scale(1)";
    }

    updateButtonListeners();
    // Re-initialisieren, falls geheime Buttons eingeblendet werden
    setInterval(updateButtonListeners, 2000);
}

function triggerShootingStar() {
    shootingStars.push({
        x: Math.random() * window.innerWidth * 0.4, // Startet links oben im Orbit
        y: 0,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 15 + 10,
        opacity: 1
    });
}

// 10. UNENDLICHE STERNENFELD-DRIFT & SHOOTING STARS DRAWER
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let starsArray = [];
const numStars = 140;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class SpaceStar {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.speed = Math.random() * 0.02 + 0.005;
        this.dx = (Math.random() - 0.5) * 0.15;
        this.dy = Math.random() * 0.2 + 0.05;
    }
    update() {
        this.alpha += this.speed;
        if (this.alpha > 1 || this.alpha < 0.2) this.speed = -this.speed;
        this.x += this.dx * speedMultiplier;
        this.y += this.dy * speedMultiplier;

        if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 243, 255, ${this.alpha})`;
        ctx.fill();
    }
}

function initStars() {
    starsArray = [];
    for(let i = 0; i < numStars; i++) starsArray.push(new SpaceStar());
}

function animateCanvasLayers() {
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grundsterne
    starsArray.forEach(star => {
        star.update();
        star.draw();
    });

    // Interaktive Sternschnuppen zeichnen
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let p = shootingStars[i];
        p.x += p.speed;
        p.y += p.speed * 0.6; // Diagonaler Flugwinkel
        p.opacity -= 0.02;

        if (p.opacity <= 0 || p.x > canvas.width || p.y > canvas.height) {
            shootingStars.splice(i, 1);
            continue;
        }

        // Glühender Kometenschweif
        let gradient = ctx.createLinearGradient(p.x, p.y, p.x - p.length, p.y - p.length * 0.6);
        gradient.addColorStop(0, `rgba(0, 243, 255, ${p.opacity})`);
        gradient.addColorStop(0.2, `rgba(138, 43, 226, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');


        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.length, p.y - p.length * 0.6);
        ctx.stroke();
    }

    requestAnimationFrame(animateCanvasLayers);
}

// INITIALISIERUNG
// Start-Initiation
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;
initStars();
animateStars();

// Mausverfolgung für den Custom-Cursor
const customCursor = document.getElementById('custom-heart-cursor');
if (customCursor) {
    window.addEventListener('mousemove', (e) => {
        customCursor.classList.add('active');
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    window.addEventListener('mouseleave', () => {
        customCursor.classList.remove('active');
    });
}

// =========================================================================
// --- HIER REINKOPIEREN: KINO-FILM BEIM LADEN DER SEITE STARTEN ---
// =========================================================================
cinemaInterval = setInterval(playCinemaFilm, 120);
