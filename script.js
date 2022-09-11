const gameBoard = (() => {
    let board = [];
    let winboard = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    
    function player(number, name) {
        this.number = number;
        this.name = name;
        return {number, name};
    }

    const player_1 = player(1, 'X');
    const player_2 = player(2, 'O');

    let playing_now = null;

    function changePlayer(player) {
        const turn_info = document.getElementsByClassName('turn_info')[0];
        const element = document.createElement('span');
        if (playing_now !== null) {
            turn_info.removeChild(turn_info.lastChild);
        }
        
        playing_now = player;
        element.textContent = playing_now.number;
        turn_info.append(element);
    }

    const checkWinner = () => {
        let player_1_choice = board.reduce((a, e, i) =>
        (e === 'X')? a.concat(i) : a, []);

        let player_2_choice = board.reduce((a, e, i) =>
        (e === 'O')? a.concat(i) : a, []);
        
        let winner = undefined;
        for (let combo of winboard) {
            // Both includes and indexOf works
            if (combo.every(e => player_1_choice.includes(e)) === true) {
                winner = player_1;
                return {winner, combo};
            }
            if (combo.every(e => player_2_choice.indexOf(e) > -1) === true) {
                winner = player_2;
                return {winner, combo};
            }
        }
        return winner;
    }

    let turn = 0;
    const addListener = (() => {
        const boxlist = document.getElementsByClassName('box');
        for(const box of boxlist) {
            box.addEventListener('click', (e) => {
                turn++;
                let idx = e.currentTarget.id;
                if (playing_now.number == 1 && e.currentTarget.textContent === '') {
                    e.currentTarget.textContent = 'X';
                    e.currentTarget.style.color = 'red';
                    board[idx] = 'X';
                    changePlayer(player_2);
                }
                if (playing_now.number == 2 && e.currentTarget.textContent === '') {
                    e.currentTarget.textContent = 'O';
                    e.currentTarget.style.color = 'green';
                    board[idx] = 'O';
                    changePlayer(player_1);
                }
                
                if (turn === 9) {
                    displayResult("It's a Tie. Wanna replay?");
                    // stopGame();
                } else {
                    displayResult('Game Ongoing ...');
                }
                
                const ret = checkWinner();
                if (ret !== undefined) {
                    if (ret.winner !== undefined) {
                        displayResult('Player ' + ret.winner.number + " is WINNER", ret.combo);
                    }
                }
            });
        };
    })();

    const resetGame = () => {
        const boxlist = document.getElementsByClassName('box');
        for(const box of boxlist) {
            box.textContent = '';
            box.style.backgroundColor = 'pink';
        };
        board.splice(0, board.length);
        changePlayer(player_1);
        turn = 0;
        displayResult('Starting Game...');
    };

    // To avoid further clicks
    // function stopGame() {
    //     const boxlist = document.getElementsByClassName('box');
    //     for(const box of boxlist) {
    //         // box.style.pointerEvents = 'none';
    //     };
    // }

    return {resetGame};
})();

const displayController = (() => {
    const addListener = (() => {
        let play_btn = document.getElementsByClassName('btn_play')[0];
        play_btn.addEventListener("click", (e) => {
            const game_arena = document.getElementsByClassName('game_arena')[0];
            game_arena.style.display = 'flex';

            const btn_replay = document.getElementsByClassName('btn_replay')[0];
            btn_replay.style.display = 'flex';
            e.currentTarget.style.display = 'none';
        });

        const btn_replay = document.getElementsByClassName('btn_replay')[0];
        btn_replay.addEventListener("click", (e) => {
            gameBoard.resetGame();
        });
    })();

    displayResult = (text, combo = []) => {
        const result = document.getElementsByClassName('result')[0];
        result.innerText = text;
        if (combo != undefined) {
            combo.map((e) => {
                document.getElementById(e).style.backgroundColor = 'hsl(0, 100%, 80%)';
            });

            // STOP the game
            // gameBoard.stopGame();
        }
    };

    gameBoard.resetGame();

    return {displayResult};
})();



