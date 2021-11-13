import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const FAB = (props) => {
    const navigation = useNavigation()
    return (
        <View style={styles.FABContainer}>
            <TouchableOpacity style={styles.FAB} onPress={()=>{
                navigation.navigate('editOpScreen')
            }}>
                <Text style={styles.FABText}>
                    Opérations pointées
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default FAB

const styles = StyleSheet.create({
    FABContainer:{
        position:'absolute',
        bottom:35,
        left:0,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    FAB:{
        backgroundColor:'#c2b092',
        width:250,
        borderRadius:30,
        paddingVertical:10,
        paddingHorizontal:20
    },
    FABText:{
        color:'white',
        fontSize:22,
        textAlign:'center'
    }
})