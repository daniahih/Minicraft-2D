const gameWindow = document.querySelector('#gameWindow'); // catch the DOM
const startBtn = document.querySelector('#startBtn'); // i want to add the event lister to the start Btn 
let sizeInput = document.querySelector('#sizeInput'); // the user enter it , and it represent the X value which is column 
let gamedrow = document.querySelectorAll('.gamedrow'); 
let Matrix, gameSizeX = 0, gameSizeY = 0; // varibles to make the matrix 
let availableBlocks = ['dirt', 'cobblestone', 'grass', 'leaves', 'wood', 'sky']; //available blocks in game
let  dirtCounter = gressCounter =  LeavesCounter = WoodCounter = cobblestoneCounter = 0;  // counters for the blocks 
let selectedTool = '', selectedElement;
let clickables = document.querySelectorAll('.clickable');
let gameTiles = document.querySelectorAll('.gameTile');

// varibles count and catch the dom element counter 
let grassCnt = document.querySelector('#grassCount');
let dirtCnt = document.querySelector('#dirtCount');
let woodCnt = document.querySelector('#woodCount');
let leavesCnt = document.querySelector('#leavesCount');
let cobblestoneCnt = document.querySelector('#cobblestoneCount');

startBtn.addEventListener('click', () => {
    if (parseInt(sizeInput.value) >= 20) {
        gameSizeX = sizeInput.value; // the value that the user enter it and it will effect the number of coulmns 
        gameSizeY = 20; // i but it 20 
        CreateWorld(gameSizeX, gameSizeY); // call the function with 2 parameters 
    }

})


function CreateWorld(x, y) {
    Matrix = Array.from(Array(parseInt(y)), () => new Array(parseInt(x))); // method to create 2 dimonshional array 
    for (let i = 0; i < Matrix.length; i++)
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j]  // it will give me 2 dimonshional with rows = 20, and columns =20 ;

    for (let i = 0; i < 11; i++) //add sky , here i want from sky to take the first 11 rows form the 20 
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j] = 'sky'; 


    for (let i = 11; i < 12; i++) //add gress, the gree will take one row from 11 -12
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j] = 'gress';


    for (let i = 12; i < 13; i++) //add cobblestone , take one row from 12-13
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j] = 'cobblestone';



    for (let i = 13; i < 19; i++) //add dirt , take  rows from 13-19
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j] = 'dirt';

    generateTree(3, 11); // generate a tree 
    generateTree(15, 11); // generate a tree
    generateChar(10, 8); // generate a char 
    generateBird(3,3) // generate a bird 
    drawWorld(); // call the drow function 



}



function drawWorld() {
    for (let i = 0; i < gameSizeY; i++) {
        for (let j = 0; j < gameSizeX; j++) {
            let div = document.createElement('div'); // create new element  and style it 
            div.style.gridRowStart = i + 1;
            div.style.gridColumnStart = j + 1;
            div.style.height = `5vh`;
            div.style.minWidth = `3vh`;
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
            gameWindow.appendChild(div); // add the element to the game window 
            div.addEventListener('click', itemClick); // add event listner for the div 
            div.classList.add('gamedrow'); // add class gamedrow to the classlist 
            switch (Matrix[i][j]) {
                case 'dirt':
                    div.classList.add('dirt')
                    break;
                case 'gress':
                    div.classList.add('gress')
                    break;
                case 'wood':
                    div.classList.add('wood')
                    break;
                case 'cobblestone':
                    div.classList.add('cobblestone')
                    break;
                case 'leaves':
                    div.classList.add('leaves')
                    break;
                case 'sky':
                    div.classList.add('sky')
                    break;
                case 'head':
                    div.classList.add('head')
                    break;
                case 'body':
                    div.classList.add('body')
                    break;
                    case 'hand':
                    div.classList.add('hand')
                    break;
                    case 'bird':
                        div.classList.add('bird')
                        break;

            }
        }
    }
}
function generateTree(x, y) {
    Matrix[y][x] = 'wood';
    Matrix[y+1][x]='wood'
    Matrix[y - 1][x] = 'wood';
    Matrix[y - 2][x] = 'leaves';
    Matrix[y - 2][x - 1] = 'leaves';
    Matrix[y - 2][x + 1] = 'leaves';
    Matrix[y - 3][x] = 'leaves';
    Matrix[y - 3][x - 1] = 'leaves';
    Matrix[y - 3][x + 1] = 'leaves';
    Matrix[y - 4][x] = 'leaves';
}



