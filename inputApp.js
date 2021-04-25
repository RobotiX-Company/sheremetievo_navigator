window.terminal = 'b';
window.xPercent = (window.terminals[window.terminal].NW.x - window.terminals[window.terminal].SE.x) / 100;
window.yPercent = (window.terminals[window.terminal].SE.y - window.terminals[window.terminal].NW.y) / 100;
setTerminalProperties();

function getLocationOnFloor() {
    navigator.geolocation.getCurrentPosition((loc) => {
        setUserPoint(loc.coords.latitude, loc.coords.longitude);
    }, (err) => {
        console.log(err);
        alert('Ошибка определения местоположения (1)')
    });
    navigator.geolocation.watchPosition(changeGeolocation, (err) => {
        console.log(err);
        alert('Ошибка определения местоположения (2)')
    })
}

function changeGeolocation(newGeo) {
    setUserPoint((newGeo.coords.longitude - window.terminals[window.terminal].NW.x) / window.xPercent, (newGeo.coords.latitude - window.terminals[window.terminal].NW.y))
}

function setUserPoint(x, y) {
    let iAmHere = document.getElementsByClassName('i_am_here')[0];
    let top = y*mapB1.clientHeight/100;
    let left = x*mapB1.clientWidth/100;
    iAmHere.style.top = top-50+'px';
    iAmHere.style.left = left-25+'px';
    let intro = document.getElementsByClassName('intro-div')[0];
    intro.style.left = document.documentElement.clientWidth/2 - left + 'px';
    intro.style.top = document.documentElement.clientHeight/2 - top + 'px';
}

function showMe() {
    let iAmHere = document.getElementsByClassName('i_am_here')[0];
    let top = Number(iAmHere.style.top.split('px')[0])+50;
    let left = Number(iAmHere.style.left.split('px')[0])+25;
    let intro = document.getElementsByClassName('intro-div')[0];
    intro.style.left = document.documentElement.clientWidth/2 - left + 'px';
    intro.style.top = document.documentElement.clientHeight/2 - top + 'px';
    document.getElementById('hamburger').click();
}

function setTerminalProperties() {
    window.xPercent = (window.terminals[window.terminal].NW.x - window.terminals[window.terminal].SE.x) / 100;
    window.yPercent = (window.terminals[window.terminal].SE.y - window.terminals[window.terminal].NW.y) / 100;
}

let mapB1 = document.getElementsByClassName('intro-div')[0];
window.addEventListener('click', clickHandler);
window.addEventListener('mousedown', dragStart);
window.addEventListener('touchstart', dragStart);

function dragStart(e) {
    window.cursorPoint = {x: e.clientX  || e.targetTouches[0].clientX, y: e.clientY  || e.targetTouches[0].clientY};
    window.onmousemove = onDrag;
    window.onmouseup = dragEnd;
    window.ontouchmove = onDrag;
    window.onmtouchend = dragEnd;
}

function onDrag(e) {
    let cursorX = e.clientX || e.targetTouches[0].clientX;
    let cursorY = e.clientY || e.targetTouches[0].clientY;
    let intro = document.getElementsByClassName('intro-div')[0];
    intro.style.top = Number(intro.style.top.split('px')[0]) + cursorY - window.cursorPoint.y + 'px';
    intro.style.left = Number(intro.style.left.split('px')[0]) + cursorX - window.cursorPoint.x + 'px';
    window.cursorPoint = {x: cursorX, y: cursorY}
}

function dragEnd() {
    window.onmousemove = null;
    window.onmouseup = null;
    window.ontouchmove = null;
    window.ontouchend = null;
}

function clickHandler(e) {
    console.log(`Click on intro-div`);
}

