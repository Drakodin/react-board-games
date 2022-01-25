const dummy = () => {
    console.log("Here!");
}

const nondefined = () => {
    console.log("Not here!")
}

/**
 * Every tile in the board game has it's own event. Some can be common,
 * some can be special. What gives the event is this constant which maps
 * an integer value given to a tile to a function that the tile will have
 * the player trigger.
 */
export const tileRules: {[key: number]: () => any} = {
    0: nondefined,
    1: dummy
}