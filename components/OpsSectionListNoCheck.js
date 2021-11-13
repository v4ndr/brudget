import * as React from 'react'
import {View, Text, SectionList, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import { strToDevise } from '../utils'
const OpsSectionListNoCheck = (props) => {
    const budgets = useSelector(state=>state.budgets)
    //render du header de section
    const renderSectionHeader = (date) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>
                  {date}  
                </Text>
            </View>
            
        )
    }
    //render du list item
    const renderItem = (item, budgets) => {
        let comment=''
        if(item.comment.length != 0){
            comment = ' ('+item.comment+')'
        }
        return (
            <View style={styles.item}>
                <View>
                    <Text style={styles.itemText}>
                    {((item.value > 0) ? '+' : '')+strToDevise(item.value)+' €'}
                    </Text>
                    <Text style={styles.catText}>
                        {
                            item.budget ? budgets[budgets.findIndex((e)=>e.id === item.budget)].title + comment : comment
                        }
                    </Text>
                </View>
            </View>
            
        )
    }
    //render de la liste
    return(
        <SectionList
            stickySectionHeadersEnabled={true}
            scrollIndicatorInsets={{ right: 1 }}
            sections={props.ops}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => renderItem(item, budgets)}
            renderSectionHeader={({ section: { date } }) => (
                renderSectionHeader(date)
            )}
        />
    )
}

export default OpsSectionListNoCheck

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
})