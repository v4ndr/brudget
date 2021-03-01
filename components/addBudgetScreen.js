import * as React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'

const addBudgetScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Nom du nouveau budget</Text>
            <TextInput placeholder='Nom du budget' style={styles.textInput}/>
            <Text style={styles.sectionTitle}>Montant total</Text>
            <TextInput placeholder='Montant' style={styles.textInput} keyboardType='numeric'/>
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