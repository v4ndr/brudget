import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, FlatList} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBackspace, faCheck } from '@fortawesome/free-solid-svg-icons'
import budgets from '../data/budgets.json'

const displayInput = (input) => {
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

    return(
        <View style={styles.input}>
            <Text style={styles.inputText}>
                {inputText} 
            </Text>
        </View>
        
    )
}

const displayNumPad = (input, setInput) => {
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
                <TouchableOpacity onPress={()=>{
                        var inputCopy = [...input]
                        inputCopy.splice(-1,1)
                        setInput(inputCopy)
                    }} style={styles.padItem}>
                    <FontAwesomeIcon icon={faBackspace} color='#8a8a8a' size={30} style={styles.padIcon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setInput([...input, 0])}} style={styles.padItem}>
                    <Text style={styles.padText}>
                    0
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.padItem}>
                    <FontAwesomeIcon icon={faCheck} color='#8a8a8a' size={30} style={styles.padIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const renderBudgetLabel = (title, index) => {
    const checked = 0
    const displayCheck = (idx) => {
        if (idx === checked){
            return(
                <FontAwesomeIcon icon={faCheck} color='white' size={15} style={styles.checkInLabel}/>
            )
        }
    }
    return(
        <TouchableOpacity style={styles.budgetLabel}>
            {displayCheck(index)}
            <Text style={styles.budgetLabelText}>{title}</Text>
        </TouchableOpacity>
    )     
}
const displayBudgetSelector = () => {
    return(
        <View style={styles.budgetSelector}>
            <FlatList 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={budgets}
                keyExtractor={(_,index)=>index.toString()}
                renderItem={({item, index})=>renderBudgetLabel(item.title, index)}
            />
        </View>
        
    )
}
  
const inputScreen = () => {
    const [input, setInput] = React.useState(Array)
    return(
        <View style={styles.container}>
            {displayInput(input)}
            {displayBudgetSelector()}
            {displayNumPad(input, setInput)}
        </View>
    )
}
  
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input:{
        flex:7,
        justifyContent:'center',
        
    },
    budgetSelector:{
        flex:1,
        paddingHorizontal:10
    },
    numPad:{
        flex:8
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
    }
})

export default inputScreen