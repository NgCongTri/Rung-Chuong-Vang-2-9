/**
 * HỘI THI RUNG CHUÔNG VÀNG - SCRIPT ĐIỀU KHIỂN CHÍNH
 * Quản lý 20 câu hỏi Chặng 1, đồng hồ 10 giây, và chuyển sang Màn hình Cứu trợ (Chặng 2) khi kích hoạt.
 */

let currentQuestionIndex = 0;
let countdownSeconds = 10;
let countdownTimer = null;
let isTimerRunning = false;
let isAnswerRevealed = false;
let isMuted = false;

let audioCtx = null;
const songAudio = document.getElementById('song-audio');
const countdownAudio = document.getElementById('countdown-audio');
const victoryAudio = document.getElementById('victory-audio');

// Web Audio Synthesizer phát âm thanh chuông ngân
function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playSound(type) {
    if (isMuted) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        if (type === 'tick') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'bell_timesup') {
            // Chuông báo hết giờ giơ bảng
            [587.33, 880, 1174.66].forEach((f, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, now + i * 0.08);
                gain.gain.setValueAtTime(0.3, now + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.08);
                osc.stop(now + 1.25);
            });
        } else if (type === 'correct') {
            [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.type = 'triangle';
                o.frequency.setValueAtTime(f, now + i * 0.06);
                gain.gain.setValueAtTime(0.2, now + i * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
                o.connect(g);
                g.connect(ctx.destination);
                o.start(now + i * 0.06);
                o.stop(now + 0.95);
            });
        }
    } catch (e) {
        console.warn(e);
    }
}

function setScreen(screenId) {
    document.querySelectorAll('.screen-view').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) target.classList.add('active');
}

function shuffleQuizData() {
    for (let index = quizData.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [quizData[index], quizData[randomIndex]] = [quizData[randomIndex], quizData[index]];
    }
}

// Bắt đầu game 20 câu hỏi
function startOfficialGame() {
    shuffleQuizData();
    currentQuestionIndex = 0;
    document.getElementById('header-stage-pill').textContent = "Chặng 1: 20 Câu Hỏi Thử Thách";
    document.getElementById('current-stage-badge').textContent = "Chặng 1 (20 câu)";
    document.getElementById('total-q-count').textContent = quizData.length;

    setScreen('quiz-screen');
    loadQuestion(0);
}

// Tải câu hỏi
function loadQuestion(index) {
    if (index < 0 || index >= quizData.length) return;

    currentQuestionIndex = index;
    isAnswerRevealed = false;
    stopQuestionAudio();

    const qData = quizData[currentQuestionIndex];
    document.getElementById('current-q-index').textContent = currentQuestionIndex + 1;
    document.getElementById('total-q-count').textContent = quizData.length;

    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    document.getElementById('progress-bar-fill').style.width = `${progress}%`;

    const typeBadge = document.getElementById('q-type-badge');
    if (qData.type === 'audio') {
        typeBadge.className = 'q-badge-type audio-type';
        typeBadge.innerHTML = '🎵 Câu hỏi Âm Nhạc';
    } else {
        typeBadge.className = 'q-badge-type text-type';
        typeBadge.innerHTML = '📖 Câu hỏi Lịch Sử';
    }

    document.getElementById('question-text-box').textContent = `Câu ${currentQuestionIndex + 1}: ${qData.question}`;

    // Khung bài hát
    const audioBox = document.getElementById('audio-question-widget');
    if (qData.type === 'audio') {
        audioBox.style.display = 'flex';
        document.getElementById('audio-track-title').textContent = 'Đoạn nhạc thử thách';
        if (qData.audioSrc) songAudio.src = encodeURI(`assets/${qData.audioSrc}`);
    } else {
        audioBox.style.display = 'none';
    }

    // Danh sách đáp án
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    qData.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'option-button';
        btn.innerHTML = `<span>${opt}</span>`;
        optionsContainer.appendChild(btn);
    });

    // Ẩn giải thích
    document.getElementById('explanation-box').classList.remove('show');
    document.getElementById('btn-toggle-explain').textContent = '💡 Xem giải thích';

    resetCountdown();
}

