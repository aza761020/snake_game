const playGround = document.querySelector(".playGround");
const currentScore = document.querySelector(".currentSkore");
const high_Score = document.querySelector(".highSkore")

let food_row, food_col;
let snake_row =2, snake_col = 1;
let move_rov=0, move_col=0;
let snake_size = [];
let setintervalID;
let gameOver= false;
let score =0;

let highScore = localStorage.getItem("high-score") || 0;
high_Score.innerText =`High Score : ${highScore}`;

// set random values food_row and food_col
const foodPosition =()=>{
    food_row = Math.floor(Math.random() * 30) +1;
    food_col = Math.floor(Math.random() * 30) + 1;
}

//set game over handling 
const handleGame =()=>{
    clearInterval(setintervalID)
    alert("game over")
    location.reload();
}

//move snake
const moveSnake =(btn)=>{

    if( btn.key === "ArrowUp" && move_rov != 1)
        {
            move_rov= -1;
            move_col = 0;
        }
        else if( btn.key === "ArrowDown" && move_rov != -1)
            {
                move_rov= 1;
                move_col =0;
            }
            else if( btn.key === "ArrowLeft" && move_col != 1)
                {
                    move_rov=0;
                    move_col=-1;
                }
                else if( btn.key === "ArrowRight" && move_col != -1)
                    {
                        move_rov=0;
                        move_col=1;
                    }
}



// create food div and snake divs
const runGame =() =>{
    if(gameOver) return handleGame();

    //create food
    let food = `<div class="food" style="grid-area: ${food_row} / ${food_col}" ></div>`;

    //snake eat food change food place and add div to increase snake size
    if(snake_row === food_row && snake_col === food_col)
        {
            foodPosition();
            snake_size.push([food_row, food_col])
            score++;

            highScore= score >= highScore ? score : highScore ;
            localStorage.setItem("high-score", highScore);
            currentScore.innerText=`Score : ${score} `;
        }

        //if snake bite food that food div follow snake head
        for(let i= snake_size.length-1; i>0 ; i--)
            {
                snake_size[i]=snake_size[i-1];
            }

    //first snake position
     snake_size[0]=[snake_row, snake_col]

     snake_row += move_rov;
     snake_col += move_col;

     //if snake out of box => gameOver = true
     if(snake_row <=0 || snake_row >30 || snake_col <=0 || snake_col >30) gameOver= true;

     //create snake head
     for(let i=0; i < snake_size.length; i++)
        {
            food += ` <div class="snakeHead" style="grid-area: ${snake_size[i][0]} / ${snake_size[i][1]}"></div> `

            // if snake bite own body gameOver=>true
            if( i != 0 &&
                snake_size[0][0] === snake_size[i][0] &&
                snake_size[0][1] === snake_size[i][1]
            ) gameOver = true;

    
        }

    playGround.innerHTML=food;
}





foodPosition();
setintervalID = setInterval(runGame,125)
document.addEventListener("keydown" , moveSnake)