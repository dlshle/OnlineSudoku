var puzzleGrid = [];
	
var unknowns = [];

var seeds = 0;

function generateGrid(){
	 puzzleGrid = [];
	for(let i=0;i<9;i++){
		 puzzleGrid.push([]);
		for(let j=0;j<9;j++){
			 puzzleGrid[i].push(0);
		}
	}
}

/*
 * newGame sets the puzzleGrid empty and fills 9 length 9 lists
 * and fills them all 0s and fills n(seeds) valid numbers. 
 */
function newGame(seeds) {
	//check if the seeds is valid
	if(seeds<0||seeds>80)
		return false;
	//assign seeds
	 seeds = seeds;

	//create new puzzleGrid 
	generateGrid();
		
	//add valid random numbers to the grid
	let rand,randX,randY;
	while(seeds-->0){
		do{
			rand =  randomInt(1,9);
			randX =  randomInt(0,8);
			randY =  randomInt(0,8);
		} while((puzzleGrid[randX][randY]==0)&&(!isValid(randX,randY,rand)));
		//console.log(randX+","+randY+":"+rand+" finished");
		puzzleGrid[randX][randY] = rand;
	}
}

function isAvailable(x,y){
	return  puzzleGrid[x][y]!=0;
}

function isValid(x,y,n){
	let vx = 0, vy = 0;
	//up,down
	while(vy<9){
		if(vy==y){
			vy++;
			continue;
		}
		//console.log("checking "+x+","+y+":"+n+" with "+x+","+vy+":"+ puzzleGrid[x][vy]);
		if( puzzleGrid[x][vy++]==n){
			//console.log("invalid y for ("+x+","+y+") where n="+n+", ("+x+","+vy+")="+ puzzleGrid[x][vy-1]);
			return false;
		}
	}
	//left,right
	while(vx<9){
		if(vx==x){
			vx++;
			continue;
		}
		//console.log("checking "+x+","+y+":"+n+" with "+vx+","+y+":"+ puzzleGrid[vx][y]);
		if( puzzleGrid[vx++][y]==n){
			//console.log("invalid x for ("+x+","+y+") where n="+n+", ("+vx+","+y+")="+ puzzleGrid[x][vy-1]);
			return false;
		}
	}
	//in grid
	let gx=Math.floor(x/3)*3, gy=Math.floor(y/3)*3;
	for(vx=gx;vx<gx+3;vx++){
		for(vy=gy;vy<gy+3;vy++){
			if(vx==x&&vy==y)
				continue;
			if( puzzleGrid[vx][vy]==n)
				return false;
		}
	}	
	return true;	
}

/*
 * isInBound is not really used for now, but will be useful later?
 */
function isInBound(x,y){
	return x>-1&&x<9&&y>-1&&y<9;
}

/*
 * randomInt returns a random integer within range of low to high.
 */
function randomInt(low, high){
	return Math.round(Math.random()*(high-low)+low);
}

function getPile(x,y){
	if(! isInBound(x,y))
		return -1;
	return  puzzleGrid[x][y];
}


/*
 * drawGrid draws the game grid on the HTMLNode node.
 */
function drawHTMLGrid(node) {
	//clear the node first
	node.innerHTML = "";

	//table tr th
	let table = document.createElement("table");
	
	//insert trs and ths
	for(let i=0;i<9;i++){
		let tr = document.createElement("tr");
		tr.setAttribute("id","y"+i);
		for(let j=0;j<9;j++){
			let td = document.createElement("td");
			td.setAttribute("id","x"+j+"y"+i);
			let pile;
			let num =  getPile(j,i);
			pile = document.createElement("input");
			//will use css later
			pile.setAttribute("autocomplete","off");
			pile.setAttribute("maxlength","1");
			pile.setAttribute("size","2");
			//if it's a pure num, set the input box to readonly
			if(num > 0){
				pile.setAttribute("readonly","");
				pile.setAttribute("value",num);
			}
			pile.setAttribute("id",j+","+i);
			td.append(pile);	
			tr.append(td);
		}
		table.append(tr);
	}
	node.append(table);
}

/*
 *checkResult checks the result one by one
 */
function checkResult(){
	for(let i=0;i<9;i++){
		for(let j=0;j<9;j++){
			if( getPile(i,j)!=0){
				let ansNode = document.getElementById(i+","+j);
				if(!ansNode){
					alert("invalid game grid!");
					return false;
				}
				let ans = ansNode.value;
				if(!isNumeric(ans)){
					alert("invalid input for number at ("+i+","+j+")!");
					return false;
				}
				if(ans<1||ans>9){
					alert("invalid input for number at ("+i+","+j+") (the value should be in the range of [1,9]!");
					return false;
				}
				
				if(! isValid(i,j,ans)){
					alert("a mistake is made at ("+i+","+j+")!");
					return false;
				}
			}
		}
	}
	alert("Wow, you are amazing! No mistake has been made. This is the perfect solution!");
	return true;
}

/*
 * drawCanvasGrid inserts a canvas sudoku game into the node
 */
function drawCanvasGrid(node){

}

let assertTools = {
	countNumbers : function(){
		let result = 0;
		//console.log( puzzleGrid);
		for(let i=0;i< puzzleGrid.length;i++){
			for(let j=0;j< puzzleGrid[i].length;j++){
				if( puzzleGrid[i][j]>0)
					result++;
			}
		}
		return result;
	}
}

function isNumeric(target){
	return !isNaN(parseFloat(target))&&isFinite(target);
}
