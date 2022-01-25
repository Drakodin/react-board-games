import React from 'react';
import { DSix } from './dice/Dice';

export const DiceTest = () => {
    let ref1: any = React.useRef();
    let ref2: any = React.useRef();

    const rollDice = async () => {
        if (ref1 && ref2) {
            let curr = ref1.current;
            let curr2 = ref2.current;
            await curr.roll();
            await curr2.roll();

            let sumDisp = document.getElementById('roll-sum');
            if (sumDisp) {
                sumDisp.innerText = curr.state.face + curr2.state.face;
            }
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <div style={{height: '100px'}}></div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '400px'}} onClick={rollDice}>
                <div>
                    <DSix id={2} ref={(el: any) => ref2.current = el} />
                </div>
                <div>
                    <DSix id={1} ref={(el: any) => ref1.current = el} />
                </div>
            </div>
            <div style={{height: '100px'}}></div>
            <div id="roll-sum" style={{fontSize: '20px'}}></div>
        </div>
    )
}