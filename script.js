class ScoreboardManager {
    constructor() {
        this.players = [
            { id: 1, name: 'PLAYER 1', score: 0 },
            { id: 2, name: 'PLAYER 2', score: 0 },
            { id: 3, name: 'PLAYER 3', score: 0 }
        ];
        this.nextPlayerId = 4;
        this.scoreboardElement = document.getElementById('scoreboardContainer');
        this.init();
    }

    init() {
        this.renderScoreboard();
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('addPlayerBtn').addEventListener('click', () => this.addPlayer());
        document.getElementById('removePlayerBtn').addEventListener('click', () => this.removeLastPlayer());
        document.getElementById('resetScoresBtn').addEventListener('click', () => this.resetAllScores());
    }

    renderScoreboard() {
        this.scoreboardElement.innerHTML = '';

        this.players.forEach(player => {
            const playerCard = this.createPlayerCard(player);
            this.scoreboardElement.appendChild(playerCard);
        });
    }

    createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-8 card-glow transform transition-all duration-300 hover:scale-105 min-w-[250px] max-w-[300px]';
        
        card.innerHTML = `
            <div class="text-center">
                <h3 class="text-neon-yellow font-bold text-2xl mb-6 tracking-wide">${player.name}</h3>
                
                <div class="score-display text-neon-yellow mb-8 select-none">${player.score}</div>
                
                <div class="flex justify-center space-x-4 mb-6">
                    <button class="decrease-btn bg-gradient-to-r from-neon-pink to-red-600 hover:from-pink-600 hover:to-red-700 w-16 h-16 rounded-xl font-bold text-3xl transition-all duration-300 transform hover:scale-110 active:scale-95" data-player-id="${player.id}">
                        −
                    </button>
                    <button class="increase-btn bg-gradient-to-r from-neon-blue to-blue-600 hover:from-cyan-500 hover:to-blue-700 w-16 h-16 rounded-xl font-bold text-3xl transition-all duration-300 transform hover:scale-110 active:scale-95" data-player-id="${player.id}">
                        +
                    </button>
                </div>
                
                <button class="edit-name-btn bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95" data-player-id="${player.id}">
                    Edit Name
                </button>
            </div>
        `;

        this.attachCardEventListeners(card, player.id);
        
        return card;
    }

    attachCardEventListeners(card, playerId) {
        card.querySelector('.increase-btn').addEventListener('click', () => {
            this.updateScore(playerId, 1);
        });

        card.querySelector('.decrease-btn').addEventListener('click', () => {
            this.updateScore(playerId, -1);
        });

        card.querySelector('.edit-name-btn').addEventListener('click', () => {
            this.editPlayerName(playerId);
        });
    }

    updateScore(playerId, change) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            player.score = Math.max(0, player.score + change);
            this.renderScoreboard();
            this.animateScoreChange(playerId);
        }
    }

    animateScoreChange(playerId) {
        const playerCards = document.querySelectorAll(`[data-player-id="${playerId}"]`);
        playerCards.forEach(element => {
            element.classList.add('animate-pulse');
            setTimeout(() => {
                element.classList.remove('animate-pulse');
            }, 300);
        });
    }

    editPlayerName(playerId) {
        const player = this.players.find(p => p.id === playerId);
        if (player) {
            const newName = prompt('Enter new player name:', player.name);
            if (newName && newName.trim()) {
                player.name = newName.trim().toUpperCase();
                this.renderScoreboard();
            }
        }
    }

    addPlayer() {
        const playerName = prompt('Enter player name:', `PLAYER ${this.nextPlayerId}`);
        if (playerName && playerName.trim()) {
            const newPlayer = {
                id: this.nextPlayerId++,
                name: playerName.trim().toUpperCase(),
                score: 0
            };
            this.players.push(newPlayer);
            this.renderScoreboard();
            this.showNotification(`${newPlayer.name} added to the game!`);
        }
    }

    removeLastPlayer() {
        if (this.players.length > 1) {
            const removedPlayer = this.players.pop();
            this.renderScoreboard();
            this.showNotification(`${removedPlayer.name} removed from the game!`);
        } else {
            this.showNotification('Cannot remove the last player!', 'error');
        }
    }

    resetAllScores() {
        if (confirm('Are you sure you want to reset all scores to 0?')) {
            this.players.forEach(player => {
                player.score = 0;
            });
            this.renderScoreboard();
            this.showNotification('All scores have been reset!');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg font-bold text-white z-50 transform transition-all duration-300 ${
            type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('translate-x-0');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key) {
                    case 'n':
                        e.preventDefault();
                        this.addPlayer();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.resetAllScores();
                        break;
                    case 'Backspace':
                        e.preventDefault();
                        this.removeLastPlayer();
                        break;
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const scoreboard = new ScoreboardManager();
    scoreboard.setupKeyboardShortcuts();
    initializeRandomizer();
    
    setInterval(() => {
        createFloatingElement();
    }, 5000);
    
    createParticles();
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * 100 + '%';
        
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        const duration = Math.random() * 4 + 6;
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function initializeRandomizer() {
    const randomizeBtn = document.getElementById('randomizeBtn');
    
    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', randomizeDecade);
    }
}

function randomizeDecade() {
    const decades = [
        { name: '1980s', color: 'neon-blue', description: 'Retro Vibes' },
        { name: '1990s', color: 'neon-pink', description: 'Golden Era' },
        { name: '2000s', color: 'neon-yellow', description: 'Millennium' },
        { name: '2010s', color: 'neon-blue', description: 'Digital Age' },
        { name: '2020s', color: 'neon-pink', description: 'Modern Era' },
        { name: '2025s', color: 'neon-yellow', description: 'Future Hits' }
    ];
    
    const randomBtn = document.getElementById('randomizeBtn');
    const resultDiv = document.getElementById('randomResult');
    
    randomBtn.disabled = true;
    randomBtn.innerHTML = '🎲 RANDOMIZING... 🎲';
    
    resultDiv.innerHTML = '<div class="text-2xl text-neon-yellow animate-pulse">🎵 Selecting your decade... 🎵</div>';
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * decades.length);
        const selectedDecade = decades[randomIndex];
        
        resultDiv.innerHTML = `
            <div class="bg-gradient-to-r from-${selectedDecade.color}/20 to-${selectedDecade.color}/10 border-2 border-${selectedDecade.color} rounded-xl p-8 max-w-md mx-auto transform scale-110">
                <div class="text-5xl md:text-6xl font-black text-${selectedDecade.color} subtle-glow mb-4">
                    🎯 ${selectedDecade.name} 🎯
                </div>
                <div class="text-xl text-gray-300 mb-4">${selectedDecade.description}</div>
                <div class="text-lg text-neon-yellow font-bold">Let the music begin! 🎵</div>
            </div>
        `;
        
        randomBtn.disabled = false;
        randomBtn.innerHTML = '🎲 RANDOMIZE AGAIN 🎲';
        
        createConfetti();
        
    }, 2000);
}

function createConfetti() {
    const colors = ['#00ff80', '#ff0080', '#ffff00'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

function createFloatingElement() {
    const symbols = ['♪', '♫', '♬', '🎵', '🎶'];
    const colors = ['text-neon-pink', 'text-neon-blue', 'text-neon-yellow'];
    
    const element = document.createElement('div');
    element.className = `fixed text-4xl pointer-events-none z-0 ${colors[Math.floor(Math.random() * colors.length)]}`;
    element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.animation = 'float-up 8s linear forwards';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, 8000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        from {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateY(-${window.innerHeight + 200}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);