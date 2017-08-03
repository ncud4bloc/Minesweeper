var $content = $('#content');
var $start = $('<div class="topbar" id="gStart">Click here to play Minesweeper</div>');
var $gameBoard = $('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="gameBoard"></div>');
var $gameRow = $('<div class="gameRow"></div>');
var $cell = $('<div class="box defBG notClicked"></div>')
var $aRow;
var $aCell;
var boxEntry;
var $boxID;
var mineEntry;
var $unclickedBoxesAr = [];
var $clickedBoxesAr = [];
var $minesAr = [];
var $zocAr = [];
var $allNumAr = [];

$content.append($start);
$content.append($gameBoard);
   
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
    $minesAr.sort();
    console.log('Mine locations ' + $minesAr);
   
};

var zocCalc =function(selectedBox){
    var $center = selectedBox.split('b');
    $center.shift();
    var firstCord = parseInt($center[0]);
    var lastCord = parseInt($center[1]);
    
    $zocAr = [];
    var adj1 = 'b'+ (firstCord - 1) +'b'+ (lastCord - 1);
        if (((firstCord - 1) > -1) && ((lastCord - 1) > -1)){
            $zocAr.push(adj1);
            $allNumAr.push(adj1);
        } else {
            console.log('Out of Range');
        }
    var adj2 = 'b'+ (firstCord - 1) +'b'+ (lastCord);
        if (((firstCord - 1) > -1)){
            $zocAr.push(adj2);
            $allNumAr.push(adj2);
        } else {
            console.log('Out of Range');
        }
    var adj3 = 'b'+ (firstCord - 1) +'b'+ (lastCord + 1);
        if (((firstCord - 1) > -1) && ((lastCord + 1) < 9)){
            $zocAr.push(adj3);
            $allNumAr.push(adj3);
        } else {
            console.log('Out of Range');
        }
    var adj4 = 'b'+ (firstCord) +'b'+ (lastCord - 1);
        if (((lastCord - 1) > -1)){
            $zocAr.push(adj4);
            $allNumAr.push(adj4);
        } else {
            console.log('Out of Range');
        }
    var adj5 = 'b'+ (firstCord) +'b'+ (lastCord + 1);
        if (((lastCord + 1) < 9)){
            $zocAr.push(adj5);
            $allNumAr.push(adj5);
        } else {
            console.log('Out of Range');
        }
    var adj6 = 'b'+ (firstCord + 1) +'b'+ (lastCord - 1);
        if (((firstCord + 1) < 9) && ((lastCord - 1) > -1)){
            $zocAr.push(adj6);
            $allNumAr.push(adj6);
        } else {
            console.log('Out of Range');
        }
    var adj7 = 'b'+ (firstCord + 1) +'b'+ (lastCord);
        if (((firstCord + 1) < 9)){
            $zocAr.push(adj7);
            $allNumAr.push(adj7);
        } else {
            console.log('Out of Range');
        }
    var adj8 = 'b'+ (firstCord + 1) +'b'+ (lastCord + 1);
        if (((firstCord + 1) < 9) && ((lastCord + 1) < 9)){
            $zocAr.push(adj8);
            $allNumAr.push(adj8);
            $allNumAr.sort();
        } else {
            console.log('Out of Range');
        }
    
    var len = $minesAr.length;
    for (var i = 0; i < len; i++){
        var bomb = $minesAr[i];
        if ($allNumAr.indexOf(bomb) != -1){
            var cut = $allNumAr.indexOf(bomb);
            $allNumAr.splice(cut,1);
        }
    }
   
};

var adjNums = function(bombArray){
    bombArray.forEach(function(item,index){
        zocCalc(item);
    });
    
    for (var i = 0; i < $allNumAr.length; i++){
        var count = 0;
        for (var j = 0; j < $allNumAr.length; j++){
            if ($allNumAr[i] == $allNumAr[j]){
                count++;
            }
            var nNum = $allNumAr[i];
            var nNumX = "#"+nNum;
            var $numberBox = $(nNumX);
            
            switch(count) {
			 case 1:
                $numberBox.removeClass('defBG');
				$numberBox.addClass('nOne');
                $numberBox.addClass('numbered');
				break;
			 case 2:
                $numberBox.removeClass('nOne');
                $numberBox.removeClass('defBG');
				$numberBox.addClass('nTwo');
                $numberBox.addClass('numbered');
				break;
			 case 3:
                $numberBox.removeClass('nTwo');
                $numberBox.removeClass('defBG');
				$numberBox.addClass('nThree');
                $numberBox.addClass('numbered');
				break;
             case 4:
                $numberBox.removeClass('nThree');
                $numberBox.removeClass('defBG');
				$numberBox.addClass('nFour');
                $numberBox.addClass('numbered');
				break;
             case 5:
                $numberBox.removeClass('nFour');
                $numberBox.removeClass('defBG');
				$numberBox.addClass('nFive');
                $numberBox.addClass('numbered');
				break;
             case 6:
                $numberBox.removeClass('nFive');
                $numberBox.removeClass('defBG');
				$numberBox.addClass('nSix');
                $numberBox.addClass('numbered');
				break;
             case 7:
                $numberBox.removeClass('nSix');
                $numberBox.removeClass('defBG');
				$numberBox.addClass('nSeven');
                $numberBox.addClass('numbered');
				break;
			 case 8:
                $numberBox.removeClass('nSeven');
                $numberBox.removeClass('defBG');
				$numberBox.addClass('nEight');
                $numberBox.addClass('numbered');
		    }    
        }
    }
    
};

