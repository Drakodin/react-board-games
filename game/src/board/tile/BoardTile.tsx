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

    /**
     * An EventListener-like function only called when a player reaches this
     * Tile. The function will take the associated event function and have
     * the player execute it within their own state.
     * 
     * @param player A reference to the player. Refs are initially undefined
     * but this function will fire when the ref is defined. However, the type
     * of the ref is complicated so instead this parameter is marked as "any"
     */
    onPlayerLand = (player: any) => {
        this.setState({player: true}, () => {
            player.accept(tileRules[this.props.tileValue]);
        });
    }

    /**
     * Sets whether or not there is a player/players on the Tile to false.
     */
    onPlayerLeave = () => {
        this.setState({player: false});
    }

    render() {
        return <div id={this.props.id} className="tile"></div>
    }
}