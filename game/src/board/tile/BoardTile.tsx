import React from 'react';
import Player from '../../player/Player';
import { tileRules } from './boardData';
import './tile.css';

interface ITile {
    tileValue: number,
    id: string,
    theme?: string
}

interface ITileState {
    player: boolean
}

export class Tile extends React.Component<ITile, ITileState> {
    constructor(props: ITile) {
        super(props);
        this.state = {
            player: false
        }
    }

    componentDidMount() {
        let tileDiv = document.getElementById(this.props.id);
        if (tileDiv && this.props.tileValue === 1) {
            tileDiv.className = "tile tile-path";
        }
    }

    onPlayerLand = (player: any) => {
        this.setState({player: true}, () => {
            player.accept(tileRules[this.props.tileValue]);
        });
    }

    onPlayerLeave = () => {
        this.setState({player: false});
    }

    render() {
        return <div id={this.props.id} className="tile"></div>
    }
}