function generateChar(x, y) {
    Matrix[y][x] = 'head';
    Matrix[y+1][x-1] = 'body';
    Matrix[y+1][x] = 'body';
    Matrix[y+1][x+1] = 'body';
    Matrix[y+2][x-1]='hand';
    Matrix[y+2][x]='body';
    Matrix[y+2][x+1]='hand';
    Matrix[y+3][x-1]='hand';
    Matrix[y+3][x]='hand';
    Matrix[y+3][x+1]='hand';

}

function generateBird(x,y){
    Matrix[y][x] = 'bird';
    Matrix[y-1][x-1]='bird';
    Matrix[y-1][x+1]='bird';

}
function itemClick() {
    if (selectedTool == 'pickaxe' && this.classList[1] == 'cobblestone') {  //  pickaxe should just remove the cobblestone // this return to the element 
        cobblestoneCounter++; // when i removed i add it to the counter 
        cobblestoneCnt.textContent = cobblestoneCounter; // here  i want to add the change in the html counter 
        updateclass(this, 'cobblestone', 'sky'); // call the function that have function updateclass(obj, toRemove, toAdd) i want to remove the cobblestone and add the sky classes 
    }

    if (selectedTool == 'axe' && (this.classList[1] == 'wood' || this.classList[1] == 'leaves')) { // axe rempove two things wood and leaves and the same idea above
        if (this.classList[1] == 'wood') {
            WoodCounter++;
            woodCnt.textContent = WoodCounter;
            updateclass(this, 'wood', 'sky');
        }
        else {
            LeavesCounter++;
            leavesCnt.textContent =  LeavesCounter;
            updateclass(this, 'leaves', 'sky');
        }
    }

    if (selectedTool == 'shovel' && (this.classList[1] == 'dirt' || this.classList[1] == 'gress')) {
        if (this.classList[1] == 'dirt') {
            dirtCounter++;
            dirtCnt.textContent = dirtCounter;
            updateclass(this, 'dirt', 'sky');
        }
        else {
            gressCounter++;
            grassCnt.textContent = gressCounter;
            updateclass(this, 'gress', 'sky');
        }
    }

    // here now i want to remove from the counter and add it to the game window
    if( selectedElement.classList[1] == 'dirt' && this.classList[1] == 'sky' && dirtCounter>= 1)
    {
        dirtCounter--;
        dirtCnt.textContent = dirtCounter;
        ;
        updateclass(this,'sky','dirt');
    }
    if( selectedElement.classList[1] == 'gress' && this.classList[1] == 'sky'  && gressCounter >= 1)
    {
        gressCounter--;
        grassCnt.textContent = gressCounter;
        updateclass(this,'sky','gress');
    }
    
    if(selectedElement.classList[1] == 'wood'&& this.classList[1] == 'sky' && WoodCounter >= 1)
    {
        WoodCounter--;
        woodCnt.textContent = WoodCounter;
        updateclass(this,'sky','wood');
    }
    if( selectedElement.classList[1] == 'leaves'&& this.classList[1] == 'sky' && LeavesCounter >= 1)
    {
        LeavesCounter--;
        leavesCnt.textContent = LeavesCounter;
        updateclass(this,'sky','leaves');
    }
    if(selectedElement.classList[1] == 'cobblestone'&& this.classList[1] == 'sky' && cobblestoneCounter >= 1)
    {
        cobblestoneCounter--;
        cobblestoneCnt.textContent = cobblestoneCounter;
        updateclass(this,'sky','cobblestone');
    }



}

clickables.forEach((element) => {
    element.addEventListener('click', () => {
        if (selectedElement) //if there is an old selected element, remove it
            selectedElement.classList.remove('selected');
        element.classList.add('selected'); // give the selected element the class on css it will cover the selected with border red 
        selectedElement = element;
        selectedTool = element.classList[1];
        console.log(clickables)  
    })
})

function updateclass(obj, toRemove, toAdd) { // update the classes with to method add and remove 
    obj.classList.remove(toRemove);
    obj.classList.add(toAdd);
}

