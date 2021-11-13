import * as React from 'react'
import {useNavigation} from '@react-navigation/core'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {numInputCheck, countDecimals} from '../utils/index'
import { useDispatch } from 'react-redux'

const addBudgetScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const [recurenceName, setRecurenceName] = React.useState(null)
    const [recurenceValue, setRecurenceValue] = React.useState(null)
    const [recurenceDay, setRecurenceDay] = React.useState(null)
    const [recurenceDebit, setRecurenceDebit] = React.useState(true)
    React.useEffect(()=>{
        navigation.setOptions({headerRight:()=>(
                <TouchableOpacity style={{padding:10, alignItems:'center', backgroundColor:'white'}} onPress={()=>{
                    if(!recurenceName || recurenceName === ""){
                        alert('La nouvelle opération doit avoir un nom !')
                    }
                    else if(!recurenceDay 
                        || recurenceDay === "" 
                        || !numInputCheck(recurenceDay) 
                        || countDecimals(recurenceDay) !== 0
                        || parseInt(recurenceDay) < 1
                        || parseInt(recurenceDay) > 31){
                        alert('Jour de récurence invalide !')
                    }
                    else if(!numInputCheck(recurenceValue)){
                        alert('Le montant doit être un nombre.')
                    }
                    else if(countDecimals(recurenceValue) >= 3){
                        alert('Montant invalide.')
                    }
                    else{
                        value = parseFloat(recurenceValue)
                        recurenceDebit ? value = value*-1 : null
                        day = parseInt(recurenceDay)
                        dispatch({type:"ADD_RECURENCE", value:[recurenceName, value, day]})
                        setRecurenceValue(null)
                        setRecurenceName(null)
                        setRecurenceDay(null)
                        navigation.goBack()
                    }                           
                }}>
                    <Text style={{color:'#007AFF', fontSize:18}}>OK</Text>
                </TouchableOpacity>
            )
        })
    }, [recurenceName, recurenceValue, recurenceDay, recurenceDebit])
    return(
        <View style={styles.container}>
            <View style={styles.button}>
                <TouchableOpacity style={styles.buttonPartL}
                onPress={()=>setRecurenceDebit(true)}>
                    <Text style={[styles.buttonTitle, (recurenceDebit ?  {fontWeight:'400'} : null)]}>DEBIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPartR}
                onPress={()=>setRecurenceDebit(false)}>   
                <Text style={[styles.buttonTitle, (recurenceDebit ?  null : {fontWeight:'400'})]}>CREDIT</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputs}>
                <Text style={styles.sectionTitle}>Nom de l'opération</Text>
                <TextInput placeholder='Nom de la récurence' style={styles.textInput} value={recurenceName} onChangeText={setRecurenceName}/>
                <Text style={styles.sectionTitle}>Montant</Text>
                <TextInput placeholder='Montant' style={styles.textInput} keyboardType='numeric' value={recurenceValue} onChangeText={setRecurenceValue}/>
                <Text style={styles.sectionTitle}>Jour de débit</Text>
                <TextInput placeholder='1-31' style={styles.textInput} keyboardType='numeric' value={recurenceDay} onChangeText={setRecurenceDay}/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    inputs:{
        flex:18
    },
    sectionTitle:{
        fontSize:16,

    },
    textInput:{
        margin:10,
        padding:10,
        backgroundColor:'white',
    },
    button:{
        width:'100%',
        flex:1,
        flexDirection:'row',
        padding:8,
        marginBottom:5
    },
    buttonPartL:{
        backgroundColor:'#f092a2',
        width:'50%',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        justifyContent:'center'
    },
    buttonPartR:{
        backgroundColor:'#a0f092',
        width:'50%',
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        justifyContent:'center'
    },
    buttonTitle:{
        fontSize:22,
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'200'
    }
})

export default addBudgetScreen