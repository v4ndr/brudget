const numInputCheck = (input) => {
    if (typeof input != "string") return false
    return !isNaN(input) && 
            !isNaN(parseFloat(input)) 
}

export default numInputCheck