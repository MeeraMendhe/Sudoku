let box;
let count = 0;
let sudoku;
let arr;


window.onload = () => {
	const problem = document.getElementById('problem');
	problem.value = `2 0 6 0 0 0 0 4 9
0 3 7 0 0 9 0 0 0
1 0 0 7 0 0 0 0 6
0 0 0 5 8 0 9 0 0
7 0 5 0 0 0 8 0 4
0 0 9 0 6 2 0 0 0
9 0 0 0 0 4 0 0 1
0 0 0 3 0 0 4 9 0
4 1 0 0 0 0 2 0 8`;

const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    event.preventDefault();
    try {
        fillSudoku();
    } catch (error) {
        alert("Invalid Sudoku")
    }
});
const solve = document.getElementById('solve');
solve.addEventListener('click', () => {
    event.preventDefault();
    try {
  Sodukosolver();

    } catch (error) {
        alert("Invalid Sudoku")
    }
});

box = document.getElementsByTagName('td');
};
async function fillSudoku() {
	let input = document.getElementById('problem').value;
	input = input.trim().split('\n');
	arr = [];

	for (let i = 0; i < 9; i++) {
		arr.push(input[i].trim().split(' ').map(Number));
	}
    
	sudoku = [];
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (arr[i][j] <=-1) {
    			alert("😞 Try Again 😞 Sudoko should have Number between 1 to 9")
                return
			}
		}
    }
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (arr[i][j] === 0) {
				sudoku.push([ i, j ]);
			} else {
				box[9 * i + j].textContent = arr[i][j];
			}
		}
	}
}

function Sodukosolver() {
	sudolu_Solver(0);
	async function sudolu_Solver(index) {
		if (index === sudoku.length) {
            return true;
            
		} else {
			let row = sudoku[index][0];
			let col = sudoku[index][1];
			for (let i = 1; i < 10; i++) {
				if (check(row, col, i)) {
					arr[row][col] = i;
					await sleep(10);
					box[9 * row + col].textContent = arr[row][col];
					box[9 * row + col].style.color = "#0a8df4";
					if (await sudolu_Solver(index + 1)) {
						return true;
					} else {
						await sleep(10);
						box[9 * row + col].textContent = '';
						arr[row][col] = 0;
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

function sleep(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

// if (sudoku_solver()) {
//     for (let i = 0; i < 9; i++) {
//       let str = ''
//       for (let j = 0; j < 9; j++) {
//         str += arr[i][j] + ' '
//       }
//       console.log(str)
//     }
//   } else {
//     console.log(-1)
//   }
// function sudoku_solver() {
//     // console.log(row,col)
//     let [flag,row, col]=search_black()
//     if (!flag) {
//       return true
//     }
//     for (let i = 1; i <= 9; i++) {
//      // console.log(row,col)
//       if (check(row, col, i)) {
//         arr[row][col] = i
//         if (sudoku_solver()) {
//           return true
//         }
//         arr[row][col] = 0
//       }
//     }
//     return false
//   }
// }
// function search_black(row, col) {
//     let flag = false
//     for(row=0;row<9;row++){
//         for(col=0;col<9;col++){
//            if(arr[row][col]===0){
//                flag=true
//                return [flag,row,col]
//            }
//           }
//       }
//       flag=false
//       return [flag=false,row,col]
//   }
// 
// let sudokus = [
//     [
//       [0, 1, 0, 0, 4, 0, 0, 5, 0],
//       [4, 0, 7, 0, 0, 0, 6, 0, 2],
//       [8, 2, 0, 6, 0, 0, 0, 7, 4],
//       [0, 0, 0, 0, 1, 0, 5, 0, 0],
//       [5, 0, 0, 0, 0, 0, 0, 0, 3],
//       [0, 0, 4, 0, 5, 0, 0, 0, 0],
//       [9, 6, 0, 0, 0, 3, 0, 4, 5],
//       [3, 0, 5, 0, 0, 0, 8, 0, 1],
//       [0, 7, 0, 0, 2, 0, 0, 3, 0],
//     ],
//     [
//       [3, 0, 0, 0, 0, 0, 0, 4, 0],
//       [6, 7, 0, 8, 0, 0, 0, 0, 9],
//       [0, 5, 1, 0, 2, 0, 0, 0, 8],
//       [0, 0, 7, 0, 0, 9, 6, 5, 0],
//       [0, 0, 0, 0, 4, 0, 0, 0, 2],
//       [0, 9, 0, 3, 0, 0, 1, 0, 0],
//       [4, 0, 0, 7, 0, 0, 3, 0, 6],
//       [0, 0, 6, 2, 0, 4, 0, 1, 0],
//       [5, 0, 8, 0, 0, 1, 0, 0, 0],
//     ],
//     [
//       [0, 2, 0, 7, 8, 0, 0, 0, 0],
//       [4, 0, 0, 0, 3, 0, 0, 0, 1],
//       [0, 0, 0, 0, 0, 0, 6, 7, 5],
//       [9, 5, 0, 1, 0, 7, 4, 0, 0],
//       [0, 1, 2, 8, 0, 0, 0, 9, 0],
//       [8, 0, 0, 0, 5, 0, 0, 0, 0],
//       [0, 0, 9, 0, 0, 0, 0, 3, 0],
//       [0, 0, 1, 2, 0, 4, 0, 0, 7],
//       [6, 0, 0, 0, 1, 3, 8, 2, 0],
//     ],
//     [
//       [6, 0, 4, 0, 0, 0, 0, 0, 0],
//       [0, 1, 0, 0, 7, 8, 0, 3, 0],
//       [0, 0, 7, 1, 0, 0, 0, 5, 9],
//       [0, 0, 0, 0, 2, 4, 0, 0, 0],
//       [8, 0, 1, 0, 0, 0, 7, 0, 0],
//       [0, 9, 3, 0, 0, 5, 2, 0, 0],
//       [0, 6, 0, 3, 0, 0, 0, 9, 0],
//       [0, 5, 0, 0, 0, 0, 6, 0, 1],
//       [0, 0, 0, 5, 0, 7, 0, 8, 0],
//     ],
//   ];
// clearSudoku();

// //   generate a random index to select a sudoku
// let randomInd = Math.floor(Math.random() * sudokus.length);
// let matrix = sudokus[randomInd];

// for (let i = 0; i < 9; i++) {
//   for (let j = 0; j < 9; j++) {
//     sudoku[i][j] = matrix[i][j];
//   }
// }
// console.log("sudoku", sudoku);

// for (let i = 0; i < 9; i++) {
//   for (let j = 0; j < 9; j++) {
//     if (sudoku[i][j] !== 0) {
//       td[9 * i + j].textContent = sudoku[i][j];
//     }
//   }
// }
// isGenerated = true;
// document.getElementById("solve").disabled = false;