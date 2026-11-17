// Initialize Icons
        lucide.createIcons();
        // Mobile Menu Drawer Toggle
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        let currentSkillCategory = null;
        let matchPlayersLocked = false;
        const playerPool = ["Aaron", "Jennel", "Chedee", "Mikko", "Kim", "Dennis", "John", "PJ", "Rems", "BanBan", "Brio", "Bry"];
        const masterCourtsList = [
            "Pickle Labs",
            "Rally Yard",
            "Supreme Court",
            "RJ3 Pickleball Station",
            "Pickle Hub",
            "Paddle House",
            "Dink Point",
            "Orange Pulse"
        ];
        let randomizedCourts = [];
        function getRandomCourts() {
            const shuffled = [...masterCourtsList];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled.slice(0, 3);
        }
        // Quick Match Demo Button in Hero Card (requires completing questionnaire first)
        function triggerQuickMatchDemo(forceRefresh = false) {
            const resultDiv = document.getElementById('demo-match-result');
            const summary = document.getElementById('demo-match-summary');
            const list = document.getElementById('matched-players-list');
            const estimatorLink = document.getElementById('demo-match-estimator-link');
            if (!currentSkillCategory) {
                summary.textContent = "📋 Please complete the sample questionnaire first by clicking \"Try the Skill Questionnaire Estimator\" below to receive your skill assessment before matching players or viewing court suggestions.";
                list.innerHTML = "";
                list.classList.add('hidden');
                estimatorLink.classList.remove('hidden');
                resultDiv.classList.remove('hidden');
                return;
            }
            estimatorLink.classList.add('hidden');
            list.classList.remove('hidden');
            summary.textContent = `🎾 Found 3 ${currentSkillCategory}-level players for a balanced 2v2 session!`;
            if (!matchPlayersLocked || forceRefresh) {
                const shuffled = [...playerPool];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                const selected = shuffled.slice(0, 3);
                list.innerHTML = selected.map(name => `
                    <div class="bg-white border border-emerald-200 rounded-xl px-2.5 py-2 text-center shadow-sm">
                        <p class="text-xs font-extrabold text-slate-800">${name}</p>
                        <p class="text-[10px] font-semibold text-emerald-700">${currentSkillCategory}</p>
                    </div>
                `).join('');
                matchPlayersLocked = true;
            }
            resultDiv.classList.remove('hidden');
        }
        function hideQuickMatchDemo() {
            document.getElementById('demo-match-result').classList.add('hidden');
        }
        // Interactive Skill Quiz Estimator & Auto Popup Modal Trigger
        function calculateSkillCategory() {
            const q1 = parseInt(document.getElementById('quiz-q1').value);
            const q2 = parseInt(document.getElementById('quiz-q2').value);
            const q3 = parseInt(document.getElementById('quiz-q3').value);
            const score = q1 + q2 + q3;
            const resultBox = document.getElementById('quiz-result');
            const title = document.getElementById('result-tier-title');
            const desc = document.getElementById('result-tier-desc');
            const appPreviewBadge = document.getElementById('app-preview-badge');
            const appPreviewStatus = document.getElementById('app-preview-status');
            const appPreviewCategory = document.getElementById('app-preview-category');
            const appPreviewSubtext = document.getElementById('app-preview-subtext');
            const appPreviewCta = document.getElementById('app-preview-cta');
            const appPreviewSession = document.getElementById('app-preview-session');
            const appPreviewCourtsList = document.getElementById('app-preview-courts-list');
            const demoMatchResult = document.getElementById('demo-match-result');
            resultBox.classList.remove('hidden');
            if (score <= 4) {
                currentSkillCategory = "Beginner";
                title.textContent = "Beginner Level";
                title.className = "text-2xl font-black text-emerald-700";
                desc.textContent = "Focusing on learning scoring, basic court positioning, and baseline returns.";
            } else if (score <= 6) {
                currentSkillCategory = "Novice";
                title.textContent = "Novice Level";
                title.className = "text-2xl font-black text-teal-700";
                desc.textContent = "Developing directional control, consistent serves, and third-shot awareness.";
            } else if (score <= 8) {
                currentSkillCategory = "Intermediate";
                title.textContent = "Intermediate Level";
                title.className = "text-2xl font-black text-amber-700";
                desc.textContent = "Sustained dink rallies, controlled third-shot drops, and fast-paced doubles play!";
            } else {
                currentSkillCategory = "Advanced";
                title.textContent = "Advanced Level";
                title.className = "text-2xl font-black text-purple-700";
                desc.textContent = "High-level strategic resets, offensive dinks, power drives, and competitive tournament play!";
            }
            if (appPreviewBadge) {
                appPreviewBadge.textContent = "MATCHING LIVE";
                appPreviewBadge.className = "text-xs font-mono text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200";
            }
            if (appPreviewStatus) {
                appPreviewStatus.textContent = "Skill Assessment Completed";
            }
            if (appPreviewCategory) {
                appPreviewCategory.textContent = `Your Category: ${currentSkillCategory}`;
            }
            if (appPreviewSubtext) {
                appPreviewSubtext.textContent = "3 Players Found Nearby";
            }
            if (appPreviewCta) {
                appPreviewCta.classList.add('hidden');
            }
            if (appPreviewSession) {
                appPreviewSession.textContent = `Recommended ${currentSkillCategory} Courts & Sessions:`;
                appPreviewSession.className = "text-slate-700 font-semibold";
            }
            randomizedCourts = getRandomCourts();
            if (appPreviewCourtsList) {
                appPreviewCourtsList.classList.remove('hidden');
                appPreviewCourtsList.innerHTML = randomizedCourts.map(court => `
                    <div class="bg-white border border-purple-200 rounded-xl px-3 py-2 flex items-center justify-between shadow-sm">
                        <span class="font-bold text-slate-800">${court}</span>
                        <span class="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">Open Play (${currentSkillCategory})</span>
                    </div>
                `).join('');
            }
            matchPlayersLocked = false;
            if (demoMatchResult && !demoMatchResult.classList.contains('hidden')) {
                triggerQuickMatchDemo(true);
            }
            setTimeout(() => {
                openAccessModal();
            }, 600);
        }
        // Feedback Form Submission Handler with visual error indicators
        function handleFeedbackSubmit(e) {
            e.preventDefault();
            const nameInput = document.getElementById('feedback-name');
            const emailInput = document.getElementById('feedback-email');
            const msgInput = document.getElementById('feedback-msg');
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const msgVal = msgInput.value.trim();
            let hasError = false;
            if (!nameVal) {
                document.getElementById('name-error-icon').classList.remove('hidden');
                document.getElementById('name-error-msg').classList.remove('hidden');
                nameInput.classList.add('border-red-500', 'bg-red-50');
                hasError = true;
            } else {
                document.getElementById('name-error-icon').classList.add('hidden');
                document.getElementById('name-error-msg').classList.add('hidden');
                nameInput.classList.remove('border-red-500', 'bg-red-50');
            }
            if (!emailVal.toLowerCase().endsWith('@gmail.com')) {
                document.getElementById('email-error-icon').classList.remove('hidden');
                document.getElementById('email-error-msg').classList.remove('hidden');
                emailInput.classList.add('border-red-500', 'bg-red-50');
                hasError = true;
            } else {
                document.getElementById('email-error-icon').classList.add('hidden');
                document.getElementById('email-error-msg').classList.add('hidden');
                emailInput.classList.remove('border-red-500', 'bg-red-50');
            }
            if (!msgVal) {
                document.getElementById('msg-error-icon').classList.remove('hidden');
                document.getElementById('msg-error-msg').classList.remove('hidden');
                msgInput.classList.add('border-red-500', 'bg-red-50');
                hasError = true;
            } else {
                document.getElementById('msg-error-icon').classList.add('hidden');
                document.getElementById('msg-error-msg').classList.add('hidden');
                msgInput.classList.remove('border-red-500', 'bg-red-50');
            }
            if (hasError) return;
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-5 right-5 bg-emerald-200 text-emerald-950 px-6 py-4 rounded-2xl shadow-xl z-50 text-sm font-extrabold flex items-center space-x-2 border border-emerald-300 animate-bounce';
            notification.innerHTML = `<span>💬 Thank you for your feedback, ${nameVal}! We appreciate your input.</span>`;
            document.body.appendChild(notification);
            document.getElementById('feedback-form').reset();
            setTimeout(() => notification.remove(), 4000);
        }
        // Modal Controls
        function openAccessModal() {
            document.getElementById('access-modal').classList.remove('hidden');
        }
        function closeAccessModal() {
            document.getElementById('access-modal').classList.add('hidden');
        }
        function handleBetaSubmit(e) {
            e.preventDefault();
            closeAccessModal();
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-5 right-5 bg-emerald-200 text-emerald-950 px-6 py-4 rounded-2xl shadow-xl z-50 text-sm font-extrabold flex items-center space-x-2 border border-emerald-300 animate-bounce';
            notification.innerHTML = `<span>🎾 Thank you! Your PickleLevel App download is starting!</span>`;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 4000);
        }
        // Lightbox Functions
        function openLightbox(imgSrc, title) {
            document.getElementById('lightbox-img').src = imgSrc;
            document.getElementById('lightbox-title').textContent = title;
            document.getElementById('lightbox-modal').classList.remove('hidden');
        }
        function closeLightbox() {
            document.getElementById('lightbox-modal').classList.add('hidden');
        }
        // Drag to scroll / Swipe functionality for Marquee
        const slider = document.getElementById('marquee-container');
        const track = document.getElementById('marquee-track');
        let isDown = false;
        let startX;
        let scrollLeft;
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.animationPlayState = 'paused';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.animationPlayState = 'running';
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            track.style.animationPlayState = 'running';
        });
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
        // Touch support for mobile devices
        slider.addEventListener('touchstart', (e) => {
            track.style.animationPlayState = 'paused';
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('touchend', () => {
            track.style.animationPlayState = 'running';
        });
        slider.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
