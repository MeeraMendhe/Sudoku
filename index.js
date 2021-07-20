let tds;
let count = 0;
let toBeFilled;
let matrix;


window.onload = () => {
	const problem = document.getElementById('problem');
	problem.value = `0 4 0 0 0 0 1 7 9 
0 0 2 0 0 8 0 5 4 
0 0 6 0 0 5 0 0 8 
0 8 0 0 7 0 9 1 0 
0 5 0 0 9 0 0 3 0 
0 1 9 0 6 0 0 4 0 
3 0 0 4 0 0 7 0 0 
5 7 0 1 0 0 2 0 0 
9 2 8 0 0 0 0 6 0`;

const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    event.preventDefault();
    try {
        processData();
    } catch (error) {
        console.log(error);
        alert("Invalid Sudoku")
    }
});
const solve = document.getElementById('solve');
solve.addEventListener('click', () => {
    event.preventDefault();
    try {
        Sodukosolver();
    } catch (error) {
        console.log(error);
        alert("Invalid Sudoku")
    }
});

tds = document.getElementsByTagName('td');
};


function Sodukosolver() {
	recursion(0);
	async function recursion(index) {
		if (index === toBeFilled.length) {
			return true;
		} else {
			let row = toBeFilled[index][0];
			let col = toBeFilled[index][1];
			for (let i = 1; i < 10; i++) {
				if (check(row, col, i)) {
					matrix[row][col] = i;
					await sleep(10);
					tds[9 * row + col].textContent = matrix[row][col];
					tds[9 * row + col].style.color = '#0a8df4';
					tds[9 * row + col].style.borderColor = 'skyblue';
					if (await recursion(index + 1)) {
						return true;
					} else {
						await sleep(10);
						tds[9 * row + col].textContent = '';
						matrix[row][col] = 0;
					}
				}
			}
			return false;
		}
    }
    
}  
function check(row,col,i){
    let flag1=true;
    for(let j=0;j<9;j++){
        if(arr[j][col]===i){
            flag1=false;
        }
    }
    let flag2=true;
    for(let j=0;j<9;j++){
        if(arr[row][j]===i){
            flag2=false;
        }
    }
    let flag3 = true;
    let rval = (row-(row%3));
    let cval = (col-(col%3))
    for(let j=0;j<3;j++){
        for(let k=0;k<3;k++){
            if(arr[j+rval][k+cval]===i){
                return false
            }
        }
    }

    if(flag1&&flag2&&flag3){
        return true
    }else{
        return false
    }
}
async function processData() {
	let input = document.getElementById('problem').value;
	input = input.trim().split('\n');
	matrix = [];

	for (let i = 0; i < 9; i++) {
		matrix.push(input[i].trim().split(' ').map(Number));
	}

	toBeFilled = [];

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (matrix[i][j] === 0) {
				toBeFilled.push([ i, j ]);
			} else {
				tds[9 * i + j].textContent = matrix[i][j];
			}
		}
	}
}
function sleep(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}




// function Soduko_solver(){
//     let [flag,row,col] = search_blank()
//     if(!flag){
//         return true
//     }
//    for(let i=1;i<=9;i++){
//        if(check(row,col,i)){
//            arr[row][col]=i;
//            if(Soduko_solver()){
//                return true;
//            }
//            arr[row][col]=0
//        }
//     }
//     return false;
// }
// function search_blank(row,col) {
//     let flag = false
//   for(row=0;row<9;row++){
//       for(col=0;col<9;col++){
//          if(arr[row][col]===0){
//              flag=true
//              return [flag,row,col]
//          }
//         }
//     }
//     flag=false
//     return [flag=false,row,col]
// }
