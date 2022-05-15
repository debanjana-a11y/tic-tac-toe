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
    if (text == "Start") {
        enablePlayGround()
        document.getElementById("play").innerText = "Reset"
    } else {
        clearPlayGround()
        document.getElementById("play").innerText = "Start"
    }
}

const mark = button_id => {
    if (document.getElementById(button_id).innerText == "") {
        document.getElementById(button_id).innerText = 'X'
        if (check_win('X') == true) {
            return
        }
        opponent_mark()
    } 
}

function opponent_mark() {
    let button_id = Math.floor(Math.random()*9 + 1)
    let count = 9;
    while (document.getElementById(button_id).innerText != "" && count > 0) {
        button_id = Math.floor(Math.random()*9 + 1)
        count--;
    }
    if (count == 0) {
        alert ("Game Over!!")
        return
    }
    // console.log(button_id)
    document.getElementById(button_id).innerText = 'O'
    if (check_win('O') == true) {
        return
    }
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



