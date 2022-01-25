import React from 'react';
import Player from '../player/Player';
import { Tile } from './tile/BoardTile';
import { DSix } from '../dice/Dice';
import ReactDOMServer from 'react-dom/server';
import './board.css';

interface BoardProps {
    board: number[],
    width: number,
    path: number[]
}

interface BoardState {
    players: JSX.Element[]
    current: any
    path: number[]
    tiles: JSX.Element[],
}

export default class Board extends React.Component<BoardProps, BoardState> {
    tileRefs: any[] = [];
    diceRefs: any[] = [];
    playerRefs: any[] = [];
    playerId: number = 0;
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            players: [],
            current: undefined,
            path: [],
            tiles: [],
        }
        this.rollDice = this.rollDice.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
    }
    componentDidMount() {
        // Determine path loop, default top-left valid square
        let tiles = this.props.board.map(
            (v, i) => <Tile
                        tileValue={v}
                        ref={(el: any) => this.tileRefs[i] = el}
                        key={`Tile:${Math.floor(i / this.props.width)}-${i % this.props.width}`}
                        id={`Tile:${Math.floor(i / this.props.width)}-${i % this.props.width}`}
                    />
        );
        this.setState({tiles: tiles, path: this.props.path});
    }

    async rollDice() {
        await this.diceRefs[0].roll();

        let sum = this.diceRefs[0].state.face;
        if (this.state.current !== undefined) {
            this.tileRefs[this.playerRefs[this.state.current].state.position].onPlayerLeave();
            // Calculate the position required for the player chip
            let position = (this.playerRefs[this.state.current].state.idx + sum) % this.props.path.length;
            let id = this.tileRefs[this.props.path[position]].props.id;
            let actTile = document.getElementById(id) as HTMLDivElement;
            let rect = actTile.getBoundingClientRect()

            this.playerRefs[this.state.current].updatePosition({dist: sum, idx: position, path: this.props.path, pathLength: this.props.path.length, top: (rect.top + 25), left: (rect.left + 25)});
            this.tileRefs[this.props.path[position]].onPlayerLand(this.playerRefs[this.state.current]);
            
            this.setState({current: (this.state.current + 1) % this.playerRefs.length})
        }
    }

    async addPlayer() {
        let initPosId = this.tileRefs[0].props.id;
        let actTile = document.getElementById(initPosId) as HTMLDivElement;
        let rect = actTile.getBoundingClientRect()
        let player = <Player key={this.playerId} top={rect.top + 25} left={rect.left + 25} initialPosition={0} ref={el => this.playerRefs.push(el)}/>
        this.playerId += 1;
        this.setState({players: [...this.state.players, player]}, () => {
            this.setState({current: 0})
        })
    }

    render() {
        return (
            <div className="board">
                <div className="dice-container">
                    <div className="dice-hitbox" onClick={this.rollDice}>
                        <DSix id={1} ref={(el: any) => this.diceRefs[0] = el} />
                    </div>
                </div>
                <div className="board-root" style={{gridTemplateColumns: `repeat(${this.props.width}, 1fr)`}}>
                    {this.state.tiles}
                </div>
                <div>
                    {this.state.players}
                </div>
                <div className="space-divider">
                </div>
                <button onClick={this.addPlayer}>Add Player</button>
            </div>
        )
    }
}
