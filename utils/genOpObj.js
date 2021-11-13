import { v4 as uuidv4 } from 'uuid'

const genOpObj = (value, budget, recurent, date, comment) => {
    if(!date){
        date = new Date()
    }
    let op = {
        "date":date.toString(),
        "id":uuidv4(),
        "budget":budget,
        "value":value,
        "comment":comment,
        "checked":false,
        "recurent":recurent
    }
    return op
}

export default genOpObj