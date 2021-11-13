import * as React from 'react'
import {View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus, faCoins, faPiggyBank, faTimes } from '@fortawesome/free-solid-svg-icons'
import Emoji from 'react-native-emoji'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import {strToDevise} from '../utils/index'

const FAB = (props) => {
    nav = useNavigation()
    return(
        <View style={styles.FABContainer}>
            <TouchableOpacity style={styles.FABIcon} onPress={()=>{props.setModalVisible(true)}}>
                <FontAwesomeIcon icon={faPlus} size={20}/>
            </TouchableOpacity>
        </View>
    )
}

const renderBudget = (item) => {
    return(
        <View style={[styles.itemContainer, {backgroundColor:item.color}]}>
            <Text style={styles.budgetName}>{item.title}</Text>
            <Text style={styles.budgetValue}>{strToDevise(item.total)+' €'}</Text>
        </View>
    )
}
const renderRecurence = (item) => {
    return(
        <View style={[styles.itemContainer, styles.recurenceContainer]}>
            <View style={{flex:1, height:60, justifyContent:'center'}}>
                <Text style={styles.recurenceAmount}>{strToDevise(item.value)+' €'}</Text>
                <Text style={styles.recurenceSubtitle}>{item.title}</Text>
            </View>
            <View style={{flex:1, height:60, justifyContent:'center', alignItems:'flex-end'}}>
                <Text style={styles.recurenceSubtitle}>{item.day+' '}<Emoji name="spiral_calendar_pad"/></Text>
            </View>
        </View>
    )
}

const cfgScreen = () => {
    const nav = useNavigation()
    const [modalVisible, setModalVisible] = React.useState(false)
    const budgets = useSelector(state=>state.budgets)
    const recurences = useSelector(state=>state.recurences)
    recurences.sort((a,b)=>a.day-b.day)
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>BUDGETS</Text>
                <View style={{flex:3}}>
                    <FlatList
                        data={budgets}
                        keyExtractor={(_,index)=>index.toString()}
                        renderItem={({item})=>renderBudget(item)}
                    />
                </View>
                <Text style={styles.sectionTitle}>OPERATIONS RECURENTES</Text>
                <View style={{flex:4}}>
                    <FlatList
                        data={recurences}
                        keyExtractor={(_,index)=>index.toString()}
                        renderItem={({item})=>renderRecurence(item)}
                    />
                </View>
            </View>
            <FAB setModalVisible={setModalVisible}/>
            <Modal
                animationType='slide'
                visible={modalVisible}
                transparent={true}
                onRequestClose={()=>{setModalVisible(false)}}
            >  
                <TouchableWithoutFeedback  onPress={()=>{setModalVisible(false)}}>
                    <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback >
                        <View style={styles.modal}>
                        <TouchableOpacity style={styles.modalButton} onPress={()=>{setModalVisible(false); nav.navigate('addBudgetScreen')}}>
                            <Text style={styles.buttonLabel}>Budget</Text>
                            {/* <FontAwesomeIcon icon={faPiggyBank} size={100} color='gray'/> */}
                        </TouchableOpacity>
                        <View style={styles.separator}/>
                        <TouchableOpacity style={styles.modalButton} onPress={()=>{setModalVisible(false); nav.navigate('addRecurenceScreen')}}>
                            <Text style={styles.buttonLabel}>Opération récurente</Text>
                            {/* <FontAwesomeIcon icon={faCoins} size={100} color='gray'/> */}
                        </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:8
    },
    separator:{
        width:1,
        height:'80%',
        backgroundColor:'gray'
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
    },
    itemContainer:{
        marginHorizontal:10,
        marginVertical:5,
        padding:8,
        borderRadius:24,
        borderWidth:0,
        justifyContent:'center',
        alignItems:'center'
    },
    budgetName:{
        fontSize:15,
        textTransform:'uppercase'
    },
    budgetValue:{
        fontSize:35,
        fontWeight:'200'
    },
    recurenceContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#a1cae2',
        alignItems:'flex-start',
        paddingVertical:10,
        paddingHorizontal:18,
        borderRadius:20,
        
    },
    recurenceAmount:{
        fontSize:20
    },
    recurenceSubtitle:{
        fontSize:15,
        color:'#666666',
        textTransform:'capitalize'
    },
    sectionTitle:{
        fontSize:20,
        margin:12
    },
    modalContainer:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    modal:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#eae3c8',
        borderRadius:30
    },
    modalButton:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:40
    },
    buttonLabel:{
        fontSize:25
    }
})

export default cfgScreen
