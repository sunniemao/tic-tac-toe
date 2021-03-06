function Player(player) {
  this.player = player,
  this.places = []
};

function start_game() {
  var player1 = new Player("X");
  var player2 = new Player("O");
  var winner = [['11','12','13'], ['21','22','23'], ['31','32','33'], ['11','22','33'], ['13','22','31'], ['11','21','31'], ['12','22','23'], ['13','23','33']];
  var currentPlayer = player1;
  var moves = 0;
  
  $('h2').text("Turn: X");

  $('.cell').click(function() {
    if ($(this).text() == '') {
      $(this).text(currentPlayer.player);
      currentPlayer.places.push($(this).attr('id'));
      if (won(currentPlayer.places, winner) || moves >= 8) {
        if (moves >= 8) {
          $('h2').text('Tie!');
        } else {
          $('h2').text('The winner is: ' + currentPlayer.player);
        }
      } else {
        turn();
      }
    }
  });
  
  function turn() {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    $('h2').text('Turn: ' + currentPlayer.player);
    moves += 1;
  };
  
  function won(value, move) {
    var val1 = value.sort();
    var flag = false;
    for (var i = 0; i < 8; i++ ) {
      var count = 0;
      for (var k = 0; k < move[i].length; k++) {
        if (val1.indexOf(move[i][k]) > -1) { count++; }
      }
      if (count >= 3) {
        flag = true;
        move[i].forEach(function(cell){
          $('#' + cell).css("background-color","#A9A9A9");
        });
      }
    }
    return flag;
  }
};

$(document).ready(function(){
  $('#start').click(function(){
    $("#start").hide();
    start_game();
  });
});
