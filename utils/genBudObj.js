import { v4 as uuidv4 } from 'uuid';

const genBudObj = ([name, value]) => {
    value = parseFloat(value)
    let bud = {
        "id":uuidv4(),
        "title":name,
        "total":value,
        "actual":0,
        "color":"#c2b092"
    }

    return bud
}

export default genBudObj