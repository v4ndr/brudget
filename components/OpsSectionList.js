import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import {View, Text, SectionList, StyleSheet, TouchableOpacity, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CheckBox from '@react-native-community/checkbox'
import { strToDevise } from '../utils'
import { ListItem } from 'react-native-elements'

const OpsSectionList = (props) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [checkedOps, setCheckedOps] = React.useState([])
    const budgets = useSelector(state=>state.budgets)
    React.useEffect(()=>{
        navigation.setOptions({headerRight:()=>(
                <TouchableOpacity style={{padding:10, alignItems:'center', backgroundColor:'white'}} onPress={()=>{
                    dispatch({type:'CHECK_OPS', value:checkedOps})
                    setCheckedOps([])
                }}>
                    <Text style={{color:'#007AFF', fontSize:18}}>OK</Text>
                </TouchableOpacity>
            )
        })
    }, [checkedOps])
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
            comment = '('+item.comment+')'
        }
        return (
        
            <ListItem.Swipeable 
                bottomDivider
                rightContent={
                    <Button
                        title="Modifier"
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'blue' }}
                        onPress={()=>{}}
                    />
                }
            >
            <ListItem.Content>
              <ListItem.Title>{((item.value > 0) ? '+' : '')+strToDevise(item.value)+' €'}</ListItem.Title>
              <ListItem.Subtitle>{item.budget ? budgets[budgets.findIndex((e)=>e.id === item.budget)].title + '  ' +comment : comment}</ListItem.Subtitle>
            </ListItem.Content>
            <CheckBox
                value={checkedOps.includes(item.id)}
                onChange={(v)=>{
                    if (v){
                        cpy = [...checkedOps]
                        cpy.push(item.id)
                        setCheckedOps(cpy)
                    }
                    else{
                        setCheckedOps(checkedOps.filter(e => e !== item.id))
                    }
                }}
            />
          </ListItem.Swipeable>
            // <View style={styles.item}>
            //     <View>
            //         <Text style={styles.itemText}>
            //             {((item.value > 0) ? '+' : '')+strToDevise(item.value)+' €'}
            //         </Text>
            //         <Text style={styles.catText}>
            //             {
            //                 item.budget ? budgets[budgets.findIndex((e)=>e.id === item.budget)].title + '  ' +comment : comment
            //             }
            //         </Text>
            //     </View>
            //     <CheckBox
            //     value={checkedOps.includes(item.id)}
            //     onChange={(v)=>{
            //         if (v){
            //             cpy = [...checkedOps]
            //             cpy.push(item.id)
            //             setCheckedOps(cpy)
            //         }
            //         else{
            //             setCheckedOps(checkedOps.filter(e => e !== item.id))
            //         }
            //     }}
            //     />
            // </View>
            
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

export default OpsSectionList

const styles = StyleSheet.create({
    sectionHeader:{
        backgroundColor:'#cbcaca',
        padding:5   
    },
    sectionHeaderText:{
        fontSize:17
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