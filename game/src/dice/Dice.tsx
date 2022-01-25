import React from 'react';
import './dice.css';

interface IDSixProps {
    id: number
}

interface IDSixState {
    face: number;
}

const classMap = {
    1: 'one-top',
    2: 'two-top',
    3: 'three-top',
    4: 'four-top',
    5: 'five-top',
    6: 'six-top'
}

// A D6 - 6-sided die
export class DSix extends React.Component<IDSixProps, IDSixState> {
    constructor(props: IDSixProps) {
        super(props);
        this.state = {
            face: 1
        }
    }

    async roll() {
        let face = Math.floor(Math.random() * 6) + 1;
        this.setState({face: face}, () => {
            let die = document.getElementById(`Die-${this.props.id}`);
            if (die) {
                die.className = `dice ${classMap[face]}`;
            }
        });
    }

    render() {
        return (
            <div id={`Die-${this.props.id}`} className="dice">
                <div className="face top">
                    <div className="dots-wrapper">
                        <div className="dot top-dot"></div>
                    </div>
                </div>
                <div className="face bottom">
                    <div className="dots-wrapper">
                        <div className="dot bottom-dot-1"></div>
                        <div className="dot bottom-dot-2"></div>
                        <div className="dot bottom-dot-3"></div>
                        <div className="dot bottom-dot-4"></div>
                        <div className="dot bottom-dot-5"></div>
                        <div className="dot bottom-dot-6"></div>
                    </div>
                </div>
                <div className="face left">
                    <div className="dots-wrapper">
                        <div className="dot left-dot-1"></div>
                        <div className="dot left-dot-2"></div>
                        <div className="dot left-dot-3"></div>
                    </div>
                </div>
                <div className="face right">
                    <div className="dots-wrapper">
                        <div className="dot right-dot-1"></div>
                        <div className="dot right-dot-2"></div>
                        <div className="dot right-dot-3"></div>
                        <div className="dot right-dot-4"></div>
                    </div>
                </div>
                <div className="face front">
                    <div className="dots-wrapper">
                        <div className="dot front-dot-1"></div>
                        <div className="dot front-dot-2"></div>
                    </div>
                </div>
                <div className="face back">
                    <div className="dots-wrapper">
                        <div className="dot back-dot-1"></div>
                        <div className="dot back-dot-2"></div>
                        <div className="dot back-dot-3"></div>
                        <div className="dot back-dot-4"></div>
                        <div className="dot back-dot-5"></div>
                    </div>
                </div>
            </div>
        )
    }
}