import * as React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const data = ['bonus', 'courses', 'voiture']

const FAB = () => {
    return(
        <View style={styles.FABContainer}>
            <View style={styles.FABIcon}>
                <FontAwesomeIcon icon={faPlus} size={20}/>
            </View>
        </View>
    )
}

const renderItem = (item) => {
    return(
        <Text>
            {item}
        </Text>
    )
}

const cfgScreen = () => {
    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(_,index)=>index.toString()}
                    renderItem={({item})=>renderItem(item)}
                />
            </View>
            <FAB/>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    FABContainer:{
        position:'absolute',
        bottom:30,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    FABIcon:{
        padding:20,
        backgroundColor:'#c2b092',
        borderRadius:100
    }
})

export default cfgScreen
