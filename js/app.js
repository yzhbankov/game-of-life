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
function getNeighbours(board, i, x, y) {
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
        }
        if ((!board[i]) && (allneighbours[i] == 3)) {
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
            generation: 0
        }
    },
    runGame: function () {
        var same = this;
        this.setState({
            pause: !same.state.pause
        });
        function life() {
            board = lifeGeneration(same.state.board, xBoard, yBoard);
            if (same.state.pause) {
                clearInterval(interval);
            }
            if (board.indexOf(1) != -1) {
                var newGeneration = same.state.generation + 1;
            } else {
                var newGeneration = 0;
                clearInterval(interval);
            }
            same.setState({
                board: board,
                generation: newGeneration
            });
        }

        var interval = setInterval(life, 100);
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
        this.setState({
            board: clearBoard(xBoard, yBoard),
            generation: 0
        })
    },
    getBox: function (board) {
        var same = this;
        const cellStyle = {
            clear: 'both'
        };
        var board = this.state.board;

        var boardList = board.map(function (item, index) {
            if (item == null) {
                if (((index) % xBoard == 0) && (index != 0)) {
                    return <div onClick={same.checkCell} style={cellStyle} id={index} className='empty'></div>
                } else {
                    return <div onClick={same.checkCell} id={index} className='empty'></div>
                }
            } else {
                if (((index) % xBoard == 0) && (index != 0)) {
                    return <div onClick={same.checkCell} style={cellStyle} id={index} className='full'></div>
                } else {
                    return <div onClick={same.checkCell} id={index} className='full'></div>
                }
            }

        });
        return (boardList)
    },
    newBoard: function (e) {
        var x = e.target.getAttribute('data-x');
        var y = e.target.getAttribute('data-y');
        xBoard = x;
        yBoard = y;
        this.setState({
            board: boardConstructor(x, y)
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
                    <button onClick={this.newBoard} data-x={30} data-y={30}>30x30</button>
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
