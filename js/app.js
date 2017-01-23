/**
 * Created by Iaroslav Zhbankov on 22.01.2017.
 */


function clearBoard(x, y) {
    var board = [];
    for (var i = 0; i < x; i++)
        for (var j = 0; j < y; j++) {
            board.push(null);
        }
    return board;
}
function boardConstructor(x, y) {
    var board = [];
    for (var i = 0; i < x; i++)
        for (var j = 0; j < y; j++) {
            board.push(null);
        }

    function randomCreature(arr) {
        var counter = 0;
        for (var i = 0; i < arr.length; i++) {
            if ((Math.round(Math.random() * 3) == 1) && (counter < Math.round(arr.length / 3))) {
                arr[i] = 1;
                counter++;
            }
        }
        return arr;
    }

    return randomCreature(board);
}
function getNeighbours(board, i, x) {
    var neighbours = [];
    if ((board[i + 1]) && ((i + 1) % x != 0)) {
        neighbours.push(board[i + 1])
    }
    if ((board[i - 1]) && ((i) % x != 0) && (i != 0)) {
        neighbours.push(board[i - 1])
    }
    if ((board[i + x]) && ((i + x) < (board.length))) {
        neighbours.push(board[i + x])
    }
    if ((board[i - x]) && ((i - x) >= 0)) {
        neighbours.push(board[i - x])
    }

    if ((board[i + 1 - x]) && ((i + 1) % x != 0) && ((i + 1 - x) >= 0)) {
        neighbours.push(board[i + 1 - x])
    }
    if ((board[i + 1 + x]) && ((i + 1) % x != 0) && ((i + 1 + x) < board.length)) {
        neighbours.push(board[i + 1 + x])
    }
    if ((board[i - 1 + x]) && ((i) % x != 0) && ((i - 1 + x) < (board.length))) {
        neighbours.push(board[i - 1 + x])
    }
    if ((board[i - 1 - x]) && ((i) % x != 0) && ((i - 1 - x) >= 0)) {
        neighbours.push(board[i - 1 - x])
    }
    return neighbours.length;
}
function getAllNeighbours(board, x, y) {
    var allNeighbours = [];
    for (var i = 0; i < board.length; i++) {
        allNeighbours.push(getNeighbours(board, i, x, y))
    }
    return allNeighbours;
}
function lifeGeneration(board, x, y) {
    var allneighbours = getAllNeighbours(board, x, y);
    for (var i = 0; i < board.length; i++) {
        if ((board[i]) && ((allneighbours[i] < 2) || (allneighbours[i] > 3))) {
            board[i] = null;
        } else if ((!board[i]) && (allneighbours[i] == 3)) {
            board[i] = 1;
        }
    }
    return board;
}

var xBoard = 20;
var yBoard = 20;
var board = boardConstructor(xBoard, yBoard);


var Board = React.createClass({
    getInitialState: function () {
        return {
            board: board,
            pause: true,
            generation: 0,
            xBoard: 20,
            yBoard: 20
        }
    },
    life: function () {
        var board = this.state.board;
        var xBoard = this.state.xBoard;
        var yBoard = this.state.yBoard;
        var generation = this.state.generation;
        var newBoard = lifeGeneration(board, xBoard, yBoard);
        var newGeneration = generation + 1;
        this.setState({
            board: newBoard,
            generation: newGeneration
        });


    },
    runGame: function () {
        console.log(1);
        var same = this;
        this.setState({
            pause: !same.state.pause
        });
        console.log(2);
        if (this.state.pause) {
            console.log(3);
            var interval = setInterval(this.life, 100);
        } else {
            clearInterval(interval);
        }
    },
    checkCell: function (e) {
        var index = e.target.id;
        var newBoard = this.state.board;
        if (e.target.className == 'empty') {
            newBoard[index] = 1;
        } else {
            newBoard[index] = null
        }
        this.setState({
            board: newBoard
        })

    },
    clearBoard: function () {
        var same = this;
        this.setState({
            board: clearBoard(same.state.xBoard, same.state.yBoard),
            generation: 0
        })
    },
    getBox: function (board) {
        var same = this;
        const cellStyle = {
            clear: 'both'
        };


        var boardList = board.map(function (item, index) {
            if (item == null) {
                if (((index) % same.state.xBoard == 0) && (index != 0)) {
                    return <div onClick={same.checkCell} style={cellStyle} id={index} className='empty'></div>
                } else {
                    return <div onClick={same.checkCell} id={index} className='empty'></div>
                }
            } else {
                if (((index) % same.state.xBoard == 0) && (index != 0)) {
                    return <div onClick={same.checkCell} style={cellStyle} id={index} className='full'></div>
                } else {
                    return <div onClick={same.checkCell} id={index} className='full'></div>
                }
            }

        });
        return (boardList)
    },
    newBoard: function (e) {
        e.preventDefault();
        var x = e.target.getAttribute('data-x');
        var y = e.target.getAttribute('data-y');
        var newBoard = boardConstructor(x, y);
        this.setState({
            board: newBoard,
            xBoard: x,
            yBoard: y
        })

    },
    render: function () {
        return (<div>
                <div className='grid'>
                    {this.getBox(this.state.board)}
                </div>
                <div>Generation:<p>{this.state.generation}</p></div>
                <div className="controlPannel">
                    <button onClick={this.newBoard} data-x={20} data-y={20}>20x20</button>
                    <button onClick={this.newBoard} data-x={10} data-y={10}>10x10</button>
                    <button onClick={this.newBoard} data-x={40} data-y={40}>40x40</button>
                    <button onClick={this.runGame}>Run/Pause</button>
                    <button onClick={this.clearBoard}>Clear</button>

                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <Board />,
    document.getElementById('box')
);
