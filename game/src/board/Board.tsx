import React from 'react';
import Player from '../player/Player';
import { Tile } from './tile/BoardTile';
import { DSix } from '../dice/Dice';
import './board.css';

interface BoardProps {
    board: number[], // A 1D array containing the board's value-event data
    width: number, // The number of columns in the board. This impacts board rendering
    path: number[] // The indices of valid path blocks (anything with value > 0)
}

interface BoardState {
    players: JSX.Element[] // All player elements. These are not class references.
    current: any // The id number of the player who gets to move.
    tiles: JSX.Element[], // All tile elements. These are not class references.
}

export default class Board extends React.Component<BoardProps, BoardState> {
    // References to tiles, dice, and players stored as properties
    // State updates async so in order for sync, they must be separate
    tileRefs: any[] = [];
    diceRefs: any[] = [];
    playerRefs: any[] = [];
    playerId: number = 0;
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            players: [],
            current: undefined,
            tiles: [],
        }
        // Binding functions to class to prevent global this errors
        this.rollDice = this.rollDice.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
    }
    componentDidMount() {
        // Create tiles based on incoming 1D board data
        let tiles = this.props.board.map(
            (v, i) => <Tile
                        tileValue={v}
                        ref={(el: any) => this.tileRefs[i] = el}
                        key={`Tile:${Math.floor(i / this.props.width)}-${i % this.props.width}`}
                        id={`Tile:${Math.floor(i / this.props.width)}-${i % this.props.width}`}
                    />
        );
        this.setState({tiles: tiles});
    }

    /**
     * Asynchronous function to roll dice. Allows for waiting for the dice to completely roll
     * (setting their state) before executing player movement. Players are moved along the path
     * by the value on the die.
     * 
     * There are two positions used here: index in the path array and the actual index along
     * all tiles. These numbers are different. Index in the path array is used to determine
     * which valid path space the player should be on next. The index among all tiles
     * is used to calculate how to place the player on said tile.
     * 
     * After a player has moved and the tile event has been fired, the next player's turn will start
     */
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

    /**
     * Adds a player to the active Board and places them on the defined start location.
     * 
     * An increase in players means each player gets a turn, but whoever currently has
     * the turn will not lose it.
     */
    async addPlayer() {
        let initPosId = this.tileRefs[0].props.id;
        let actTile = document.getElementById(initPosId) as HTMLDivElement;
        let rect = actTile.getBoundingClientRect()
        let player = <Player key={this.playerId} top={rect.top + 25} left={rect.left + 25} initialPosition={0} ref={el => this.playerRefs.push(el)}/>
        this.playerId += 1;
        this.setState({players: [...this.state.players, player]}, () => {
            this.setState({current: this.state.current})
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
