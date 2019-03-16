            var canvas, context;
            var scene, player1, player2;
            const BLOCK_WIDTH = BLOCK_HEIGHT = 10;
            var stopDraw;
            setup();

            function setup(){
                //the cavas is the drawing space
                canvas = document.getElementById("canvas");
                context = canvas.getContext("2d");
                canvas.style.width ='7  0%';
                canvas.width = window.innerWidth;
                canvas.style.height ='70%';
                canvas.height = window.innerHeight;

                context.fillStyle = "pink";

                scene = [];

                player1 = new Player1(100,400,'W','S','A','D');
                player1.grow();
                player2 = new Player2(1500,400,'I','K','J','L');
                player2.grow();

                //walls
                var minX = 10;
                var maxX = canvas.width - canvas.width%10 - 10;
                var minY = 10;
                var maxY = canvas.height - canvas.height%10 - 10;
                for(var x=minX; x<=maxX; x+=1){
                    wallcash(x,minY);
                    wallcash(x,maxY);
                    }
                for(var y=minY; y<=maxY; y+=1){
                    wallcash(minX,y);
                    wallcash(maxX,y);
                    }

                window.addEventListener('keydown',keyPress,false);

                stopDraw = setInterval(draw,10);
            }

            function keyPress(e) {
                e.preventDefault();
                var key = String.fromCharCode(e.which);
                player1.keyPress(key);
                player2.keyPress(key);
            }

            function wallcash(x,y){
                scene.push({x:x,y:y})
            }

            function draw(){
                player1.grow()
                if(!player1.alive) {
                    displayWinnerName("Dave")
                    clearInterval(stopDraw);
                    return;
                }
                player2.grow()
                if(!player2.alive) {
                    displayWinnerName("Bob")
                    clearInterval(stopDraw);
                    return;
                }
                for(var i=0; i<scene.length; i++){
                    var block = scene[i];
                    context.fillRect(block.x, block.y, BLOCK_WIDTH, BLOCK_HEIGHT);
                }
            }

            function displayWinnerName(name){
                context.font = "30px Poppins";
                context.fillStyle = "red";
                context.textAlign = "center";
                context.fillText("Winner is "+name, canvas.width/2, canvas.height/2);
            }

            function Player1(startX,startY,upKey, downKey,leftKey,rightKey){
                this.alive = true;
                this.x = startX;
                this.y = startY;
                this.up = upKey;
                this.down = downKey;
                this.left = leftKey;
                this.right = rightKey;
                this.direction = this.right;

                this.keyPress = function(key){
                    if(key == this.up) 
                        this.direction = this.up;
                    else if(key == this.down) 
                        this.direction = this.down;
                    else if(key == this.left) 
                        this.direction = this.left;
                    else if(key == this.right) 
                        this.direction = this.right;
                }

                this.grow = function(){
                    if(this.direction == this.up) 
                        this.y -= BLOCK_HEIGHT;
                    else if(this.direction == this.down) 
                        this.y += BLOCK_HEIGHT;
                    else if(this.direction == this.left) 
                        this.x -= BLOCK_WIDTH;
                    else if(this.direction == this.right) 
                        this.x += BLOCK_WIDTH;
                    for(var i=0; i<scene.length; i++){
                        var block = scene[i];
                        if(block.x==this.x && block.y==this.y)
                            this.alive = false;
                    }
                    wallcash(this.x,this.y);
                }
            }
            function Player2(startX,startY,upKey, downKey,leftKey,rightKey){
                this.alive = true;
                this.x = startX;
                this.y = startY;
                this.up = upKey;
                this.down = downKey;
                this.left = leftKey;
                this.right = rightKey;
                this.direction = this.left;

                this.keyPress = function(key){
                    if(key == this.up) 
                        this.direction = this.up;
                    else if(key == this.down) 
                        this.direction = this.down;
                    else if(key == this.left) 
                        this.direction = this.left;
                    else if(key == this.right) 
                        this.direction = this.right;
                }

                this.grow = function(){
                    if(this.direction == this.up) 
                        this.y -= BLOCK_HEIGHT;
                    else if(this.direction == this.down) 
                        this.y += BLOCK_HEIGHT;
                    else if(this.direction == this.left) 
                        this.x -= BLOCK_WIDTH;
                    else if(this.direction == this.right) 
                        this.x += BLOCK_WIDTH;
                    for(var i=0; i<scene.length; i++){
                        var block = scene[i];
                        if(block.x==this.x && block.y==this.y)
                            this.alive = false;
                    }
                    wallcash(this.x,this.y);
                }
            }
