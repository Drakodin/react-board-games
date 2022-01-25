const dummy = () => {
    console.log("Here!");
}

const nondefined = () => {
    console.log("Not here!")
}

export const tileRules: {[key: number]: () => any} = {
    0: nondefined,
    1: dummy
}