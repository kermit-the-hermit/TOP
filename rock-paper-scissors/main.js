
/* Declaration */

let score = {"p1": 0, "p2": 0};
let round = 0;
let gameOn = 1;

function getComputerInput () {
    options = ['Rock', 'Paper', 'Scissors'];
    opt_num = Math.floor(Math.random() * 3);
    return options[opt_num];
}

function getScore (p1, p2) {
    
    /* Draw */
    if (p1 == p2) {
        return 0;
    }

    return (p1=='Paper' && p2=='Rock') || (p1=='Rock' && p2=='Scissors') || (p1=='Scissors' && p2=='Paper') ? 1 : -1;
}

function playRound (p1) {

    p2 = getComputerInput ();
    round += 1;

    console.log(`Player: ${p1} Computer: ${p2}`);

    switch(getScore (p1, p2)) {
        case 1:
            score["p1"] += 1;
            score["p2"] += 0;
            console.log('P1 wins');
            break;
        case -1:
            score["p1"] += 0;
            score["p2"] += 1;
            console.log('P2 wins');
            break;
        case 0:
            console.log(`It's a draw`);
            break;
    };

    updateResults();
    checkScore();

}

function checkScore () {
    if (score["p1"] == 5) {
        window.alert('P1 wins the game');
        resetGame ();
    }

    if (score["p2"] == 5) {
        window.alert('P2 wins the game');
        resetGame ();
    }

}

function updateResults () {
    gameResults = document.querySelector('div.game-result');
    roundCounter = gameResults.querySelector('div.round');
    roundCounter.textContent = `Round ${round}`;
    scoreBoard = gameResults.querySelector('div.score-board');
    p1Score = scoreBoard.querySelector('div.player-score.p1');
    p2Score = scoreBoard.querySelector('div.player-score.p2');
    p1Score.textContent = score['p1'];
    p2Score.textContent = score['p2'];
}

function resetGame () {
    const confirmation = window.confirm('Do you want to play another game?');
    if (confirmation) {
        score = {"p1": 0, "p2": 0};
        round = 0;
        updateResults ();    
    } else {
        gameOn = 0;
    }
}

/* Execution */

document.querySelector('div.game-controls').addEventListener('click',
    function (e) {
        if (gameOn == 1) {
            btn = e.target.closest('div.game-button');
        
            if (btn) {
                selection = btn.getAttribute('data-option');
                playRound(selection);
            }
        }
    }
)

