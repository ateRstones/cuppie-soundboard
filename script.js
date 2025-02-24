window.onload = function() {
    load();
    resize();
}

window.onresize = function() {
    resize();
}

let items = [
    "broccoli1",
    "broccoli2",
    "buried",
    "butt",
    "correction-united-states",
    "cream",
    "dangerous",
    "day69-4-20",
    "dinosaur",
    "disgust",
    "do-it",
    "hide",
    "huh",
    "im-not",
    "just-cuppie",
    "kettle",
    "lies",
    "most-famous",
    "multiply",
    "naked",
    "noises1",
    "noises2",
    "noises3",
    "oldge",
    "people",
    "pickle",
    "pieeck",
    "play",
    "scarry",
    "scream-no",
    "talk",
    "tasty",
    "weirdo",
    "what",
    "wisdom",
    "wtf",
]

let bingoDiv;
let clickMap = [];
let data = [[0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,], [0, 0, 0, 0, 0, 0,]];
let audioPlayers = [];

function load() {
    bingoDiv = document.getElementById("cuppie");
    for(let x = 0; x < items.length; x++) {
        let player = new Audio("audio/" + items[x] + ".ogg");
        player.addEventListener('ended', function() {
            for(let x = 0; x < data.length; x++) {
                for(let y = 0; y < data[x].length; y++) {
                    data[x][y].clicked = false;
                }
            }
            updateColors();
        });
        audioPlayers.push(player);
    }

    for(let y = 0; y < 6; y++) {
        for(let x = 0; x < 6; x++) {
            let item = items[x + y * 6];
            let s = new State(x, y, false);
            clickMap[item] = s;
            data[x][y] = s;

            appendBingo(genEntry(item));
        }
    }

    for(e of document.getElementsByClassName("text-holder")) {
        e.onclick = onClick;
    }
}

function genEntry(content) {
    return "<div class='field border'>" + 
                "<div class='text-wrapper'>" +
                    "<div class='text-holder text-form noselect'>" + 
                    content +
            "</div></div></div>";
}

function appendBingo(str) {
    bingoDiv.innerHTML += str;
}

function updateColors() {

    for(e of document.getElementsByClassName("text-holder")) {
        let elem = clickMap[e.innerHTML];
        if(elem.clicked) {
            e.style.backgroundColor = "#094771";
        } else {
            e.style.backgroundColor = "transparent";
        }
    }
}

function resize() {
    let sizeRef = Math.min(bingoDiv.parentElement.clientHeight - 20, bingoDiv.parentElement.clientWidth);

    let sizeItem = ((sizeRef - 3) / 6) - 2.5 - 1.5;
    let fontSize = sizeItem * 0.15;

    for(e of document.getElementsByClassName("field")) {
        e.style.width = sizeItem + "px";
        e.style.height = sizeItem + "px";
        e.style.fontSize = fontSize + "px";
    }

    bingoDiv.style.width = sizeRef + "px";
    bingoDiv.style.height = (sizeRef+8) + "px";
    
}

function onClick(e) {
    let s = clickMap[e.currentTarget.innerHTML];
    s.clicked = !s.clicked;
    data[s.x][s.y] = s;

    for(let x = 0; x < data.length; x++) {
        for(let y = 0; y < data[x].length; y++) {
            if (x === s.x && y === s.y) {
                continue;
            }
            data[x][y].clicked = false;
        }
    }

    updateColors();
    playAudio();
}

function playAudio() {
    for(let x = 0; x < data.length; x++) {
        for(let y = 0; y < data[x].length; y++) {
            let player = audioPlayers[x + y * 6];
            if (data[x][y].clicked) {
                player.play();
            } else {
                player.pause();
                player.currentTime = 0;
            }
        }
    }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function State(x, y, clicked) {
    this.x = x;
    this.y = y;
    this.clicked = clicked;
}