// Đếm ngược 10 giây
function resetCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);
    stopCountdownAudio();
    countdownSeconds = 10;
    isTimerRunning = false;
    document.getElementById('btn-timer-toggle').textContent = '▶';
    updateCountdownUI();
}

function updateCountdownUI() {
    const display = document.getElementById('countdown-display');
    const badge = document.getElementById('timer-box-badge');
    display.textContent = `${countdownSeconds}s`;

    badge.classList.remove('danger', 'times-up');
    if (countdownSeconds === 0) {
        badge.classList.add('times-up');
        display.textContent = 'HẾT GIỜ!';
    } else if (countdownSeconds <= 3) {
        badge.classList.add('danger');
    }
}

function startCountdownTimer() {
    isTimerRunning = true;
    document.getElementById('btn-timer-toggle').textContent = '⏸';
    startCountdownAudio();
    startQuestionAudio();
    countdownTimer = setInterval(() => {
        if (countdownSeconds > 0) {
            countdownSeconds--;
            updateCountdownUI();
            if (countdownSeconds > 0 && countdownSeconds <= 3) playSound('tick');
            if (countdownSeconds === 0) {
                clearInterval(countdownTimer);
                isTimerRunning = false;
                document.getElementById('btn-timer-toggle').textContent = '🔄';
                stopCountdownAudio();
                stopQuestionAudio();
                playSound('bell_timesup');
            }
        }
    }, 1000);
}

function toggleTimer() {
    if (countdownSeconds === 0) {
        resetCountdown();
        return;
    }
    if (isTimerRunning) {
        clearInterval(countdownTimer);
        isTimerRunning = false;
        document.getElementById('btn-timer-toggle').textContent = '▶';
        if (countdownAudio) countdownAudio.pause();
        if (songAudio) songAudio.pause();
    } else {
        startCountdownTimer();
    }
}

function startQuestionAudio() {
    const qData = quizData[currentQuestionIndex];
    if (!songAudio || qData.type !== 'audio' || !qData.audioSrc) return;

    songAudio.play().catch(() => {
        console.warn('Không thể tự động phát đoạn nhạc.');
    });
}

function startCountdownAudio() {
    if (!countdownAudio || isMuted) return;

    countdownAudio.play().catch(() => {
        console.warn('Không thể phát âm thanh đếm ngược.');
    });
}

function stopCountdownAudio() {
    if (countdownAudio) {
        countdownAudio.pause();
        countdownAudio.currentTime = 0;
    }
}

// Công bố đáp án
function revealCorrectAnswerForHost() {
    isAnswerRevealed = true;
    const qData = quizData[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-button');

    if (buttons[qData.correctIndex]) {
        buttons[qData.correctIndex].classList.add('correct');
        playSound('correct');
        triggerConfetti(buttons[qData.correctIndex]);
    }

    if (qData.explanation) {
        document.getElementById('explanation-text').textContent = qData.explanation;
        document.getElementById('explanation-box').classList.add('show');
    }
}

function toggleExplanationManual() {
    const expBox = document.getElementById('explanation-box');
    const qData = quizData[currentQuestionIndex];
    if (expBox.classList.contains('show')) {
        expBox.classList.remove('show');
        document.getElementById('btn-toggle-explain').textContent = '💡 Xem giải thích';
    } else {
        document.getElementById('explanation-text').textContent = qData.explanation || `Đáp án đúng là: ${qData.options[qData.correctIndex]}`;
        expBox.classList.add('show');
        document.getElementById('btn-toggle-explain').textContent = 'Ẩn giải thích';
    }
}

function handleNextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        triggerVictory();
    }
}

function handlePrevQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

// KHI BẤM NÚT CỨU TRỢ: Dừng câu hỏi và chỉ hiển thị Màn hình Cứu trợ (Chặng 2)
function triggerRescueScreen() {
    if (countdownTimer) clearInterval(countdownTimer);
    stopCountdownAudio();
    stopQuestionAudio();
    document.getElementById('header-stage-pill').textContent = "Chặng 2: Phần Thi Cứu Trợ";
    setScreen('stage-clear-screen');
}

