/**
 * Created by Iaroslav Zhbankov on 22.01.2017.
 */
var xBoard = 5;
var yBoard = 5;
var board = [];
for (var i = 0; i < xBoard; i++)
    for (var j = 0; j < yBoard; j++) {
        board.push(null);
    }

function randomCreature(arr) {
    var counter = 0;
    for (var i = 0; i < arr.length; i++) {
        if ((Math.round(Math.random()) == 1) && (counter < Math.round(arr.length / 3))) {
            arr[i] = 1;
            counter++;
        }
    }
    return arr;
}

board = randomCreature(board);
console.log(board);

var Board = React.createClass({
    getInitialState: function () {
        return {
            board: board
        }
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
        var boardLis = board.map(function (item, index) {
            if (item == null) {
                return <div onClick={same.checkCell} id={index} className='empty'></div>
            } else {
                return <div onClick={same.checkCell} id={index} className='full'></div>
            }
        });
        return (boardLis)
    },
    render: function () {
        return (
            <div className='container'>
                {this.getBox(this.props.board)}
            </div>
        )
    }
});

ReactDOM.render(
    <Board board={board}/>,
    document.getElementById('box')
);
