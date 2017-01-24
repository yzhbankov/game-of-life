/**
 * Created by ְֳִּ 3 on 24.01.2017.
 */
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

function getNeighbours(board, i, xBoard) {
    var x = Number(xBoard);
    var neighbours = [];
    if ((board[i + 1] == 1) && ((i + 1) % x != 0)) {
        neighbours.push(board[i + 1]);
    }
    if ((board[i - 1] == 1) && ((i % x) != 0)) {
        neighbours.push(board[i - 1])
    }
    if ((board[i + x] == 1) && ((i + x) < (board.length - 1))) {
        neighbours.push(board[i + x])
    }
    if ((board[i - x] == 1) && ((i - x) >= 0)) {
        neighbours.push(board[i - x])
    }

    if ((board[i + 1 - x] == 1) && (((i + 1) % x) != 0) && ((i + 1 - x) >= 0)) {
        neighbours.push(board[i + 1 - x])
    }
    if ((board[i + 1 + x] == 1) && (((i + 1) % x) != 0) && ((i + 1 + x) < (board.length - 1))) {
        neighbours.push(board[i + 1 + x])
    }
    if ((board[i - 1 + x] == 1) && ((i % x) != 0) && ((i - 1 + x) < (board.length - 1))) {
        neighbours.push(board[i - 1 + x])
    }
    if ((board[i - 1 - x] == 1) && ((i % x) != 0) && ((i - 1 - x) >= 0)) {
        neighbours.push(board[i - 1 - x])
    }
    return neighbours.length;
}
function getAllNeighbours(board, x) {
    var allNeighbours = [];
    for (var i = 0; i < board.length; i++) {
        allNeighbours.push(getNeighbours(board, i, x))

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

var Board = React.createClass({
    getInitialState: function () {
        return {
            board: boardConstructor(20, 20),
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
        if (board.indexOf(1) == -1) {
            clearInterval(this.interval);
        }

    },
    runGame: function () {

        this.interval = setInterval(this.life, 100);

    },
    stopGame: function () {
        clearInterval(this.interval);
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
    getBox: function () {
        var same = this;
        const cellStyle = {
            clear: 'both'
        };
        var board = this.state.board;
        var boardList = board.map(function (item, index) {
            if (item == null) {
                if (((index % same.state.xBoard) == 0) && (index != 0)) {
                    return <div onClick={same.checkCell} style={cellStyle} id={index} className='empty'></div>
                } else {
                    return <div onClick={same.checkCell} id={index} className='empty'></div>
                }
            } else {
                if (((index % same.state.xBoard) == 0) && (index != 0)) {
                    return <div onClick={same.checkCell} style={cellStyle} id={index} className='full'></div>
                } else {
                    return <div onClick={same.checkCell} id={index} className='full'></div>
                }
            }

        });
        return (boardList)
    },
    newBoard: function (e) {
        this.setState({
            board: boardConstructor(e.target.getAttribute('data-x'), e.target.getAttribute('data-y')),
            xBoard: e.target.getAttribute('data-x'),
            yBoard: e.target.getAttribute('data-y')
        })

    },

    render: function () {
        return (<div>
                <div className='indicator'>Generation: {this.state.generation}</div>
                <div className='grid'>
                    {this.getBox()}
                </div>
                <div className="controlPannel">
                    <button onClick={this.newBoard} data-x={20} data-y={20}>20x20</button>
                    <button onClick={this.newBoard} data-x={30} data-y={20}>30x20</button>
                    <button onClick={this.newBoard} data-x={40} data-y={20}>40x20</button>
                    <button onClick={this.runGame}>Run</button>
                    <button onClick={this.stopGame}>Stop</button>
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