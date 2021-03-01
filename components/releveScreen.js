import 'react-native-get-random-values'
import * as React from 'react'
import {View, Text, SectionList, StyleSheet, TouchableOpacity} from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import {useNavigation} from '@react-navigation/native'
import operations from '../data/operations.json'


const FloatingButton = () => {
    return (
        <View style={styles.FABContainer}>
            <TouchableOpacity style={styles.FAB}>
                <Text style={styles.FABText}>
                    Voir l'historique
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const releveScreen = () => {
    const navigation = useNavigation()
    React.useEffect(()=>{
        navigation.setOptions({headerRight:()=>(
                <TouchableOpacity style={{padding:10, alignItems:'center', backgroundColor:'white'}}>
                    <Text style={{color:'#007AFF', fontSize:18}}>Ok</Text>
                </TouchableOpacity>
            )
        })
    })

    const renderSectionHeader = (date) => {
        date = new Date(date)
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>
                    {date.toLocaleString('fr', {weekday:'short', day:'numeric', month:'short'})}
                </Text>
            </View>
            
        )
    }
    const renderItem = (item) => {
        let comment=''
        if(item.comment.length != 0){
            comment = ' ('+item.comment+')'
        }
        return (
            <View style={styles.item}>
                <View>
                    <Text style={styles.itemText}>
                        {item.value+' €'}
                    </Text>
                    <Text style={styles.catText}>
                        {item.cat+comment}
                    </Text>
                </View>
                <BouncyCheckbox 
                    text=''
                    fillColor='#c2b092'
                    borderColor='#c2b092'
                    style={{margin:0, padding:0}}
                />
            </View>
            
        )
    }
    return(
        <>
        <SectionList
            stickySectionHeadersEnabled={true}
            scrollIndicatorInsets={{ right: 1 }}
            sections={operations}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => renderItem(item)}
            renderSectionHeader={({ section: { date } }) => (
                renderSectionHeader(date)
            )}
        />
        <FloatingButton/>
        </>
    )
}

export default releveScreen

const styles = StyleSheet.create({
    sectionHeader:{
        backgroundColor:'#cbcaca',
        padding:5   
    },
    sectionHeaderText:{
        fontSize:18
    },
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:8,
        paddingLeft:15,
        borderBottomWidth:1,
        borderBottomColor:'#bbbbbb'
    },
    itemText:{
        fontSize:20
    },
    catText:{
        color:'gray',
        fontSize:18,
        textTransform:'capitalize'
    },
    checkIcon:{
        justifyContent:'center',
        padding:5
    },
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