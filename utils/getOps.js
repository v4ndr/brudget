import AsyncStorage from '@react-native-async-storage/async-storage'

const getOps = async () => {
    try{
        const ops = await AsyncStorage.getItem('ops')
        return JSON.parse(ops)
    }
    catch(e){
        console.log('erreur acces storage ops', e)
    }
}

export default getOps