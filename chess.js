// chess
var chessboard = document.getElementById("chessBoard");
var context = chessboard.getContext("2d");
var flag = false; // 输赢标识
var step = 0; // 步数
var color = ["#000", "#fff"];
var chessArr = []; // 记录

/**
 * chess
 */
// 绘制棋盘
function drawBoard() {
    for (var i = 0; i < 20; i++) {
        context.beginPath();
        context.moveTo(i * 30 + 30, 30);
        context.lineTo(i * 30 + 30, chessboard.height - 30);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(30, i * 30 + 30);
        context.lineTo(chessboard.width - 30, i * 30 + 30);
        context.closePath();
        context.stroke();
        chessArr[i] = [];
        for (var j = 0; j < 20; j++) {
            chessArr[i][j] = 0;
        }
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
    context.arc(x * 30 + 30, y * 30 + 30, 15, 0, Math.PI * 2, false);
    context.closePath();
    chessArr[x][y] = i;
    context.fillStyle = color[i - 1];
    context.fill();
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
    var dx = Math.floor((x + 15) / 30) - 1;
    var dy = Math.floor((y + 15) / 30) - 1;
    //是否越界
    if (x < 30 || x > 630 || y < 30 || y > 630 || chessArr[dx][dy]) {
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