const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
let straight = 0;
let confirm = false;

const scoreboard = {
    cnt: 0,
    player: 0,
    computer: 0
}

// Play game
function play(e){
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice.selection);
    showWinner(winner, computerChoice.selection, computerChoice.probability);
}

// Get computers choice
function getComputerChoice(){
    let object = {selection:0, probability:0}
    const rand = Math.random();
    if(rand < 0.34){
        object.selection = 'rock';
        object.probability = rand;
        return object;
    }else if(rand < 0.67){
        object.selection = 'scissors';
        object.probability = rand;
        return object;
    }else{
        object.selection = 'paper';
        object.probability = rand;
        return object;
    }
}

// get game winner
function getWinner(p, c){
    if(p === c){
        return 'draw';
    }else if(p === 'rock'){
        if(c === 'paper'){
            return 'computer';
        }else{
            return 'player';
        }
    }else if(p === 'paper'){
        if(c === 'scissors'){
            return 'computer'
        }else{
            return 'player';
        }
    }else if(p === 'scissors'){
        if(c === 'rock'){
            return 'computer';
        }else{
            return 'player';
        }
    }
}

function showWinner(winner, computerChoice, probability){
    if(winner === 'player'){
        // Inc player score
        scoreboard.player++;
        // Show modal result
        result.innerHTML = `
        <h1 class="text-win">You Win</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() 
            + computerChoice.slice(1)
        }</strong></p>
        `;
        confirm = true;
    }else if(winner === 'computer'){
        // Inc computer score
        scoreboard.computer++;
        // Show modal result
        result.innerHTML = `
        <h1 class="text-lose">You Lose</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() 
            + computerChoice.slice(1)}</strong></p>
        `;
        confirm = false;
    }else{
        // Show modal result
        result.innerHTML = `
        <h1 class="text-draw">It's Draw</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() 
            + computerChoice.slice(1)}</strong></p>
        `;
        confirm = 'draw';
    }

    if(confirm === true){
        if(confirm !== 'draw'){
            straight++;
        }
    }else{
        straight = 0;
    }

    if(straight === 2){
        two.innerHTML = `
        <div class="two">
        <div class="pic">
            <i class="fas fa-star"></i>
        </div>
        <div>
            <p> Complete!</p>
        </div>
        </div>`
        two.sytle.color = 'codetblue';
    }else if(straight === 3){
        three.outerHTML = `
        <div class="three">
        <div class="pic">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </div>
        <div>
            <p> Complete!</p>
        </div>
        </div>`
        three.style.color = 'cyan';
    }else if(straight === 4){
        four.outerHTML = `
        <div class="four">
        <div class="pic">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </div>
        <div>
            <p> Complete!</p>
        </div>
        </div>`
    }else if(straight === 5){
        five.outerHTML = `
        <div class="five">
        <div class="pic">
            <i class="fas fa-medal"></i>
        </div>
        <div>
            <p> Complete!</p>
        </div>
        </div>`
    }else if(straight === 6){
        six.outerHTML = `
        <div class="six">
        <div class="pic">
            <i class="fas fa-crown"></i>
        </div>
        <div>
            <p> Complete!</p>
        </div>
        </div>`
    }

    if(winner !== 'draw'){
        scoreboard.cnt++;
    }
    let theNumberOfgamePlayed = scoreboard.cnt;
    let proCom;
    let proPla;
    if(theNumberOfgamePlayed === 0){
        proCom = 0;
        proPla = 0;
    }else{
        proCom = (scoreboard.computer/theNumberOfgamePlayed);
        proPla = (scoreboard.player/theNumberOfgamePlayed);
    }
    // Show score
    score.innerHTML = `
        <div class="left-side">
            <p>Player : ${scoreboard.player}</p>
            <p>${(proPla*100).toFixed(0)}%</p>
        </div>
        <i class="fab fa-angellist fa-3x"></i>
        <div class="right-side">
            <p>Computer : ${scoreboard.computer}</p>
            <p>${(proCom*100).toFixed(0)}%</p>
        </div>
        `;

    modal.style.display = 'block';
}
function clearModal(e){
    if(e.target === modal){
        modal.style.display = 'none';
    }
}

function restartGame(){
    scoreboard.cnt = 0;
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <div class="left-side">
        <p>Player : 0</p>
        <p>0%</p>
    </div>
    <i class="fab fa-angellist fa-3x"></i>
    <div class="right-side">
        <p>Computer : 0</p>
        <p>0%</p>
    </div>
    `;
    restart.style.display = 'none';
}
// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
