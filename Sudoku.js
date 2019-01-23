var sudokoGame = {
	
	puzzleGrid:[],

	seeds: 0,

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
				rand = randomInt(1,9);
				randX = randomInt(0,8);
				randY = randomInt(0,8);
			} while(!isValid(randX,randY,rand));
			this.puzzleGrid[randX][randY] = rand;
		}	
	}, 

	isValid: function(x,y,n){
		let vx = 0, vy = 0;
		//up,down
		while(vy<9) {
			if(xy==y)
				continue;
			if(this.puzzleGrid[x][vy++]==n)
				return false;
		}
		//left,right
		while(vx<9){
			if(xv==x)
				continue;
			if(this.puzzleGrid[vx][y]==n)
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

	isInBound: function(x,y){
		return x>-1&&x<9&&y>-1&&y<9;
	},

	randomInt: function(low, high){
		return Math.floor(low+Math.random()*(high-low)+1)
	},
	
		
