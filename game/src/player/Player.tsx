import React from 'react';
import './player.css';

interface IPlayerProps {
    // Add what you want players to have when they are made
    initialPosition: number;

    // Actual positioning for the board
    top: number;
    left: number;
}

interface IPlayerState {
    // Add what you want to track for each player
    position: number;

    // Actual positioning for the board
    idx: number;
    top: number;
    left: number;
}

export default class Player extends React.Component<IPlayerProps, IPlayerState> {
    constructor(props: IPlayerProps) {
        super(props);
        this.state = {
            position: 0,
            idx: 0,
            top: 0,
            left: 0
        }
    }

    componentDidMount() {
        this.setState({position: this.props.initialPosition, top: this.props.top, left: this.props.left});
    }

    updatePosition(params: {dist: number, idx: number, path: number[], pathLength: number, top: number, left: number}) {
        let idx = (this.state.position + params.dist) % params.pathLength;
        this.setState({position: params.path[idx], idx: params.idx, top: params.top, left: params.left});
    }

    accept(tileEvent: () => any) {
        tileEvent();
    }

    // If you want to add any other functions, add them here!

    // This renders in a player.
    render() {
        return (
            <div className="player" style={{top: this.state.top, left: this.state.left}}>
            </div>
        )
    }
}