import 'react-native-get-random-values'
import * as React from 'react'
import {View, Text, SectionList, StyleSheet, TouchableOpacity} from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import BouncyCheckbox from "react-native-bouncy-checkbox"
import {useNavigation} from '@react-navigation/native'

const operations = [
    {
        date: new Date("01/12/2021"),
        data:[
            {
                id:uuidv4(),
                cat:'bonus',
                amount:-12.00,
                comment:'resto'
            },
            {
                id:uuidv4(),
                cat:'bonus',
                amount:-23.12,
                comment:'livres'
            },
            {
                id:uuidv4(),
                cat:'courses',
                amount:-90.21,
                comment:''
            }
        ]
    },
    {
        date: new Date("01/14/2021"),
        data:[
            {
                id:uuidv4(),
                cat:'voiture',
                amount:-60.11,
                comment:'fuel'
            },
            {
                id:uuidv4(),
                cat:'autre',
                amount:-2.50,
                comment:'choco'
            }
        ]
    },
    {
        date: new Date("01/18/2021"),
        data:[
            {
                id:uuidv4(),
                cat:'autre',
                amount:-3.80,
                comment:''
            }
        ]
    },
    {
        date:new Date("01/20/2021"),
        data:[
            {
                id:uuidv4(),
                cat:'bonus',
                amount:-15.90,
                comment:''
            }
        ]
    },
    {
        date:new Date("01/22/2021"),
        data:[
            {
                id:uuidv4(),
                cat:'courses',
                amount:-40.32,
                comment:''
            },
            {
                id:uuidv4(),
                cat:'autre',
                amount:-12.20,
                comment:'boulangerie'
            },
            {
                id:uuidv4(),
                cat:'crédit',
                amount:700.00,
                comment:'salaire'
            },
        ]
    },
    {
        date:new Date("01/28/2021"),
        data:[
            {
                id:uuidv4(),
                cat:'crédit',
                amount:253.61,
                comment:'salaire Grace'
            }
        ]
    },
    {
        date:new Date("02/02/2021"),
        data:[
            {
                id:uuidv4(),
                cat:'crédit',
                amount:15.00,
                comment:'remb uber eats'
            }
        ]
    },
    {
        date:new Date("02/05/2021"),
        data:[
            {
                id:uuidv4(),
                cat:'bonus',
                amount:-12.00,
                comment:'ciné'
            }
        ]
    },
]

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
                        {item.amount+' €'}
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