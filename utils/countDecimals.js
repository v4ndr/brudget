const countDecimals = (num) => {
    num = parseFloat(num)
    if(Math.floor(num) === num) return 0;
    return num.toString().split(".")[1].length || 0;
}

export default countDecimals