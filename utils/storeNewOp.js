import AsyncStorage from '@react-native-async-storage/async-storage'
import { v4 as uuidv4 } from 'uuid';

const genOpObj = (value) => {
    value = value.join('')
    if (value == ""){
        value = "0"
    }
    value = parseFloat(value)
    value = value/100
    let date = new Date()
    date = date.toLocaleDateString('fr-FR')
    let op = {
        "date":date,
        "data":[
            {
                "id":uuidv4(),
                "cat":"none",
                "value":value,
                "comment":"",
                "checked":false
            }
        ]
    }

    return op
}

const storeNewOp = async (input) => {
    const op = genOpObj(input)
    try{
        const ops = await AsyncStorage.getItem('ops')
        let newOps = JSON.parse(ops)
        if(!newOps){
            newOps = []
        }
        newOps.push(op)
        try {
            await AsyncStorage.setItem('ops', JSON.stringify(newOps))
            .then(()=>{console.log('nouvelle op stock')})
            .catch(()=>{console.log('erreur dans stock op')})
        }
        catch(e){
            console.log('erreur ecriture storage ops')
        }
    }
    catch(e){
        console.log('erreur acces ops du storage', e)
    }
}

export default storeNewOp