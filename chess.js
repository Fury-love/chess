// chess
var chessboard = document.getElementById("chessBoard");
var context = chessboard.getContext("2d");
var flag = false; // 输赢标识
var step = 0; // 步数
var color = ["#000", "#fff"];
var chessArr = []; // 记录
// 初始化数据状态
for (var i = 0; i < 15; i++) {
    chessArr[i] = [];
    for (var j = 0; j < 15; j++) {
        chessArr[i][j] = 0;
    }
}

/**
 * chess
 */
// 绘制棋盘
function drawBoard() {
    for (var i = 0; i < 15; i++) {
        //横线条
        context.moveTo(40 + i * 40, 20);
        context.lineTo(40 + i * 40, 580);
        context.stroke();
        //竖线条
        context.moveTo(40, 20 + i * 40);
        context.lineTo(600, 20 + i * 40);
        context.stroke();
        // for (var j = 0; j < 20; j++) {
        //     chessArr[i][j] = 0;
        // }
    }
}

// 归零
function cleanBoard() {
    context.fillStyle = "#8f7a66";
    context.fillRect(0, 0, chessboard.width, chessboard.height);
}

// 绘制棋子
function drawChess(x, y, i) {
    context.beginPath();
    context.arc(40 + x * 40, 20 + y * 40, 18, 0, 2 * Math.PI);
    context.closePath();
    var curColor = color[i - 1];
    var gradient = context.createRadialGradient(23 + i * 40, 17 + j * 40, 18, 23 + i * 40, 17 + j * 40, 0);
    if (curColor === "#fff") {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    if (curColor === "#000") {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    }
    context.fillStyle = gradient;
    context.fill();
    chessArr[x][y] = i;

}

// drawChess(30, 30, "#fff");
drawBoard();
//落子
chessboard.addEventListener("click", function (e) {
    if (flag) {
        alert("game over");
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var dx = Math.floor((x + 20) / 40) - 1;
    var dy = Math.floor((y + 20) / 40) - 1;
    //是否越界
    if (x < 40 || x > 600 || y < 20 || y > 580 || chessArr[dx][dy]) {
        return;
    }
    // 落子
    drawChess(dx, dy, step % 2 === 0 ? 1 : 2);

    // 判断输赢
    checkWin(dx, dy, step % 2 === 0 ? 1 : 2);

    //步阶
    step++;
});

function checkWin(x, y, cc) {


    var f = [[1, 0], [0, 1], [1, 1], [1, -1]]; // 四种状态符号位

    for (var j = 0; j < 4; j++) {
        var count = 0;
        var aflag = true, dflag = true;
        for (var i = 1; i <= 5; i++) {
            if ((chessArr[x + (i * f[j][0])][y + (i * f[j][1])] === cc) && aflag && (x + (i * f[j][0]) < 20) && (y + (i * f[j][1]) < 20
            )) {
                count++;
                console.log("zhengxiang:", count);
            } else {
                aflag = false;
                if (!aflag && !dflag) {
                    break;
                }
            }
            if ((chessArr[x - (i * f[j][0])][y - (i * f[j][1])] === cc) && dflag && (x - (i * f[j][0]) > 0) && (y - (i * f[j][1]) > 0)) {
                count++;
                console.log("fuxiang:", count);
            } else {
                dflag = false;
                if (!aflag && !dflag) {
                    break;
                }
            }
        }
        if (count > 3) {
            flag = true;
            alert("你赢了!!");
            return;
        }
    }
}

function computerAI() {
    var personScore = [], computerScore = [], maxScore = 0, curX = 0, curY = 0;
    for (var i = 0; i < 15; i++) {
        personScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            personScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessManStatus[i][j] == 0) {
                for (var k = 0; k < winCount; k++) {
                    if (wins[i][j][k]) {
                        if (personWin[k] == 1 || personWin[k] == 2 || personWin[k] == 3 || personWin[k] == 4) {
                            personScore[i][j] += personWin[k] * personWin[k] * 200;
                        }
                        if (computerWin[k] == 1 || computerWin[k] == 2 || computerWin[k] == 3 || computerWin[k] == 4) {
                            computerScore[i][j] += (computerWin[k] * computerWin[k] - 1) * 200 + 399;
                        }
                    }
                }
                if (personScore[i][j] > maxScore) {
                    maxScore = personScore[i][j];
                    curX = i;
                    curY = j;
                } else if (personScore[i][j] == maxScore) {
                    if (computerScore[i][j] > computerScore[curX][curY]) {
                        curX = i;
                        curY = j;
                    }
                }
                if (computerScore[i][j] > maxScore) {
                    maxScore = computerScore[i][j];
                    curX = i;
                    curY = j;
                } else if (computerScore[i][j] == maxScore) {
                    if (personScore[i][j] > personScore[curX][curY]) {
                        curX = i;
                        curY = j;
                    }
                }
            }
        }
    }
    drawChessMan(curX, curY);
    chessManStatus[curX][curY] = 2;
    for (var k = 0; k < winCount; k++) {
        if (wins[curX][curY][k]) {
            computerWin[k]++;
            personWin[k] = 6;
            if (computerWin[k] == 5) {
                alert('电脑赢了!');
                gameOver = !gameOver;
            }
        }
    }
}