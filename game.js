const gameWindow = document.querySelector('#gameWindow');
const startBtn = document.querySelector('#startBtn');
let sizeInput = document.querySelector('#sizeInput');
let gamedrow = document.querySelectorAll('.gamedrow');
let Matrix, gameSizeX = 0, gameSizeY = 0;
let availableBlocks = ['dirt', 'cobblestone', 'grass', 'leaves', 'wood', 'sky']; //available blocks in game
let  dirtCounter = gressCounter =  LeavesCounter = WoodCounter = cobblestoneCounter = 0; 
let selectedTool = '', selectedElement;
let clickables = document.querySelectorAll('.clickable');
let gameTiles = document.querySelectorAll('.gameTile');


let grassCnt = document.querySelector('#grassCount');
let dirtCnt = document.querySelector('#dirtCount');
let woodCnt = document.querySelector('#woodCount');
let leavesCnt = document.querySelector('#leavesCount');
let cobblestoneCnt = document.querySelector('#cobblestoneCount');

startBtn.addEventListener('click', () => {
    if (parseInt(sizeInput.value) >= 20) {
        gameSizeX = sizeInput.value;
        gameSizeY = 20;
        CreateWorld(gameSizeX, gameSizeY);
    }

})


function CreateWorld(x, y) {
    Matrix = Array.from(Array(parseInt(y)), () => new Array(parseInt(x)));
    for (let i = 0; i < Matrix.length; i++)
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j]

    for (let i = 0; i < 11; i++) //add sky
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j] = 'sky';


    for (let i = 11; i < 12; i++) //add gress
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j] = 'gress';


    for (let i = 12; i < 13; i++) //add cobblestone
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j] = 'cobblestone';



    for (let i = 13; i < 19; i++) //add dirt
        for (let j = 0; j < Matrix[i].length; j++)
            Matrix[i][j] = 'dirt';

    generateTree(3, 11);
    generateTree(15, 11);
    generateChar(10, 8);
    generateBird(3,3)
    drawWorld();



}



function drawWorld() {
    for (let i = 0; i < gameSizeY; i++) {
        for (let j = 0; j < gameSizeX; j++) {
            let div = document.createElement('div');
            div.style.gridRowStart = i + 1;
            div.style.gridColumnStart = j + 1;
            div.style.height = `5vh`;
            div.style.minWidth = `3vh`;
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
            gameWindow.appendChild(div);
            div.addEventListener('click', itemClick);
            div.classList.add('gamedrow');
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
    if (selectedTool == 'pickaxe' && this.classList[1] == 'cobblestone') {
        cobblestoneCounter++;
        cobblestoneCnt.textContent = cobblestoneCounter;
        updateclass(this, 'cobblestone', 'sky');
    }

    if (selectedTool == 'axe' && (this.classList[1] == 'wood' || this.classList[1] == 'leaves')) {
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

    if( selectedElement.classList[1] == 'dirt'&& this.classList[1] == 'sky' && dirtCounter>= 1)
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
        element.classList.add('selected');
        selectedElement = element;
        selectedTool = element.classList[1];
        console.log(clickables)  
    })
})

function updateclass(obj, toRemove, toAdd) {
    obj.classList.remove(toRemove);
    obj.classList.add(toAdd);
}

