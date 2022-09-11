const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let winboard = ['012', '345', '678', '036', '147', '258', '048', '246'];
    
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

    function checkWinner() {
        let player_1_choice = "";
        let player_2_choice = "";
        for(let idx in board) {
            if (board[idx] == 'X') {
                player_1_choice = player_1_choice + idx;
            }
            if (board[idx] == 'O') {
                player_2_choice = player_2_choice + idx;
            }
        }
        
        for (let e of winboard) {
            let player_1_win = 0;
            let player_2_win = 0;
      
            for(let i = 0; i < e.length; i++) {
                let ch = e.charAt(i);
                if (playing_now === player_2) {
                    if (player_1_choice.includes(ch) === true) {
                        player_1_win++;
                        if (player_1_win === 3) {
                            return player_1;
                        }
                    } else {
                        break;
                    }
                } else {
                    if (player_2_choice.includes(ch) === true) {
                        player_2_win++;
                        if (player_2_win === 3) {
                            return player_2;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return null;
    }

    const addListener = (() => {
        const boxlist = document.getElementsByClassName('box');
        for(const box of boxlist) {
            box.addEventListener('click', (e) => {
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
                displayResult('Game Ongoing ...');
                const winner = checkWinner();
                if (winner !== null) {
                    displayResult('Player ' + winner.number + " is WINNER");
                }
            });
        };
    })();

    const resetGame = () => {
        const boxlist = document.getElementsByClassName('box');
        for(const box of boxlist) {
            box.textContent = '';
        };
        board.splice(0, board.length);
        changePlayer(player_1);
        displayResult('Game Starting ...');
    }

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

    displayResult = (text) => {
        const result = document.getElementsByClassName('result')[0];
        result.innerText = text;
    };

    gameBoard.resetGame();

    return {displayResult};
})();



