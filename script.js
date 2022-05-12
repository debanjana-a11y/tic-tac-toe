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
    document.getElementById(button_id).innerText = 'X';
    document.getElementById("inputs").getElementsByTagName("p")[0].innerText = "Opponent's Turn"
}
