import * as React from 'react'
import {useNavigation} from '@react-navigation/core'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {numInputCheck, countDecimals} from '../utils/index'
import { useDispatch } from 'react-redux'

const addBudgetScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const [budgetName, setBudgetName] = React.useState(null)
    const [budgetValue, setBudgetValue] = React.useState(null)
    React.useEffect(()=>{
        navigation.setOptions({headerRight:()=>(
                <TouchableOpacity style={{padding:10, alignItems:'center', backgroundColor:'white'}} onPress={()=>{
                    if(!budgetName || budgetName === ""){
                        alert('Le nouveau budget doit avoir un nom !')
                    }
                    else if(!numInputCheck(budgetValue)){
                        alert('Le montant doit être un nombre.')
                    }
                    else if(countDecimals(budgetValue) >= 3){
                        alert('Montant invalide.')
                    }
                    else{
                        dispatch({type:"ADD_BUDGET", value:[budgetName, budgetValue]})
                        setBudgetValue(null)
                        setBudgetName(null)
                        navigation.goBack()
                    }                           
                }}>
                    <Text style={{color:'#007AFF', fontSize:18}}>OK</Text>
                </TouchableOpacity>
            )
        })
    }, [budgetName, budgetValue])
    return(
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Nom du nouveau budget</Text>
            <TextInput placeholder='Nom du budget' style={styles.textInput} value={budgetName} onChangeText={setBudgetName}/>
            <Text style={styles.sectionTitle}>Montant mensuel</Text>
            <TextInput placeholder='Montant mensuel' style={styles.textInput} keyboardType='numeric' value={budgetValue} onChangeText={setBudgetValue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    sectionTitle:{
        fontSize:16
    },
    textInput:{
        margin:10,
        padding:10,
        backgroundColor:'white'
    }
})

export default addBudgetScreen
