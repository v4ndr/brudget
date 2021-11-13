import * as React from 'react'
import {Text, StyleSheet, View, FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import { strToDevise } from '../utils'

const renderBudget = (budget) => {
    budgetPercentage = Math.trunc((budget.actual/budget.total)*100);
    (budgetPercentage > 100) ? budgetPercentage = 100 : null
    budgetPercentage = budgetPercentage.toString()
    budgetPercentage = budgetPercentage+'%'
    
    return(
        <View style={styles.budgetItem}>
            <View style={[styles.coloredBar, {backgroundColor:budget.color, width:budgetPercentage}]}/>
            <Text style={styles.budgetTitle}>
                {budget.title}
            </Text>
            <View style={styles.budgetActual}>
                <Text style={styles.budgetActualText}>
                    {strToDevise(Math.round((budget.total-budget.actual)*100)/100)} €
                </Text>
            </View>
        </View>
    )
}
const monitorScreen = () => {
    const ops = useSelector(state => state.ops)
    const budgets = useSelector(state => state.budgets)
    const rec = useSelector(state=> state.recurences)
    solde = ops.reduce((acc,e)=> e.checked ? acc+e.value : acc, 0)
    ///console.log(ops)
    sumOpsWoBudget = ops.reduce((acc,e)=>e.budget ? 0 : acc+e.value, 0)
 
    //sumRec = rec.reduce((acc,e)=>acc + e.value,0)
    console.log('\n----------------\n')
    console.log('bud : ',budgets)
    sumBud = budgets.reduce((acc,e)=>(e.actual > e.total) ? acc+e.actual : acc+e.total,0)
    //console.log(sumBud)
    console.log('sumopswobud : ',sumOpsWoBudget)
    reste =  sumOpsWoBudget - sumBud
    //console.log(ops, budgets, rec)
    return(
        <View style={styles.container}>
            <View style={styles.soldes}>
                <View style={styles.soldesSection}>
                    <Text style={styles.soldesLabel}>
                        SOLDE ACTUEL
                    </Text>
                    <View style={styles.soldesAmount}>
                        <Text style={styles.soldesAmountText} adjustsFontSizeToFit numberOfLines={1}>
                            {strToDevise(Math.round(solde*100)/100)+" €"}
                        </Text>
                    </View>
                </View>
                <View style={styles.separator}/>
                <View style={styles.soldesSection}>
                    <Text style={styles.soldesLabel}>
                        PREVISIONNEL
                    </Text>
                    <View style={styles.soldesAmount}>
                        <Text style={styles.soldesAmountText} adjustsFontSizeToFit numberOfLines={1}>
                        {strToDevise(Math.round(reste*100)/100)+" €"}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.budgetList}>
                <FlatList
                    data={budgets}
                    keyExtractor={(_,index)=>index.toString()}
                    renderItem={({item})=>renderBudget(item)}
                /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    soldes:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    soldesSection:{
        flex:1,
        padding:20
    },
    budgetList:{
        flex:5
    },
    soldesLabel:{
        flex:1,
        color:'gray'
    },
    soldesAmount:{
        flex:4,
        justifyContent:'center'
    },
    soldesAmountText:{
       fontSize: 50,
       fontWeight: '200'
    },
    separator:{
        width:1,
        height:'60%',
        backgroundColor:'gray'
    },
    budgetItem:{
        height:100,
        margin:10,
        borderRadius:25,
        borderWidth:1,
        borderColor:'gray'
    },
    budgetTitle:{
        paddingTop:5,
        flex:1,
        fontSize:20,
        textTransform:'uppercase',
        textAlign:'center',
        color:'#525252'
    },
    budgetActual:{
        flex:3,
        justifyContent:'center',
        paddingBottom:10
    },
    budgetActualText:{
        textAlign:'center',
        fontSize:35
    },
    coloredBar:{
        height:'100%',
        borderRadius:25,
        position:'absolute'
    }

})

export default monitorScreen