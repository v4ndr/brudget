const numpadToNum = (input, positif) => {
    input = input.join('')
    if (input == ""){
        input = "0"
    }
    input = parseFloat(input)
    input = input/100
    if (!positif) input = input*(-1)

    return input
}

export default numpadToNum