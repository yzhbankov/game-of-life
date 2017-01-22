/**
 * Created by Iaroslav Zhbankov on 22.01.2017.
 */



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
function getNeighbours(board, i, j, x, y) {
    var neighbours = [];
    if (board[i + 1]) {
        neighbours.push(board[i + 1])
    }
    if (board[i - 1]) {
        neighbours.push(board[i - 1])
    }
    if (board[j + 1]) {
        neighbours.push(board[j + 1])
    }
    if (board[j - 1]) {
        neighbours.push(board[j - 1])
    }
    
    if (board[i + 1]) {
        neighbours.push(board[i + 1])
    }
    if (board[i + 1]) {
        neighbours.push(board[i + 1])
    }
    if (board[i + 1]) {
        neighbours.push(board[i + 1])
    }
    if (board[i + 1]) {
        neighbours.push(board[i + 1])
    }
}
function gameRunning(board) {

}

var xBoard = 20;
var yBoard = 20;
var board = boardConstructor(xBoard, yBoard);


var Board = React.createClass({
    getInitialState: function () {
        return {
            board: board
        }
    },
    runGame: function () {

    },
    checkCell: function (e) {
        var index = e.target.id;
        if (e.target.className == 'empty') {
            board[index] = 1;
        } else {
            board[index] = null
        }
        this.setState({
            board: board
        })
    },
    getBox: function (board) {
        var same = this;
        const cellStyle = {
            clear: 'both'
        };
        var boardLis = board.map(function (item, index) {
            if (item == null) {
                if ((index) % xBoard == 0) {
                    return <div onClick={same.checkCell} style={cellStyle} id={index} className='empty'></div>
                } else {
                    return <div onClick={same.checkCell} id={index} className='empty'></div>
                }
            } else {
                if ((index) % xBoard == 0) {
                    return <div onClick={same.checkCell} style={cellStyle} id={index} className='full'></div>
                } else {
                    return <div onClick={same.checkCell} id={index} className='full'></div>
                }
            }

        });
        return (boardLis)
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
                <div className="controlPannel">
                    <button onClick={this.newBoard} data-x={20} data-y={20}>20x20</button>
                    <button onClick={this.newBoard} data-x={30} data-y={20}>30x20</button>
                    <button onClick={this.newBoard} data-x={40} data-y={20}>40x20</button>
                    <button onClick={this.runGame}>Run</button>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <Board board={board}/>,
    document.getElementById('box')
);
