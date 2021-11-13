const strToDevise = (str)=>{
    str = str.toString()
    subStr = str.split('.')
    subStr[1] ? 
        (subStr[1].length === 1 ? 
            str = str+'0' 
            : null) 
        : str = str+'.00'
    return str
}

export default strToDevise