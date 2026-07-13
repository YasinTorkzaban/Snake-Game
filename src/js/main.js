const field = document.querySelectorAll("#field>div")

let current_Dir = 'none'
let prev_Dir

let game_Interval = null
let move_Interval = 150

const _menu = document.querySelector('#menu')
const _cover = document.querySelector('#cover')
const _pause = document.querySelector('#pause')
const _resume = document.querySelector('.resume')
const _restart_menu = document.querySelector('.restart')

const _lost_menu = document.querySelector('#lose_menu')
const _lost_restart = document.querySelector('.restart_lost')
const _final_score = document.querySelector('.final_score')

const _left = document.querySelector('#left')
const _up = document.querySelector('#up')
const _right = document.querySelector('#right')
const _down = document.querySelector('#down')

const _score_Box = document.querySelector('#scorebox')
let _score = 0

let _snake = []
let _food_Index = 0

function first_Init() {
    _lost_menu.classList.add('hidden')
    _menu.classList.add('hidden')
    _cover.classList.add('hidden')

    //game field last graphics(from previous round) cleanup
    field.forEach(div => {
        div.classList.remove('head', 'body', 'food')
    })

    //reset snake array and the score
    _score = 0
    _score_Box.innerHTML = _score
    _snake = []

    //select a square randomly for snake's first head(between index 30 to 70)
    let start_Pos = Math.floor(Math.random() * 40) + 30
    _snake.push(start_Pos)

    //snake's first head
    field[start_Pos].classList.add('head')

    //first food
    generate_Food()
}

//generates new food in a square out of snake's body
function generate_Food() {
    //delete previous food(if it exists)
    if (_food_Index) {
        field[_food_Index].classList.remove('food')
    }

    let empty_squares = []
    //find all the empty squares of the game field
    for (let i = 0; i < 100; i++) {
        if (!_snake.includes(i)) {
            empty_squares.push(i)
        }
    }

    //random selection of one of the empty squares
    let rand_index = Math.floor(Math.random() * empty_squares.length)
    _food_Index = empty_squares[rand_index]

    field[_food_Index].classList.add('food')
}
//calculation logic and main game loop
function game_Loop() {
    let head = _snake[0]
    let head_X = head % 10
    let head_Y = Math.floor(head / 10)

    //calculate new location based on movement direction
    if (current_Dir == 'left') {
        head_X = (head_X - 1 + 10) % 10
    }
    else if (current_Dir == 'up') {
        head_Y = (head_Y - 1 + 10) % 10
    }
    else if (current_Dir == 'right') {
        head_X = (head_X + 1) % 10
    }
    else if (current_Dir == 'down') {
        head_Y = (head_Y + 1) % 10
    }
    else {
        clearInterval(game_Interval)
        game_Interval = null
        return
    }

    //snake's new head index
    let new_Head = (head_Y * 10) + head_X

    //check lose condition(snake's head hits itself)
    if (_snake.includes(new_Head)) {
        clearInterval(game_Interval)
        game_Interval = null
        _final_score.innerHTML = _score
        _lost_menu.classList.remove('hidden')
        _cover.classList.remove('hidden')
        return
    }

    //snake's new head shifts to the new square
    _snake.unshift(new_Head)

    //check if snake ate food or not
    if (new_Head === _food_Index) {
        _score += 10
        _score_Box.innerHTML = _score
        generate_Food()
    } else {
        let tail = _snake.pop()
        field[tail].classList.remove('body', 'head')
    }

    //update snake's graphic in the game field
    field.forEach((div, index) => {
        div.classList.remove('head', 'body')
        if (index === _snake[0]) {
            div.classList.add('head')
        } else if (_snake.includes(index)) {
            div.classList.add('body')
        }
    })
}

//apply direction with keyboard
window.addEventListener('keydown', (e) => {
    let key_Code = (e.keyCode || e.which)
    let new_Dir = current_Dir

    if (key_Code == 37 && current_Dir != 'right') new_Dir = 'left'
    else if (key_Code == 38 && current_Dir != 'down') new_Dir = 'up'
    else if (key_Code == 39 && current_Dir != 'left') new_Dir = 'right'
    else if (key_Code == 40 && current_Dir != 'up') new_Dir = 'down'

    if (new_Dir != current_Dir) {
        current_Dir = new_Dir
        play()
    }
})

//menu's icons
_resume.addEventListener('click', (e) => {
    _cover.classList.add('hidden')
    _menu.classList.add('hidden')
    current_Dir = prev_Dir
    play()
})

_pause.addEventListener('click', (e) => {
    _cover.classList.remove('hidden')
    _menu.classList.remove('hidden')
    prev_Dir = current_Dir
    current_Dir = 'none'
    play()
})

_restart_menu.addEventListener('click', (e) => {
    restart()
})
//menu's icons

//restart button for the lose menu
_lost_restart.addEventListener('click', (e) => {
    restart()
})

function restart() {
    clearInterval(game_Interval)
    game_Interval = null
    current_Dir = 'none'
    first_Init()
}

function play() {
    if (current_Dir != 'none' && game_Interval == null) {
        game_Interval = setInterval(game_Loop, move_Interval)
    } else if (current_Dir == 'none') {
        clearInterval(game_Interval)
        game_Interval = null
    }
}

//direction icons on screen
_left.addEventListener('click', (e) => {
    if (current_Dir != 'right') {
        current_Dir = 'left'
        play()
    }
})
_up.addEventListener('click', (e) => {
    if (current_Dir != 'down') {
        current_Dir = 'up'
        play()
    }
})
_right.addEventListener('click', (e) => {
    if (current_Dir != 'left') {
        current_Dir = 'right'
        play()
    }
})
_down.addEventListener('click', (e) => {
    if (current_Dir != 'up') {
        current_Dir = 'down'
        play()
    }
})
//direction icons on screen

//first execution
first_Init()