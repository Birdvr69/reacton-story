// Story data
var storyData = {
    currentScene: 'scene1',
    choices: {
        scene1: null,
        scene2: null
    },
    path: []
};

const SAVE_KEY = 'story_save';

function saveProgress() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(storyData));
}

function loadProgress() {
    var saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
        storyData = JSON.parse(saved);
    }
}

// Story scenes
var scenes = {
    scene1: {
        title: 'SCENE 1: "The Ice is Different Now"',
        narrative: "Your name is Maya. You're 16 years old, growing up in Juneau, Alaska.\n\nThis morning, you're looking at old family photos. One shows your mom standing at Mendenhall Glacier when she was your age. The glacier reaches all the way to the valley.\n\nIn today's photo, the same glacier is half the size. Just a white smudge on the mountain.\n\nYour little brother asks: 'Why is the ice melting so fast?'\n\nYou realize you don't have a good answer. But you know something has changed.\n\nThat night, your school is hosting a climate change discussion. Do you go?",
        choices: [
            { label: 'Attend the discussion', next: 'scene2a', choice: 'discussion' },
            { label: 'Skip it and stay home', next: 'scene2b', choice: 'skip' }
        ]
    },

    scene2a: {
        title: 'SCENE 2A: "At the School Discussion"',
        narrative: "The auditorium is packed. A climate scientist shows data about Alaska. Sea ice is thinner. Seasons are changing.\n\n'These changes affect everything,' she says. 'Fishing, wildlife, communities.'\n\nYour friend Dave whispers: 'This is depressing. Why bother?'\n\nBut she talks about solutions: renewable energy, community action.\n\nA classmate asks: 'Want to join the climate club?'\n\nDo you speak up or stay quiet?",
        choices: [
            { label: 'Speak up and join', next: 'scene3a', choice: 'speak' },
            { label: 'Stay silent', next: 'scene3b', choice: 'silent' }
        ]
    },

    scene2b: {
        title: 'SCENE 2B: "Avoiding the Conversation"',
        narrative: "You skip the discussion. At dinner, your mom says Alaska's winters are 3 degrees warmer.\n\n'It doesn't feel different to me,' Dave texts.\n\nBut it does. You remember snow in December. Now it's rain.\n\nYour brother's favorite hiking trails might disappear in 10 years.\n\nYou could talk to your family about it. But it feels like a fight.\n\nDo you bring it up or keep the peace?",
        choices: [
            { label: 'Start a family conversation', next: 'scene3a', choice: 'family' },
            { label: 'Say nothing', next: 'scene3b', choice: 'silent' }
        ]
    },

    scene3a: {
        title: 'SCENE 3: "Your Path Forward"',
        narrative: "Three months later. You've joined the climate club. Organized petitions. Talked to your family.\n\nYour mom composts now. Dad thinks about a new truck.\n\nBut it's heavy. You feel like you can't do enough. Friends think you're too serious.\n\nYou stand by the glacier. It's smaller again.\n\nWill you keep pushing or find balance?",
        choices: [
            { label: 'Keep pushing for change', next: 'ending_awakened', choice: 'responsibility' },
            { label: 'Find balance', next: 'ending_balanced', choice: 'balance' }
        ]
    },

    scene3b: {
        title: 'SCENE 3: "The Wake-Up Call"',
        narrative: "Six months later. You didn't join the club, but talked to your family online.\n\nDad drives less. Mom uses fewer plastics.\n\nIt doesn't feel like much. But something changed. You realize ignoring it won't help.\n\nYou're looking at colleges with environmental programs.\n\nWill you take responsibility or choose convenience?",
        choices: [
            { label: 'Take responsibility', next: 'ending_balanced', choice: 'responsibility' },
            { label: 'Choose convenience', next: 'ending_comfortable', choice: 'convenience' }
        ]
    },

    ending_awakened: {
        title: 'THE AWAKENED PATH',
        ending: true,
        narrative: "Ten years later, you're 26. You studied environmental science. Now an intern studying glaciers.\n\nThe melting hasn't stopped. But you learned action is better than denial.\n\nYour family changed too. Your brother writes about climate policy.\n\nYou stand at the glacier again. Smaller, but you're not empty. Your generation is doing something.\n\nThe ice melts, but so does apathy.\n\nYOU CHOSE TO BE PART OF THE SOLUTION.",
        label: 'THE END - A FUTURE OF ENGAGEMENT'
    },

    ending_comfortable: {
        title: 'THE COMFORTABLE PATH',
        ending: true,
        narrative: "Ten years later, you're 26. You chose a different path.\n\nDidn't study environmental science. Got a good job. Life is comfortable.\n\nBut the world changed. Seasons chaotic. Fires bigger. Weather extreme. Brother can't hike anymore.\n\nYou think about the discussion you skipped, the club you didn't join.\n\nYou tell yourself one person doesn't matter.\n\nBut you know that's not entirely true.",
        label: 'THE END - A FUTURE OF CONSEQUENCE'
    },

    ending_balanced: {
        title: 'THE BALANCED PATH',
        ending: true,
        narrative: "Ten years later, you're 26. You didn't become an activist, but didn't ignore the problem.\n\nYou work in environmental education. Teach kids about climate change.\n\nMade sustainable choices. Talked to people about it.\n\nNot revolutionary, but real.\n\nGlacier smaller, but community adapting. Your influence mattered in small ways.\n\nIndividual choices matter, but need bigger change too.\n\nIce melts, but so do barriers to action.",
        label: 'THE END - A FUTURE OF SMALL COURAGE'
    }
};


function renderScene(sceneKey) {
    var container = document.getElementById('story-container');
    var scene = scenes[sceneKey];

    if (!scene) {
        console.log('Scene not found: ' + sceneKey);
        return;
    }

    var html = '<div class="scene">';

    if (scene.ending) {
        html += '<h2 class="ending-title">' + scene.title + '</h2>';
        html += '<div class="ending-content"><p>' + scene.narrative.replace(/\n\n/g, '</p><p>') + '</p></div>';
        html += '<div class="ending-label">' + scene.label + '</div>';
        html += '<button class="restart-btn" onclick="restartStory()">Start Over</button>';
    } else {
        html += '<h2 class="scene-title">' + scene.title + '</h2>';
        html += '<div class="narrative"><p>' + scene.narrative.replace(/\n\n/g, '</p><p>') + '</p></div>';
        html += '<div class="choices">';
        for (var i = 0; i < scene.choices.length; i++) {
            var choice = scene.choices[i];
            html += '<button class="choice-btn" onclick="makeChoice(\'' + choice.next + '\', \'' + choice.choice + '\')">' + choice.label + '</button>';
        }
        html += '</div>';
    }

    html += '</div>';

    container.innerHTML = html;
    window.scrollTo(0, 0);
}


function makeChoice(nextScene, choice) {
    storyData.currentScene = nextScene;
    storyData.path.push(choice);

    if (nextScene === 'scene2a' || nextScene === 'scene2b') {
        storyData.choices.scene1 = choice;
    } else if (nextScene.includes('scene3') || nextScene.includes('ending')) {
        storyData.choices.scene2 = choice;
    }

    saveProgress();
    renderScene(nextScene);
}


function restartStory() {
    storyData = {
        currentScene: 'scene1',
        choices: { scene1: null, scene2: null },
        path: []
    };
    localStorage.removeItem(SAVE_KEY);
    renderScene('scene1');
}


loadProgress();
var startScene = scenes[storyData.currentScene] ? storyData.currentScene : 'scene1';
renderScene(startScene);