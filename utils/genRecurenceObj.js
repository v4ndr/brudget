import { v4 as uuidv4 } from 'uuid';

const genRecurenceObj = ([name, value, day]) => {
    let rec = {
        "id":uuidv4(),
        "title":name,
        "value":value,
        "day":day
    }

    return rec
}

export default genRecurenceObj
