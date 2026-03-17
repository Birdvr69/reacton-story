// Game State
let gameState = {
    currentScene: 'scene1',
    choices: {
        scene1: null,  // 'discussion' or 'skip'
        scene2: null   // 'speak' or 'silent' / 'family' or 'silent'
    },
    path: []
};

const STORAGE_KEY = 'reacton_story_state_v1';

function saveGameState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
        // ignore storage failures (private mode, quota, etc.)
    }
}

function loadGameState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.currentScene === 'string') {
            gameState = {
                currentScene: parsed.currentScene,
                choices: parsed.choices || { scene1: null, scene2: null },
                path: Array.isArray(parsed.path) ? parsed.path : []
            };
        }
    } catch (e) {
        // ignore parse/storage failures
    }
}

// Story Scenes
const scenes = {
    scene1: {
        title: '🏔️ SCENE 1: "The Ice is Different Now"',
        narrative: [
            "Your name is Maya. You're 16 years old, growing up in Juneau, Alaska.",
            '',
            "This morning, you're looking at old family photos. One shows your mom standing",
            'at Mendenhall Glacier when she was your age. The glacier reaches all the way to',
            'the valley.',
            '',
            "In today's photo, the same glacier is half the size. Just a white smudge on the mountain.",
            '',
            'Your little brother asks: "Why is the ice melting so fast?"',
            '',
            "You realize you don't have a good answer. But you know something has changed.",
            '',
            'That night, your school is hosting a climate change discussion. Do you go?'
        ].join('\n'),
        motif: '📍 Motif Reference: Melting glacier as lost stability',
        choices: [
            {
                label: 'Option A: Attend the school discussion',
                description: 'Learn more and hear what others think',
                next: 'scene2a_bridge',
                choice: 'discussion'
            },
            {
                label: 'Option B: Skip it and stay home',
                description: 'Avoid the topic because it feels overwhelming',
                next: 'scene2b_bridge',
                choice: 'skip'
            }
        ]
    },

    // Fortellende overgang (uten valg) → auto videre
    scene2a_bridge: {
        title: '❄️ Transition: "Cold Air, Warm Questions"',
        narrative: [
            'Outside the auditorium, the night air feels sharper than usual.',
            'You pull your jacket tighter and stare at the dark outline of the mountains.',
            '',
            "The ice doesn't speak—but it changes. And somehow, that feels like a message.",
            '',
            'You take one breath. Then another.'
        ].join('\n'),
        motif: '📍 Motif Reference: Melting ice—quiet pressure before a choice',
        next: 'scene2a',
        autoAdvanceMs: 2600
    },

    scene2a: {
        title: '🎓 SCENE 2A: "At the School Discussion"',
        narrative: [
            'The auditorium is packed. A climate scientist from the university shows data about',
            'Alaska. Sea ice is thinner. Seasons are changing. Temperature records keep breaking.',
            '',
            '"These changes affect everything," she says. "Fishing patterns, wildlife, communities."',
            '',
            'Your best friend Dave leans over and whispers: "This is depressing. Why is she telling us',
            'this? There\'s nothing we can do anyway."',
            '',
            'You understand his feeling. But the scientist also talks about solutions: renewable energy,',
            'community action, individual choices that add up.',
            '',
            'When the discussion ends, people are talking. Some seem scared. Some seem determined.',
            '',
            "A classmate approaches: \"I'm starting a climate club at school. Want to help?\"",
            '',
            'Do you speak up and get involved, or stay quiet?'
        ].join('\n'),
        motif: '📍 Motif Reference: Melting ice as a metaphor for things you can no longer ignore',
        choices: [
            {
                label: 'Option A: Speak up and join the climate club',
                description: 'Get involved despite fear, become an advocate',
                next: 'scene3a',
                choice: 'speak'
            },
            {
                label: 'Option B: Stay silent and go with the crowd',
                description: 'Keep quiet because it feels easier',
                next: 'scene3b',
                choice: 'silent'
            }
        ]
    },

    // Fortellende overgang (uten valg) → auto videre
    scene2b_bridge: {
        title: '🌧️ Transition: "Rain in December"',
        narrative: [
            'You stay home. The window shows streetlights smeared by rain.',
            '',
            'Your phone buzzes with messages about the discussion you missed.',
            "You don't answer. Not yet.",
            '',
            'Some thoughts are like thin ice: you can ignore them, but they still crack underneath.'
        ].join('\n'),
        motif: '📍 Motif Reference: Melting ice—avoidance that still moves forward',
        next: 'scene2b',
        autoAdvanceMs: 2600
    },

    scene2b: {
        title: '🏠 SCENE 2B: "Avoiding the Conversation"',
        narrative: [
            'You skip the discussion. That night at dinner, your mom mentions she read that',
            "Alaska's winters are 3 degrees warmer than they were 30 years ago.",
            '',
            '"It doesn\'t feel that different to me," Dave says when you text him later.',
            '',
            'But it does. You remember your elementary school photos from winter break—snow piled',
            'up in December. This year, December was mostly rain.',
            '',
            "Your little brother's favorite activity is glacier hiking. But guidebooks say some",
            "popular trails won't even exist in 10 years. He doesn't know that yet.",
            '',
            'You could tell him. You could talk to your family about it. You could ask what you',
            'can do as a household. But that feels like picking a fight.',
            '',
            'Your mom comes home from work looking tired. Your dad is stressed about the fishing',
            'industry changing. Do you bring up climate change, or keep the peace?'
        ].join('\n'),
        motif: '📍 Motif Reference: Melting ice surfaces in daily life—someone must acknowledge it',
        choices: [
            {
                label: 'Option A: Start a family conversation',
                description: 'Help them understand and discuss solutions together',
                next: 'scene3a',
                choice: 'family'
            },
            {
                label: 'Option B: Say nothing and let it go',
                description: 'Keep life normal and avoid difficult emotions',
                next: 'scene3b',
                choice: 'silent'
            }
        ]
    },

    scene3a: {
        title: '⚡ SCENE 3: "Your Path Forward" - The Activist Path',
        narrative: [
            "Three months have passed. You've been meeting with the climate club twice a week.",
            "You've organized a fossil fuel divestment petition. You've talked to your family about",
            'reducing waste.',
            '',
            'Your mom started composting. Your dad is interested in switching his truck.',
            '',
            "But you're also feeling the weight of it. Sometimes you feel like you can't do enough.",
            "Your friends think you're too serious now. You're tired.",
            '',
            "You stand on a bridge overlooking the glacier. It's smaller again this spring.",
            '',
            'Will you keep pushing for bigger change, even when it feels impossible, or find balance',
            'between action and taking care of yourself?'
        ].join('\n'),
        motif: "📍 Motif Reference: Melting ice—a constant reminder of what's at stake",
        choices: [
            {
                label: 'Option A: Keep pushing for bigger change',
                description: 'Commit to building a sustainable future',
                next: 'ending_awakened',
                choice: 'responsibility'
            },
            {
                label: 'Option B: Find balance and take care of yourself',
                description: 'Accept change and focus on self-care',
                next: 'ending_balanced',
                choice: 'balance'
            }
        ]
    },

    scene3b: {
        title: '⚡ SCENE 3: "Your Path Forward" - The Wake-Up Call',
        narrative: [
            "Six months have passed. You didn't join the climate club. But you did talk to your",
            'family about what you learned online.',
            '',
            'Your dad cut back on driving. Your mom packed away some single-use plastics.',
            '',
            "It doesn't feel like much. But something shifted. You realized that staying ignorant",
            "won't make the problem go away. It will just make you unprepared.",
            '',
            "You're looking at colleges now. Some have strong environmental programs.",
            '',
            'Will you choose convenience and comfort despite knowing the costs, or take responsibility',
            'for being part of solutions?'
        ].join('\n'),
        motif: '📍 Motif Reference: Melting ice as a call to action that you\'re learning to answer',
        choices: [
            {
                label: 'Option A: Take responsibility and pursue action',
                description: 'Commit to building a sustainable future',
                next: 'ending_balanced',
                choice: 'responsibility'
            },
            {
                label: 'Option B: Choose convenience and personal comfort',
                description: 'Accept change as inevitable and focus on your own life',
                next: 'ending_comfortable',
                choice: 'convenience'
            }
        ]
    },

    ending_awakened: {
        title: '✨ THE AWAKENED PATH',
        ending: true,
        narrative: [
            "Ten years later, you're 26 years old. You studied environmental science in college.",
            "You're now an intern at a research center in Alaska, studying glacier dynamics.",
            '',
            "The melting hasn't stopped. Some glaciers will be gone in your lifetime. But you've",
            'learned something important: knowing the problem and choosing action, even imperfectly,',
            'is better than denial.',
            '',
            'Your family has changed too. Your brother is in high school and writes about climate',
            'policy for the school newspaper—inspired by your choices.',
            '',
            "You stand at Mendenhall Glacier again. It's smaller than the photos. But you're not",
            "empty. You're part of a generation that's actually doing something about it.",
            '',
            'The ice is still melting. But so is apathy.',
            '',
            'YOU CHOSE TO BE PART OF THE SOLUTION.'
        ].join('\n'),
        label: 'THE END - A FUTURE OF ENGAGEMENT',
        motif: '📍 Motif Reference: Final image of melting ice, paired with human action and adaptation'
    },

    ending_comfortable: {
        title: '❌ THE COMFORTABLE PATH',
        ending: true,
        narrative: [
            "Ten years later, you're 26 years old. You chose a different path.",
            '',
            "You didn't study environmental science. You got a degree you enjoyed and landed a",
            "good job. Life is comfortable. You have nice things. You don't think too much about",
            'the melting glaciers.',
            '',
            "But the world outside has changed in ways you can't ignore. Seasons are chaotic.",
            "Fires are bigger. Weather is more extreme. Your little brother can't glacier hike",
            'anymore—those trails are gone.',
            '',
            'You think sometimes about that school discussion you skipped. About the climate club',
            "you didn't join. About the conversations you avoided at home.",
            '',
            "You tell yourself there's nothing you could have done anyway. That one person doesn't",
            'matter.',
            '',
            "But you know that's not entirely true."
        ].join('\n'),
        label: 'THE END - A FUTURE OF CONSEQUENCE',
        motif: '📍 Motif Reference: Melting ice—a reality you can no longer avoid, even through avoidance'
    },

    ending_balanced: {
        title: '🌱 THE BALANCED PATH',
        ending: true,
        narrative: [
            "Ten years later, you're 26 years old. You didn't become a climate activist. You didn't",
            'completely ignore the problem.',
            '',
            'You found balance. You work in environmental education. You help teach kids about',
            "climate change in your hometown. You've made changes to your own life—more sustainable",
            'choices, less waste, conversations with people you care about.',
            '',
            "It's not revolutionary. But it's real.",
            '',
            'The glacier is still smaller. Alaska is still changing. But your community is adapting.',
            'Your family talks about climate change now. Your influence as a young person mattered',
            'in small ways that ripple outward.',
            '',
            'You realize: Individual choices matter. But they also need to be part of larger',
            "systemic change. You're learning how to hold both realities.",
            '',
            'The ice is melting. But so are the barriers to action.'
        ].join('\n'),
        label: 'THE END - A FUTURE OF SMALL COURAGE',
        motif: '📍 Motif Reference: Melting ice—a call to action that you\'re learning to answer'
    }
};

