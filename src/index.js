import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Function Components
function Square(props){
    return (
        <button
            className="square"
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        // if someone has won the game or if a Square is already filled
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext? 'X' : 'O';
        console.log(squares);
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSqaure(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={ () => this.handleClick(i)}
            />
        );
    }
    render() {

        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="border-row">
                    {this.renderSqaure(0)}{this.renderSqaure(1)}{this.renderSqaure(2)}
                </div>
                <div className="border-row">
                    {this.renderSqaure(3)}{this.renderSqaure(4)}{this.renderSqaure(5)}
                </div>
                <div className="border-row">
                    {this.renderSqaure(6)}{this.renderSqaure(7)}{this.renderSqaure(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-boarder">
                    <Board />
                </div>
                <div className="game-info">
                    <div></div>
                    <ol></ol>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));