var recordClick = function(activeBox){
    $boxID = activeBox.attr('id');
    $clickedBoxesAr.push($boxID);
    var delIndex = $unclickedBoxesAr.indexOf($boxID);
    $unclickedBoxesAr.splice(delIndex,1);
            
    activeBox.removeClass('notClicked').addClass('clicked');
    if (activeBox.is('.defBG')){
        activeBox.removeClass('defBG').addClass('nZero');
    }
};

var ckWinLose = function(gStatus){
    if (gStatus.is('.bomb')){
        $('.bomb').addClass('visBomb');
        adjNums($minesAr);
        $('.box').off('click');
    }
            
    var ucLen = $unclickedBoxesAr.length;
    if (ucLen == 9){
        $('.bomb').addClass('visFlag');
        $('.notClicked').addClass('visFlag');
        var $last = $('.bomb').is('.visFlag');
        var $lastAr = [$last];
        adjNums($lastAr);
        $('.visFlag').removeClass('nZero');
        $('.box').off('click');
    }
};

var boxGraphics = function(){
    $('.visBomb').css({
        'height': '33px',
        'width': '33px',
        'background-color': '#f00',
        'background-image': 'url(../IMAGES/mine.jpg)',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': 'cover',
        'border': '1px groove #7b7b81'
    });
            
    $('.visFlag').css({
        'height': '33px',
        'width': '33px',
        'background-color': '#f00',
        'background-image': 'url(../IMAGES/flag.jpg)',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': 'cover',
        'border': '1px groove #7b7b81'
    });
            
    $('.nZero').css({
        'font-size': '16px',
        'font-weight': '900',
        'text-align': 'center',
        'color': '#d6d6e0',
        'height': '33px',
        'width': '33px',
        'background-color': '#7b7b81',
        'border': '3px groove #898a8b'
    });
    $('.nZero').text("0");
            
    $('.visNumbered').css({
        'font-size': '16px',
        'font-weight': '900',
        'text-align': 'center',
        'height': '33px',
        'width': '33px',
        'background-color': '#7b7b81',
        'border': '3px groove #898a8b'
    });
    
        $('.visOne').css({
            'color': '#050569'
        });
        $('.visOne').text("1");
    
        $('.visTwo').css({
            'color': '#18d835'
         });
        $('.visTwo').text("2");
    
        $('.visThree').css({
            'color': '#d41c1c'
        });
        $('.visThree').text("3");
    
        $('.visFour').css({
            'color': '#80107b'
        });
        $('.visFour').text("4");
    
        $('.visFive').css({
            'color': '#f2f215'
        });
        $('.visFive').text("5");
    
        $('.visSix').css({
            'color': '#000'
        });
        $('.visSix').text("6");
    
        $('.visSeven').css({
            'color': '#fff'
        });
        $('.visSeven').text("7");
    
        $('.visEight').css({
            'color': '#ba9f46'
        });
        $('.visEight').text("8");
};

var modifyBox = function(bCount){
    if (bCount.is('.nOne')){
                bCount.addClass('visNumbered');
                bCount.addClass('visOne');
            }
            
            if (bCount.is('.nTwo')){
                bCount.addClass('visNumbered');
                bCount.addClass('visTwo');
            }
            
            if (bCount.is('.nThree')){
                bCount.addClass('visNumbered');
                bCount.addClass('visThree');
            }
            
            if (bCount.is('.nFour')){
                bCount.addClass('visNumbered');
                bCount.addClass('visFour');
            }
            
            if (bCount.is('.nFive')){
                bCount.addClass('visNumbered');
                bCount.addClass('visFive');
            }
            
            if (bCount.is('.nSix')){
                bCount.addClass('visNumbered');
                bCount.addClass('visSix');
            }
            
            if (bCount.is('.nSeven')){
                bCount.addClass('visNumbered');
                bCount.addClass('visSeven');
            }
            
            if (bCount.is('.nEight')){
                bCount.addClass('visNumbered');
                bCount.addClass('visEight');
            }
};

var reset = function(){
    $('.box').remove();
    $('.gameRow').remove();
    $('.gameBoard').remove();
    $unclickedBoxesAr = [];
    $clickedBoxesAr = [];
    $minesAr = [];
    $zocAr = [];
    $allNumAr = [];
    count = 0;
};

/* -----  Function Calls  ----- */

$(function(){
    
    $start.on('click',function(){
        reset();
        makeGrid();
        makeMines();
        adjNums($minesAr);
        
        $('.box').on('click',function(e){
            recordClick($(this));
            ckWinLose($(this));
            modifyBox($(this));
            boxGraphics();
        });  
    });
    
});