import * as React from 'react'
import {useSelector} from 'react-redux'
import parseOpsInSection from '../utils/parseOpsInSection'
import {FAB, OpsSectionList} from './index'

const toCheckScreen = () => {
    ops = useSelector(state => state.ops)
    ops = ops.filter(op => !op.checked)
    if(ops.length !== 0){
        ops = parseOpsInSection(ops)
    }
    
    return(
        <>
        <OpsSectionList ops={ops}/>
        <FAB ops={ops}/>
        </>
    )
}

export default toCheckScreen