// Keyboard navigation state
let currentChoiceIndex = 0;
let autoAdvanceTimer = null;

// Render Function
function renderScene(sceneKey) {
    const storyContainer = document.getElementById('story-container');
    const scene = scenes[sceneKey];

    if (!scene) {
        console.error(`Scene ${sceneKey} not found`);
        return;
    }

    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }

    let html = '<div class="scene">';

    if (scene.ending) {
        html += `
            <div class="ending">
                <h2 class="ending-title">${scene.title}</h2>
                <div class="ending-content">
                    ${scene.narrative.split('\n\n').map(p => `<p>${p}</p>`).join('')}
                </div>
                <div class="ending-label">${scene.label}</div>
                <p style="text-align: center; color: #667eea; margin-top: 15px; font-style: italic;">${scene.motif}</p>
            </div>
        `;
    } else {
        html += `
            <h2 class="scene-title">${scene.title}</h2>
            <div class="motif-note">${scene.motif}</div>
            <div class="narrative">
                ${scene.narrative.split('\n').map(line => line.trim()).filter(l => l).join('<br><br>')}
            </div>
        `;

        if (Array.isArray(scene.choices) && scene.choices.length > 0) {
            html += `<div class="choices">`;
            scene.choices.forEach((choice) => {
                html += `
                    <button class="choice-btn" data-next="${choice.next}" data-choice="${choice.choice}">
                        <span class="choice-label">${choice.label}</span>
                        <span class="choice-description">${choice.description}</span>
                    </button>
                `;
            });
            html += `</div>`;
        } else {
            html += `
                <div class="choices">
                    <button class="choice-btn" data-next="${scene.next || ''}" data-choice="auto">
                        <span class="choice-label">Continue</span>
                        <span class="choice-description">Press Enter / Space (or wait)</span>
                    </button>
                </div>
            `;
        }

    }

    html += '</div>';

    if (scene.ending) {
        html += `
            <button class="restart-btn">🔄 Start Over</button>
        `;
    }

    // Fade transition (CSS controls the animation)
    storyContainer.classList.add('is-fading');
    setTimeout(() => {
        storyContainer.innerHTML = html;
        storyContainer.classList.remove('is-fading');

        // Wire buttons with addEventListener (no inline onclick)
        const restartBtn = storyContainer.querySelector('.restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => restartStory());
        }

        const choiceButtons = storyContainer.querySelectorAll('.choice-btn');
        choiceButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const next = btn.getAttribute('data-next') || '';
                const choice = btn.getAttribute('data-choice') || '';
                if (next) makeChoice(next, choice);
            });
        });

        // Setup focus on first choice button for keyboard navigation
        if (choiceButtons.length > 0) {
            currentChoiceIndex = 0;
            choiceButtons[0].focus();
        }

        // Auto-advance fortellende scener
        if (!scene.ending && (!scene.choices || scene.choices.length === 0) && scene.next && scene.autoAdvanceMs) {
            autoAdvanceTimer = setTimeout(() => {
                makeChoice(scene.next, 'auto');
            }, scene.autoAdvanceMs);
        }

        window.scrollTo(0, 0);
    }, 140);
}

