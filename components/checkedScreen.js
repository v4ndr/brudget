import * as React from 'react'
import {useSelector} from 'react-redux'
import parseOpsInSection from '../utils/parseOpsInSection'
import {OpsSectionListNoCheck} from './index'

const toCheckScreen = () => {
    let ops = useSelector(state => state.ops)
    ops = ops.filter(op => op.checked)
    if(ops.length !== 0){
        ops = parseOpsInSection(ops)
    }
    return(
        <>
        <OpsSectionListNoCheck ops={ops}/>
        </>
    )
}

export default toCheckScreen