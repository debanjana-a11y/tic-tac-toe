let game_started = false
let your_score = opponent_score = 0

function clearPlayGround() {
    let buttons = document.getElementById("play_field").getElementsByTagName("button")
    for (var i = 0 ; i < buttons.length; i++) {
        buttons[i].innerText = ""
        buttons[i].disabled = true
    }
}

function enablePlayGround() {
    let buttons = document.getElementById("play_field").getElementsByTagName("button")
    for (var i = 0 ; i < buttons.length; i++) {
        buttons[i].disabled = false
    }
}

function toggle() {
    let text = document.getElementById("play").innerText;
    if (text == "Play") {
        enablePlayGround()
        document.getElementById("inputs").getElementsByTagName("p")[0].innerText = "Your Turn"
        document.getElementById("play").innerText = "Reset"
    } else {
        clearPlayGround()
        document.getElementById("inputs").getElementsByTagName("p")[0].innerText = ""
        document.getElementById("play").innerText = "Play"
    }
}

const mark = button_id => {
    if (document.getElementById(button_id).innerText == "") {
        document.getElementById(button_id).innerText = 'X'
        if (check_win('X') == true) {
            return
        }
        document.getElementById("inputs").getElementsByTagName("p")[0].innerText = "Opponent's Turn"
        opponent_mark()
    } 
}

function opponent_mark() {
    let button_id = Math.floor(Math.random()*9 + 1)
    while (document.getElementById(button_id).innerText != "") {
        button_id = Math.floor(Math.random()*9 + 1)
    }
    // console.log(button_id)
    document.getElementById(button_id).innerText = 'O'
    if (check_win('O') == true) {
        return
    }
    document.getElementById("inputs").getElementsByTagName("p")[0].innerText = "Your Turn"
}

function check_win(symbol) {
    let buttons = document.getElementById("play_field").getElementsByTagName("button")
    if (((buttons[0].innerText == symbol) && (buttons[1].innerText == symbol) && (buttons[2].innerText == symbol)) ||
        ((buttons[3].innerText == symbol) && (buttons[4].innerText == symbol) && (buttons[5].innerText == symbol)) ||
        ((buttons[6].innerText == symbol) && (buttons[7].innerText == symbol) && (buttons[8].innerText == symbol)) ||
        ((buttons[0].innerText == symbol) && (buttons[3].innerText == symbol) && (buttons[6].innerText == symbol)) ||
        ((buttons[1].innerText == symbol) && (buttons[4].innerText == symbol) && (buttons[7].innerText == symbol)) ||
        ((buttons[2].innerText == symbol) && (buttons[5].innerText == symbol) && (buttons[8].innerText == symbol)) ||
        ((buttons[0].innerText == symbol) && (buttons[4].innerText == symbol) && (buttons[8].innerText == symbol)) ||
        ((buttons[2].innerText == symbol) && (buttons[4].innerText == symbol) && (buttons[6].innerText == symbol))) {
            // Increament Score
            if (symbol == "X") {
                your_score++;
                document.getElementById("resulttext_1").innerText = your_score;
            } else {
                opponent_score++;
                document.getElementById("resulttext_2").innerText = opponent_score;
            }
            toggle()
            return true;
        }
    return false;
}