function renderPath() {
    let path = createPath('vxod_3', '_36_6');
    path = ['vxod_1', 'perekrestok_1', 'perekrestok_10', 'perekrestok_5', 'perekrestok_21', 'lift_1']
    let example = document.getElementById("canvas"),
    ctx = example.getContext('2d');
    ctx.clearRect(0, 0, example.width, example.height);
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(window.points[path[0]].x/128*mapB1.clientWidth/100, window.points[path[0]].y/128*mapB1.clientHeight/100);
    console.log(window.points[path[0]].x/128*mapB1.clientWidth/100, window.points[path[0]].y/128*mapB1.clientHeight/100);
    console.log(window.points[path[1]].x/128*mapB1.clientWidth/100, window.points[path[1]].y/128*mapB1.clientHeight/100);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(window.points[path[i]].x/128*mapB1.clientWidth/100, window.points[path[i]].y/128*mapB1.clientHeight/100);
    }
    ctx.stroke();
}

function createPath(from, to) {
    let path = [from];
    if (window.points[from].points.indexOf(to) != -1) {
        path.push(to);
        return path;
    }
    for (let i = 0; i < window.points[from].points.length; i++) {
        if (window.points[window.points[from].points[i]].points.indexOf(to)) {
            path.push(window.points[from].points[i]);
            path.push(to);
            return path;
        }
    }
}

let tags = document.getElementsByClassName('close');
for (let i = 0; i < tags.length; i++) {
    tags[i].addEventListener('click', closeHint)
}
tags = document.getElementsByClassName('close-form');
for (let i = 0; i < tags.length; i++) {
    tags[i].addEventListener('click', closeForm)
}
document.getElementById('wantToRaise').addEventListener('click', wantToRaiseClick);

function closeHint(e) {
    e.target.parentNode.classList.add('ytka');
}

function closeForm() {
    document.getElementById('raise-form').classList.add('ytka');
}

function wantToRaiseClick(e) {
    closeHint(e);
    document.getElementById('raise').classList.remove('ytka');
}

async function getRaise() {
    let raiseNumber = document.getElementsByClassName('inputRaise')[0].value;
    let raiseInfo = await fetch('https://api.rasp.yandex.net/v3/thread/?apikey=95ef3ec7-9b70-4118-8ccb-0abce7bc52e3&uid=' + raiseNumber);
    raiseInfo = raiseInfo
}

function goHome() {
    closeForm();
    document.getElementById('cafeOrShop').classList.remove('ytka');
}


// For changing of geolocation write in the console 'setUserPoint(x, y)' x - coordinate x (percents),  y - coordinate y (percents)








/*

window.problem = {};
createProblem();

function createProblem() {
    let pointsNames = Object.keys(window.points);
    for (let i = 0; i < pointsNames.length; i++) {
        window.problem[pointsNames[i]] = {};
        for (let j = 0; j < window.points[pointsNames[i]].points.length; j++) {
            window.problem[pointsNames[i]][window.points[pointsNames[i]].points[j]] = Math.sqrt((Math.abs(window.points[window.points[pointsNames[i]].points[j]].x) - Math.abs(window.points[pointsNames[i]].x))**2 + (Math.abs(window.points[window.points[pointsNames[i]].points[j]].y) - Math.abs(window.points[pointsNames[i]].y))**2);
        }
    }
    console.log(window.problem);
}
window.problem.start = window.problem.vxod_1;
window.problem.finish = window.problem.medpunkt;

const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph) => {

    // track lowest cost to reach each node
    const costs = Object.assign({finish: Infinity}, graph.start);

    // track paths
    const parents = {finish: null};
    for (let child in graph.start) {
        parents[child] = 'start';
    }

    // track nodes that have already been processed
    const processed = [];

    let node = lowestCostNode(costs, processed);

    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            let newCost = cost + children[n];
            if (!costs[n]) {
                costs[n] = newCost;
                parents[n] = node;
            }
            if (costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }

    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
        distance: costs.finish,
        path: optimalPath
    };

    return results;
};

console.log(dijkstra(window.problem));
*/

