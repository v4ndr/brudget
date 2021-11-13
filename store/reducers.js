import {genBudObj, genOpObj, genRecurenceObj, genOpFromRec} from '../utils/index'
const initialState = {ops:[], budgets:[], recurences:[]}


function opsReducer(state = initialState, action) {
  let nextState
  const opsCpy = [...state.ops]
  const budCpy = [...state.budgets]
  const recCpy = [...state.recurences]
  switch (action.type) {
    case 'ADD_OP':
        let [value, budget, date, comment] = action.value
        let op = genOpObj(value, budget, false, date, comment)
        opsCpy.push(op)
        nextState={
          ...state,
          ops:opsCpy
        }
      return nextState || state
    case 'ADD_BUDGET':
      budget = genBudObj(action.value)
      budCpy.push(budget)
      nextState={
        ...state,
        budgets:budCpy
      }
      return nextState || state
    case 'ADD_RECURENCE':
      recurence = genRecurenceObj(action.value)
      op = genOpFromRec(action.value)
      recCpy.push(recurence)
      opsCpy.push(op)
      nextState={
        ...state,
        recurences:recCpy,
        ops:opsCpy
      }
      return nextState || state
    case 'CLEAN_BUDGETS': //DEV
      nextState={
        ...state,
        budgets:[]
      }
      return nextState || state
      case 'CLEAN_RECURENCES': //DEV
      nextState={
        ...state,
        recurences:[]
      }
      return nextState || state
    case 'CLEAN_OPS': //DEV
    nextState={
      ...state,
      ops:[]
    }
      return nextState || state
    case 'CHECK_OPS':
      opsCpy.forEach((op)=>{
        if(action.value.includes(op.id)){
          op.checked=true
        }
      }) 
      nextState={
        ...state,
        ops:opsCpy
      }
      return nextState || state
    case 'UNCHECK_ALL': //DEV
      opcCpy = [...state.ops]
      opsCpy.forEach(op=>op.checked = false)
      nextState={
        ...state,
        ops:opsCpy
      }
      return nextState || state
    case 'AFFECT_TO_BUDGET':
      [budget, value] = action.value
      budCpy[budCpy.findIndex(e=>e.id === budget)].actual -= value
      nextState={
        ...state,
        budgets:budCpy
      }
      return nextState || state
    default:
      return state
  }
}

export default opsReducer

