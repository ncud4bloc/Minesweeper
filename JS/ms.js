var $content = $('#content');
var $start = $('<div class="topbar" id="gStart">Click here to play Minesweeper</div>');
var $gameBoard = $('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="gameBoard"></div>');
var $box11 = $('<div class="box col-xs-4 col-sm-4 col-md-4 col-lg-4" id="b11"></div>');
var $gameRow = $('<div class="gameRow"></div>');
var $cell = $('<div class="box defBG"></div>')
var $aRow;
var $aCell;
var boxEntry;
var $boxID;
var mineEntry;
var $unclickedBoxesAr = [];
var $clickedBoxesAr = [];
var $minesAr = [];
var $foundMinesAr = [];
var $clearBoxAr = [];
var $zocAr = [];

$content.append($start);
$content.append($gameBoard);
   /* $gameBoard.append($box11);*/
   

/* -----  CSS  ----- */

$content.css({
    /*'width': '100%',*/
    'width': '400px',
    'height': '400px',
    'background-color': '#b5b6b7'
});

$start.css({
    'height': '35px',
    'width': '307px',
    'text-align': 'center',
    'color': '#62dee3',
    'margin': '10px auto',
    'background-color': '#7b7b81',
    'border': '5px outset #898a8b',
    'font-family': '"Courgette",cursive',
    'font-size': '20px',
    'font-weight': '900'
});

$gameBoard.css({
    'height': '307px',
    'width': '307px',
    'margin': '10px auto',
    'margin-left': '45px',
    'padding-right': '0px',
    'background-image': 'url(../IMAGES/kaboom.png)',
    'background-repeat': 'no-repeat',
    'background-position': 'center',
    'background-size': 'cover',
    'border': '5px ridge #898a8b'
});

$('.defBG').css({
/*$('.box').css({*/
    'height': '27px',
    'width': '27px',
    'background-color': '#7b7b81',
    'border': '3px outset #898a8b'
});



/* -----  Functions  ----- */

var makeGrid = function(){
    for (var i=0; i < 9; i++){
        $aRow = $gameRow.clone();
        $gameBoard.append($aRow);
            $aRow.css({
                'height': '33px',
                'width': '297px',
                'background-color': '#7b7b81',
                'clear': 'left'
            });
        for (var j =0; j < 9; j++){
            $aCell = $cell.clone();
            $aRow.append($aCell);
            $aCell.css({
                'height': '33px',
                'width': '33px',
                'background-color': '#7b7b81',
                'border': '3px outset #898a8b',
                'float': 'left'
            });
            boxEntry = 'b'+ i +'b'+ j;
            $unclickedBoxesAr.push(boxEntry);
            $aCell.attr('id',boxEntry);
        }
    }
    /*console.log($unclickedBoxesAr);*/
};

var makeMines =function(){
    for (var k =0; k < 9; k++){
        var locI = Math.floor(Math.random() * 9);
        var locJ = Math.floor(Math.random() * 9);
        if($('.gameRow').eq(locI).find('.box').eq(locJ).hasClass('bomb')){
            return;
        } else {
            $('.gameRow').eq(locI).find('.box').eq(locJ).removeClass('defBG').addClass('bomb');
        }
        mineEntry = 'b'+ locI +'b'+ locJ;
        $minesAr.push(mineEntry);
    }
    console.log($minesAr);
    $('.bomb').css({
        'height': '33px',
        'width': '33px',
        'background-color': '#f00',
        'background-image': 'url(../IMAGES/mine.jpg)',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': 'cover',
        'border': '1px groove #7b7b81'
    });
};

var zocCalc =function(selectedBox){
    var $center = selectedBox.split('b');
    $center.shift();
    var firstCord = parseInt($center[0]);
    var lastCord = parseInt($center[1]);
    /*console.log('Center box I & J: ' + $center);
    console.log('First coordinate = ' + firstCord);
    console.log('Last coordinate = ' + lastCord);*/
    
    $zocAr = [];
    var adj1 = 'b'+ (firstCord - 1) +'b'+ (lastCord - 1);
    $zocAr.push(adj1);
    var adj2 = 'b'+ (firstCord - 1) +'b'+ (lastCord);
    $zocAr.push(adj2);
    var adj3 = 'b'+ (firstCord - 1) +'b'+ (lastCord + 1);
    $zocAr.push(adj3);
    var adj4 = 'b'+ (firstCord) +'b'+ (lastCord - 1);
    $zocAr.push(adj4);
    var adj5 = 'b'+ (firstCord) +'b'+ (lastCord + 1);
    $zocAr.push(adj5);
    var adj6 = 'b'+ (firstCord + 1) +'b'+ (lastCord - 1);
    $zocAr.push(adj6);
    var adj7 = 'b'+ (firstCord + 1) +'b'+ (lastCord);
    $zocAr.push(adj7);
    var adj8 = 'b'+ (firstCord + 1) +'b'+ (lastCord + 1);
    $zocAr.push(adj8);
    
    console.log('Center box: ' + $boxID);
    console.log('Neighbor IDs: ' + $zocAr);
    
};


/* -----  Function Calls  ----- */

$(function(){
    
    $start.on('click',function(){
        makeGrid();
        makeMines();
        
        $('.box').on('click',function(e){
            $boxID = $(this).attr('id');
            $clickedBoxesAr.push($boxID);
            var delIndex = $unclickedBoxesAr.indexOf($boxID);
            $unclickedBoxesAr.splice(delIndex,1);
            /*console.log('This Box ID is: ' + $boxID);
            console.log($clickedBoxesAr);
            console.log($unclickedBoxesAr);*/
            
            zocCalc($boxID);
        });
        
        
        
    });
    
    /*$start.on('click',function(){
        $('.box').on('click');
        $('.box').css({
                'background-image': 'none',
                'background-color': '#7b7b81'
            });
        initPlayers();
        var $gamer1 = new Player($p1,"X","yes",[],"no",0);
        var $gamer2 = new Player($p2,"O","no",[],"no",0);
        sMessage = $gamer1.name + "\'s Turn";
        $whosTurn.text(sMessage);
        $name1.text($p1);
        $name2.text($p2);
        $win1.text('Wins: ' + nWins1);
        $win2.text('Wins: ' + nWins2);
        
        var putDown = function(clickedBox,boxNum){
            count ++;
            clickedBox.css({
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'background-size': 'cover'
            });
            if(count % 2 !== 0){
                clickedBox.css({
                    'background-image': 'url(../IMAGES/x2.png)'
                });
                $gamer1.squares.push(boxNum);
                if($gamer1.victory !== 'yes'){
                    sMessage = $gamer2.name + "\'s Turn";
                    $whosTurn.text(sMessage);
                }
                victory($gamer1,count);
            } else {
                clickedBox.css({
                    'background-image': 'url(../IMAGES/o2.png)'
                });
                $gamer2.squares.push(boxNum);
                if($gamer2.victory !== 'yes'){
                    sMessage = $gamer1.name + "\'s Turn";
                    $whosTurn.text(sMessage);
                }
                victory($gamer2,count);
            }
        };
        
        var victory = function(gamer,countNum){    
        };
    
        
    
       
    }); */
});