function triggerVictory() {
    if (countdownTimer) clearInterval(countdownTimer);
    stopCountdownAudio();
    stopQuestionAudio();
    setScreen('victory-screen');
    playVictoryAudio();
    playSound('correct');
    triggerGrandFireworks();
}

function returnToMainMenu() {
    if (countdownTimer) clearInterval(countdownTimer);
    stopCountdownAudio();
    stopVictoryAudio();
    stopQuestionAudio();
    document.getElementById('header-stage-pill').textContent = "Chặng 1: 20 Câu Hỏi Thử Thách";
    setScreen('start-screen');
}

function stopQuestionAudio() {
    if (songAudio) {
        songAudio.pause();
        songAudio.currentTime = 0;
    }
}

function playVictoryAudio() {
    if (!victoryAudio || isMuted) return;

    victoryAudio.currentTime = 0;
    victoryAudio.play().catch(() => {
        console.warn('Không thể phát âm thanh chúc mừng.');
    });
}

function stopVictoryAudio() {
    if (victoryAudio) {
        victoryAudio.pause();
        victoryAudio.currentTime = 0;
    }
}

// Quản lý Modals
function toggleRescueModal(show) {
    const m = document.getElementById('rescue-modal');
    if (show) m.classList.add('show');
    else m.classList.remove('show');
}

function toggleShortcutsModal(show) {
    const m = document.getElementById('shortcuts-modal');
    if (show) m.classList.add('show');
    else m.classList.remove('show');
}

function toggleSound() {
    isMuted = !isMuted;
    if (countdownAudio) countdownAudio.muted = isMuted;
    if (victoryAudio) victoryAudio.muted = isMuted;
    document.getElementById('btn-toggle-sound').innerHTML = isMuted ? '🔇' : '🔊';
}

function toggleFullScreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else if (document.exitFullscreen) document.exitFullscreen();
}

// Pháo hoa Confetti Canvas
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let confettiId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createParticle(x, y) {
    const colors = ['#ffd700', '#ff0033', '#00e5ff', '#ff007f', '#00ff66', '#ffffff'];
    return {
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height * 0.4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * -6 - 3,
        gravity: 0.18,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        life: 1
    };
}

function triggerConfetti(el) {
    let x = canvas.width / 2, y = canvas.height / 2;
    if (el) {
        const r = el.getBoundingClientRect();
        x = r.left + r.width / 2; y = r.top + r.height / 2;
    }
    for (let i = 0; i < 40; i++) particles.push(createParticle(x, y));
    if (!confettiId) renderConfetti();
}

function triggerGrandFireworks() {
    for (let i = 0; i < 150; i++) particles.push(createParticle());
    if (!confettiId) renderConfetti();
}

function renderConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, idx) => {
        p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.rotation += p.rotationSpeed; p.life -= 0.015;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
        if (p.life <= 0 || p.y > canvas.height) particles.splice(idx, 1);
    });
    if (particles.length > 0) confettiId = requestAnimationFrame(renderConfetti);
    else { cancelAnimationFrame(confettiId); confettiId = null; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

function createStarfield() {
    const f = document.getElementById('starfield');
    if (!f) return;
    f.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        s.style.animationDelay = `${Math.random() * 3}s`;
        f.appendChild(s);
    }
}

// Bàn phím điều khiển
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        toggleRescueModal(false);
        toggleShortcutsModal(false);
        return;
    }
    if (!document.getElementById('quiz-screen').classList.contains('active')) return;

    const k = e.key.toUpperCase();
    if (k === 'H') revealCorrectAnswerForHost();
    else if (e.key === ' ') { e.preventDefault(); toggleTimer(); }
    else if (e.key === 'ArrowRight') handleNextQuestion();
    else if (e.key === 'ArrowLeft') handlePrevQuestion();
    else if (k === 'F') toggleFullScreen();
});

document.addEventListener('DOMContentLoaded', () => {
    createStarfield();
});