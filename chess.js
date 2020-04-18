// chess
var chessboard = document.getElementById("chessBoard");
var context = chessboard.getContext("2d");
var flag = false;
var step = 0; // 步数
var color = ["#000", "#fff"];
var chessArr = []; // 记录