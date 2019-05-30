var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var gGame = null;
var img = document.getElementsByTagName("img");
var gameState = "RUNING";

function People() {
    var _this = this;

    var arr = [0,1,2,3,4];
    var arrOld = arr.concat();
    this.flagX = 2;
    this.enemyEY = 0;
    this.createEnemy = true;
    this.arrNew = [];
    this.arrKey = [];
    this.speed = 3;
    this.imgX = 0 ;
    this.imgY = 0;
    this.imgWidth = 0;
    this.imgHeight = 0;
    this.frame = 0;
    this.lastFrame = 0;
    this.imgFlag =true;


    this.update = function () {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        if(gameState == "RUNING"){
            _this.drawEnemy();
            _this.draw();
            _this.peng();
        }
        if(gameState == "ENDING"){
            _this.draw()
        }
        window.requestAnimationFrame(_this.update)
    };
    this.draw = function () {
        ctx.beginPath();
        if(gameState == "RUNING"){
            ctx.drawImage(img[1],cvs.width/5*_this.flagX,cvs.height-120,120,120);
            if(_this.arrKey[0] == 37){
                if(_this.flagX>0){
                    _this.flagX--;
                    _this.arrKey[0] = ""
                }else{
                    _this.flagX = 0
                }
            }
            if(_this.arrKey[0] == 39){
                if(_this.flagX<4){
                    _this.flagX++;
                    _this.arrKey[0] = ""
                }else{
                    _this.flagX = 4
                }
            }
            if(_this.arrKey[1] == 40){
                _this.enemyEY += _this.speed;
            }
            _this.imgX = cvs.width/5*_this.flagX ;
            _this.imgY = cvs.height-120;
            _this.imgWidth = 120;
            _this.imgHeight = 120;
        }
        if(gameState == "ENDING"){
            /*ctx.drawImage(img[1],240,390,120,120);*/
            ctx.drawImage(img[1],_this.imgX,_this.imgY,_this.imgWidth,_this.imgHeight);
            if(_this.imgFlag){
                var angle = Math.atan2(390-_this.imgY,240-_this.imgX);
                var expectDistance = Math.sqrt((390-_this.imgY)*(390-_this.imgY)+(240-_this.imgX)*(240-_this.imgX));
                var realityDistance = 2;//每一帧走的实际距离
                if(realityDistance>=expectDistance){
                    _this.imgX = 240;
                    _this.imgY = 390;
                    _this.imgFlag = false
                }else{
                    _this.imgX +=Math.cos(angle)*4;
                    _this.imgY +=Math.sin(angle)*4;
                }
            }
            if(_this.imgFlag == false){
             if(_this.imgWidth<600){
                 _this.imgWidth+=2;
                 _this.imgHeight+=2;
                 _this.imgX -=1;
                 _this.imgY -=1
             }
            }
        }
    };
    this.onkeydown = function (ev) {
        ev = event||window.event;
        if(ev.keyCode==37 || ev.keyCode==39){
            _this.arrKey[0] = ev.keyCode
        }
        if(ev.keyCode == 40 ||ev.keyCode == 38){
            if(ev.keyCode == 40){
                _this.speed++
            }
            if(ev.keyCode == 38){
                _this.speed = 3
            }
            _this.arrKey[1] = ev.keyCode
        }
    };
    this.drawEnemy = function () {
        if(_this.createEnemy === true){
            _this.arrNew = [];
            var enemyNum=Math.floor(Math.random()*3+1);
            for(var i = arr.length;i>enemyNum;i--){
                var index = Math.floor(Math.random()*arr.length);
                _this.arrNew.push(arr[index]);
                _this.arrNew.sort();
                arr.splice(index,1)
            }
            arr = arrOld.concat();
        }
        if(_this.enemyEY<cvs.height) {
            ctx.beginPath();
            for (var j = 0;j<_this.arrNew.length;j++){
                ctx.drawImage(img[0],cvs.width/5*_this.arrNew[j],_this.enemyEY,120,120)
            }
            _this.enemyEY+=_this.speed;
            _this.createEnemy = false;
        }else{
            _this.createEnemy = true;
            _this.enemyEY = -120
        }
    };
    this.peng = function () {
        for(var i = 0;i<_this.arrNew.length;i++){
            if(cvs.width/5*_this.flagX+60>cvs.width/5*_this.arrNew[i]
                && cvs.width/5*_this.flagX+60<cvs.width/5*_this.arrNew[i]+120
                && cvs.height-120<_this.enemyEY+120){
                gameState = "ENDING"
            }
        }
    };
    document.onkeydown = _this.onkeydown;
}


gGame = new People();
gGame.update();