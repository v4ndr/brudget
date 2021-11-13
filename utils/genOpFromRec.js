import {genOpObj} from './index'

const genOpFromRec = ([name, value, day]) => {    
    today = new Date()
    month = today.getMonth()
    year = today.getFullYear()
    if (day < today.getDate()){
        month++
        if(month > 11){
            month = 0
            year++
        }
    }
    if (day > 28 && month === 1) day = 28
    if (day === 31 && [1, 3, 5, 8, 10].includes(month)) day = 30
    date = new Date(year, month, day)
    return genOpObj(value, null, true, date, name)
}

export default genOpFromRec


