import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet, Modal, View, FlatList, Button, TextInput} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBackspace, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core'
import {numpadToNum} from '../utils/index'
import DatePicker from 'react-native-date-picker'
import {TouchableWithoutFeedback} from 'react-native'

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
const displayInput = (input, positif) => {
    var inputText = ""
    input.map(x=>inputText+=x)
    if (inputText.length == 1){
        inputText = '0,0'+inputText+' €'
    }
    else if (inputText.length == 2){
        inputText = '0,'+inputText+' €'
    }
    else if (inputText.length == 3){
        inputText = inputText[0]+','+inputText[1]+inputText[2]+' €'
    }
    else if (inputText.length >= 4){
        inputText = inputText.slice(0,-2)+','+inputText.slice(-2)+' €'
    }
    else {
        inputText = '0,00 €'
    }

    if(positif){
        inputText = '+'+inputText
    }
    return(
        <View style={styles.input}>
            <Text style={styles.inputText}>
                {inputText} 
            </Text>
        </View>
        
    )
}
const displayCommentInput = (comment, setComment) => {
    return (
        <View style={styles.commentInput}>
            <TextInput style={styles.commentText} placeholder='Commentaire' value={comment} onChangeText={setComment}/>
        </View>
    )
}
const renderBudgetLabel = (item, selectedBudget, setSelectedBudget) => {
    const displayCheck = (id) => {
        if (id === selectedBudget){
            return(
                <FontAwesomeIcon icon={faCheck} color='white' size={15} style={styles.checkInLabel}/>
            )
        }
    }
    return(
        <TouchableOpacity style={styles.budgetLabel} onPress={()=>
        (selectedBudget === item.id) ? setSelectedBudget(null) : setSelectedBudget(item.id)}>
            {displayCheck(item.id)}
            <Text style={styles.budgetLabelText}>{item.title}</Text>
        </TouchableOpacity>
    )     
}
const displayBudgetSelector = (budgets, selectedBudget, setSelectedBudget) => {
    return(
        <View style={styles.budgetSelector}>
            <FlatList 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={budgets}
                keyExtractor={(_,index)=>index.toString()}
                renderItem={({item, index})=>renderBudgetLabel(item, selectedBudget, setSelectedBudget)}
            />
        </View>
        
    )
}
const displayNumPad = (input, setInput, positif, setPositif) => {
    const dispatch = useDispatch()
    return(
        <View style={styles.numPad}>
            <View style={styles.padRow}>
                <TouchableOpacity onPress={()=>{setInput([...input, 1])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setInput([...input, 2])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setInput([...input, 3])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    3
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.padRow}>
                <TouchableOpacity onPress={()=>{setInput([...input, 4])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    4
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setInput([...input, 5])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    5
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setInput([...input, 6])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    6
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.padRow}>
                <TouchableOpacity onPress={()=>{setInput([...input, 7])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    7
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setInput([...input, 8])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    8
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setInput([...input, 9])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    9
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.padRow}>
                <TouchableOpacity style={styles.padItem} onPress={()=>{
                    setPositif(!positif)
                }}>
                    <FontAwesomeIcon icon={faPlus} color='#8a8a8a' size={30} style={styles.padIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setInput([...input, 0])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    0
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                        dispatch({type:'CLEAN_OPS'}) //dev
                        dispatch({type:'CLEAN_BUDGETS'}) //dev
                        dispatch({type:'CLEAN_RECURENCES'}) //dev
                        var inputCopy = [...input]
                        inputCopy.splice(-1,1)
                        setInput(inputCopy)
                    }} style={styles.padItem}>
                    <FontAwesomeIcon icon={faBackspace} color='#8a8a8a' size={30} style={styles.padIcon}/>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}
const inputScreen = () => {
    const [input, setInput] = React.useState(Array)
    const [positif, setPositif] = React.useState(false)
    const [selectedBudget, setSelectedBudget] = React.useState(null)
    const [date, setDate] = React.useState(new Date())
    const [comment, setComment] = React.useState('')
    const budgets = useSelector(state=>state.budgets)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    React.useEffect(()=>{
        navigation.setOptions({headerRight:()=>(
                <TouchableOpacity style={{padding:10, alignItems:'center', backgroundColor:'white'}} onPress={()=>{
                    inputInNum = numpadToNum(input, positif)
                    dispatch({type:'ADD_OP', value:[inputInNum, selectedBudget, date, comment]})
                    selectedBudget ? dispatch({type:'AFFECT_TO_BUDGET', value:[selectedBudget, inputInNum]}) : null
                    setInput([])
                    setSelectedBudget(null)
                    setPositif(false)
                    setComment('')
                }}>
                    <Text style={{color:'#007AFF', fontSize:18}}>OK</Text>
                </TouchableOpacity>
            )
        })
    }, [input, positif, selectedBudget, date, comment])
    return(
        <View style={styles.container}>
            {displayDatePicker(date, setDate)}
            {displayInput(input, positif)}
            {displayCommentInput(comment, setComment)}
            {displayBudgetSelector(budgets, selectedBudget, setSelectedBudget)}
            {displayNumPad(input, setInput, positif, setPositif)}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    datePickerLabel:{
        flex:1,
        justifyContent:'center'
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
    input:{
        flex:6,
        justifyContent:'center',
        
    },
    budgetSelector:{
        flex:1,
        paddingHorizontal:10
    },
    numPad:{
        flex:7
    },
    inputText:{
        textAlign:'center',
        fontSize:90,
        fontWeight:'100',
        padding:30
    },
    padRow:{  
        flexDirection:'row',
        flex:1
    },
    padItem:{
        flex:1,
        justifyContent:'center'
    },
    padText:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'200'
    },
    padIcon:{
        alignSelf:'center'
    },
    budgetLabel:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#a1cae2',
        marginVertical:5,
        marginHorizontal:5,
        padding:10,
        borderRadius:14

    },
    budgetLabelText:{
        fontSize:16,
        textTransform:'capitalize'
    },
    checkInLabel:{
        marginRight:8
    },
    commentInput:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    commentText:{
        fontSize:20,
        width:'100%',
        textAlign:'center'
    }
})

export default inputScreen