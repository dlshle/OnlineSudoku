var sudokuGame = {
	
	puzzleGrid:[],

	seeds: 0,

	/*
	 * newGame sets the puzzleGrid empty and fills 9 length 9 lists
	 * and fills them all 0s and fills n(seeds) valid numbers. 
	 */
	newGame: function(seeds) {
		//check if the seeds is valid
		if(seeds<0||seeds>80)
			return false;
		//assign seeds
		this.seeds = seeds;

		//create new puzzleGrid
		this.puzzleGrid = [];
		for(let i=0;i<9;i++){
			this.puzzleGrid.push([]);
			for(let j=0;j<9;j++){
				this.puzzleGrid[i].push(0);
			}
		}
	
		//add valid random numbers to the grid
		let rand,randX,randY;
		while(seeds-->0){
			do{
				rand = this.randomInt(1,9);
				randX = this.randomInt(0,8);
				randY = this.randomInt(0,8);
			} while(!this.isValid(randX,randY,rand));
			this.puzzleGrid[randX][randY] = rand;
		}

		//finish filling numbers

	}, 

	isValid: function(x,y,n){
		if(this.puzzleGrid[x][y]>0)
			return false;
		let vx = 0, vy = 0;
		//up,down
		while(vy<9){
			if(vy==y){
				vy++;
				continue;
			}
			if(this.puzzleGrid[x][vy++]==n)
				return false;
		}
		//left,right
		while(vx<9){
			if(vx==x){
				vx++;
				continue;
			}
			if(this.puzzleGrid[vx++][y]==n)
				return false;
		}
		//in grid
		let gx=Math.floor(x/3)*3, gy=Math.floor(y/3)*3;
		for(vx=gx;vx<gx+3;vx++){
			for(vy=gy;vy<gy+3;vy++){
				if(vx==x&&vy==y)
					continue;
				if(this.puzzleGrid[vx][vy]==n)
					return false;
			}
		}	
		return true;	
	},

	/*
	 * isInBound is not really used for now, but will be useful later?
	 */
	isInBound: function(x,y){
		return x>-1&&x<9&&y>-1&&y<9;
	},

	/*
	 * randomInt returns a random integer within range of low to high.
	 */
	randomInt: function(low, high){
		return Math.floor(Math.random()*(high-low)+low);
	},

	getPile: function(x,y){
		if(!this.isInBound(x,y))
			return -1;
		return this.puzzleGrid[x][y];
	}
}

/*
 * drawGrid draws the game grid on the HTMLNode node.
 */
function drawHTMLGrid(node) {
	//table tr th
	let table = document.createElement("table");
	
	//insert trs and ths
	for(let i=0;i<9;i++){
		let tr = document.createElement("tr");
		tr.setAttribute("id","x"+i);
		for(let j=0;j<9;j++){
			let td = document.createElement("td");
			td.setAttribute("id","x"+i+"y"+j);
			let pile;
			let num = sudokuGame.getPile(i,j);
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
			pile.setAttribute("id",i+","+j);
			td.append(pile);	
			tr.append(td);
		}
		table.append(tr);
	}
	node.append(table);
}

/*
 * drawCanvasGrid inserts a canvas sudoku game into the node
 */
function drawCanvasGrid(node){

}

let assertTools = {
	countNumbers : function(){
		let result = 0;
		console.log(sudokuGame.puzzleGrid);
		for(let i=0;i<sudokuGame.puzzleGrid.length;i++){
			for(let j=0;j<sudokuGame.puzzleGrid[i].length;j++){
				if(sudokuGame.puzzleGrid[i][j]>0)
					result++;
			}
		}
		return result;
	}
}
