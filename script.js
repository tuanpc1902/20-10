// Enhanced Particle System with more flowers and hearts
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀', '💐', '🏵️', '🥀', '🪷', '🪻', '🌵', '🌺', '🌻', '🌷', '🌹', '🌼'];
        this.hearts = ['💖', '💕', '💗', '💝', '💘', '💓', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍'];
        
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const isMobile = window.innerWidth <= 768;
        const particleCount = isMobile ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const isHeart = Math.random() > 0.6;
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
                vy: Math.random() * (isMobile ? 0.5 : 0.6) + 0.3,
                size: Math.random() * (isMobile ? 20 : 25) + (isMobile ? 15 : 20),
                emoji: isHeart ? this.hearts[Math.floor(Math.random() * this.hearts.length)] : this.flowers[Math.floor(Math.random() * this.flowers.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * (isMobile ? 1.5 : 2),
                opacity: Math.random() * 0.4 + 0.4,
                swingAmplitude: Math.random() * (isMobile ? 1 : 1.5) + 0.5,
                swingSpeed: Math.random() * 0.015 + 0.005,
                swingOffset: Math.random() * Math.PI * 2,
                isHeart: isHeart
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            const time = Date.now() * 0.001;
            particle.x += particle.vx + Math.sin(time * particle.swingSpeed + particle.swingOffset) * particle.swingAmplitude;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            
            if (particle.y > this.canvas.height + 50) {
                particle.y = -50;
                particle.x = Math.random() * this.canvas.width;
                particle.emoji = particle.isHeart ? 
                    this.hearts[Math.floor(Math.random() * this.hearts.length)] : 
                    this.flowers[Math.floor(Math.random() * this.flowers.length)];
            }
            
            if (particle.x < -50) particle.x = this.canvas.width + 50;
            if (particle.x > this.canvas.width + 50) particle.x = -50;
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation * Math.PI / 180);
            this.ctx.font = `${particle.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(particle.emoji, 0, 0);
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Typewriter Effect with cursor
class TypewriterEffect {
    constructor(element, text, speed = 40) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        this.cursor = document.createElement('span');
        this.cursor.className = 'typing-cursor';
    }
    
    start() {
        this.element.textContent = '';
        this.element.appendChild(this.cursor);
        this.type();
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            const char = this.text.charAt(this.currentIndex);
            const textNode = document.createTextNode(char);
            this.element.insertBefore(textNode, this.cursor);
            this.currentIndex++;
            
            if (this.element.scrollHeight > this.element.clientHeight) {
                this.element.scrollTop = this.element.scrollHeight;
            }
            
            // Add typing sound effect (optional)
            if (char !== ' ' && char !== '\n') {
                this.addTypingEffect();
            }
            
            setTimeout(() => this.type(), this.speed);
        } else {
            // Remove cursor when done
            setTimeout(() => {
                if (this.cursor.parentNode) {
                    this.cursor.parentNode.removeChild(this.cursor);
                }
            }, 1000);
        }
    }
    
    addTypingEffect() {
        // Add subtle glow effect to the last typed character
        const lastChar = this.element.lastChild;
        if (lastChar && lastChar.nodeType === Node.TEXT_NODE) {
            const span = document.createElement('span');
            span.style.color = '#e91e63';
            span.style.textShadow = '0 0 5px rgba(233, 30, 99, 0.5)';
            span.style.transition = 'all 0.3s ease';
            
            const text = lastChar.textContent;
            lastChar.textContent = text.slice(0, -1);
            span.textContent = text.slice(-1);
            
            this.element.insertBefore(span, this.cursor);
            
            setTimeout(() => {
                span.style.color = '#333';
                span.style.textShadow = 'none';
            }, 200);
        }
    }
}

// Confetti Effect
class ConfettiEffect {
    constructor() {
        this.container = document.getElementById('confetti-container');
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#fd79a8', '#fdcb6e'];
        const shapes = ['🌸', '🌺', '🌷', '💖', '✨', '⭐', '💐', '🌹', '💗', '💝', '💘', '💓', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍'];
        
        for (let i = 0; i < 80; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const isEmoji = Math.random() > 0.5;
            if (isEmoji) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 15 + 5) + 'px';
                confetti.style.height = (Math.random() * 15 + 5) + 'px';
            }
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 1 + 's';
            
            this.container.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }
    }
}

// Sparkle Effect
class SparkleEffect {
    create() {
        const sparkles = ['✨', '⭐', '💫', '🌟', '💖', '💕', '💗', '💝', '💘', '💓', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                sparkle.style.position = 'fixed';
                sparkle.style.left = Math.random() * window.innerWidth + 'px';
                sparkle.style.top = Math.random() * window.innerHeight + 'px';
                sparkle.style.fontSize = (Math.random() * 30 + 20) + 'px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                sparkle.style.animation = 'sparkle 2s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 2000);
            }, i * 80);
        }
    }
}

// Main Application
class App {
    constructor() {
        this.envelope = document.getElementById('envelope');
        this.letter = document.getElementById('letter');
        this.letterContent = document.getElementById('letterContent');
        this.isOpen = false;
        
        this.message = `Gửi em yêu,

Ngày 20/10 đặc biệt này, anh muốn nói với em rằng em là người phụ nữ tuyệt vời nhất trong cuộc đời anh.

Em là bông hoa đẹp nhất, là nguồn cảm hứng và động lực để anh cố gắng mỗi ngày.

Chúc em luôn xinh đẹp, khỏe mạnh và hạnh phúc. Mong nụ cười luôn nở trên môi em.

Anh yêu em nhiều lắm!

Chúc mừng ngày Phụ nữ Việt Nam 20/10!`;

        this.init();
    }
    
    init() {
        new ParticleSystem();
        this.confettiEffect = new ConfettiEffect();
        this.sparkleEffect = new SparkleEffect();
        
        this.envelope.addEventListener('click', () => this.openEnvelope());
        
        this.addInteractiveEffects();
    }
    
    openEnvelope() {
        if (this.isOpen) {
            this.closeEnvelope();
            return;
        }
        
        this.isOpen = true;
        this.envelope.classList.add('open');
        
        setTimeout(() => {
            const isMobile = window.innerWidth <= 768;
            const typingSpeed = isMobile ? 35 : 45;
            const typewriter = new TypewriterEffect(this.letterContent, this.message, typingSpeed);
            typewriter.start();
        }, 1000);
        
        setTimeout(() => {
            this.confettiEffect.createConfetti();
        }, 1200);
        
        setTimeout(() => {
            this.sparkleEffect.create();
        }, 1500);
    }
    
    closeEnvelope() {
        this.isOpen = false;
        this.envelope.classList.remove('open');
        this.letterContent.textContent = '';
    }
    
    addInteractiveEffects() {
        const title = document.querySelector('.title');
        title.addEventListener('click', () => {
            title.style.animation = 'none';
            setTimeout(() => {
                title.style.animation = 'pulse 1.2s ease-in-out';
            }, 10);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});
