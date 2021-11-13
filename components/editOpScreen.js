import * as React from 'react'
import {useNavigation} from '@react-navigation/core'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Modal, TouchableWithoutFeedback} from 'react-native'
import {numInputCheck, countDecimals} from '../utils/index'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-native-date-picker'

const addBudgetScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const [budgetName, setBudgetName] = React.useState(null)
    const [budgetValue, setBudgetValue] = React.useState(null)
    const [date, setDate] = React.useState(new Date())
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

    const displayDatePicker = (date, setDate) => {
        const [modalVisible, setModalVisible] = React.useState(false)
        day = date.getDate()
        month = date.getMonth()+1
        day < 10 ? day = '0'+day : null
        month < 10 ? month = '0'+month : null
        buttonTitle = day+'/'+month+'/'+date.getFullYear()
        return (
            <>
            <View style={styles.datePickerLabel}>
                <Button title={buttonTitle} onPress={()=>setModalVisible(true)}/>
            </View>
            <Modal
                    animationType='slide'
                    visible={modalVisible}
                    transparent={true}
                    onRequestClose={()=>setModalVisible(false)}
                > 
                <TouchableWithoutFeedback onPress={()=>{setModalVisible(false)}}>
                    <View style={styles.datePickerModalContainer}>
                    <TouchableWithoutFeedback >
                        <View style={styles.datePickerModal}>
    
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode={'date'}
                            locale={'fr'}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    </View> 
                </TouchableWithoutFeedback>
            </Modal>
            </>
        )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Nom de l'opération (str)</Text>
            <TextInput placeholder='Nom du budget' style={styles.textInput} value={budgetName} onChangeText={setBudgetName}/>
            <Text style={styles.sectionTitle}>Montant (numeric)</Text>
            <TextInput placeholder='Montant mensuel' style={styles.textInput} keyboardType='numeric' value={budgetValue} onChangeText={setBudgetValue}/>
            <Text style={styles.sectionTitle}>Budget (list select)</Text>
            <TextInput placeholder='Montant mensuel' style={styles.textInput} keyboardType='numeric' value={budgetValue} onChangeText={setBudgetValue}/>
            <Text style={styles.sectionTitle}>Pointé (checkbox)</Text>
            <TextInput placeholder='Montant mensuel' style={styles.textInput} keyboardType='numeric' value={budgetValue} onChangeText={setBudgetValue}/>
            <Text style={styles.sectionTitle}>Date</Text>
            {displayDatePicker(date, setDate)}
            
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
    },
    datePickerLabel:{

    },
    datePickerModalContainer:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    datePickerModal:{
        width:'100%',
        alignItems:'center',
        backgroundColor:'white'
    },
})

export default addBudgetScreen