// Choice Handler
function makeChoice(nextScene, choice) {
    gameState.currentScene = nextScene;
    gameState.path.push(choice);

    // Determine which choice was made based on scene
    if (nextScene === 'scene2a' || nextScene === 'scene2b') {
        gameState.choices.scene1 = choice;
    } else if (nextScene === 'scene3a' || nextScene === 'scene3b' || nextScene.includes('ending')) {
        gameState.choices.scene2 = choice;
    }

    saveGameState();
    renderScene(nextScene);
}

// Restart Function
function restartStory() {
    gameState = {
        currentScene: 'scene1',
        choices: {
            scene1: null,
            scene2: null
        },
        path: []
    };
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        // ignore
    }
    renderScene('scene1');
}

// Global keyboard navigation
window.addEventListener('keydown', (event) => {
    const storyContainer = document.getElementById('story-container');
    if (!storyContainer) return;

    const choiceButtons = storyContainer.querySelectorAll('.choice-btn');

    // If we are on an ending screen (no choices), allow keyboard to trigger restart
    if (choiceButtons.length === 0) {
        const restartBtn = storyContainer.querySelector('.restart-btn');
        if (
            restartBtn &&
            (event.key === 'Enter' ||
                event.key === ' ' ||
                event.key === 'ArrowRight' ||
                event.key === 'ArrowDown')
        ) {
            event.preventDefault();
            restartBtn.click();
        }
        return;
    }

    // Interactive scene with choices
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        currentChoiceIndex = (currentChoiceIndex + 1) % choiceButtons.length;
        choiceButtons[currentChoiceIndex].focus();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        currentChoiceIndex =
            (currentChoiceIndex - 1 + choiceButtons.length) % choiceButtons.length;
        choiceButtons[currentChoiceIndex].focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (choiceButtons[currentChoiceIndex]) {
            choiceButtons[currentChoiceIndex].click();
        }
    }
});

// Initialize Story (run immediately after script loads)
try {
    loadGameState();
    const startScene = scenes[gameState.currentScene] ? gameState.currentScene : 'scene1';
    renderScene(startScene);
} catch (error) {
    console.error('Error initializing story:', error);
    const storyContainer = document.getElementById('story-container');
    if (storyContainer) {
        storyContainer.innerHTML = `
            <div class="narrative">
                <p>Something went wrong while loading the story.</p>
                <p>Please refresh the page. If the problem continues, check the browser console for details.</p>
            </div>
        `;
    }
}
