const parseOpsInSection = (ops) => {
    var index = -1
    var parsedOps = []
    ops.sort((a,b)=>new Date(a.date)-new Date(b.date))
    ops.forEach(op => {
        dateStr = new Date(op.date)
        dateStr= dateStr.toLocaleString('fr', {weekday:'short', day:'numeric', month:'long'})
        index = parsedOps.findIndex(e => e.date === dateStr)
        if(index === -1){
            parsedOps.push(
                {
                    "date":dateStr,
                    "data":[
                        {
                            "id":op.id,
                            "budget":op.budget,
                            "value":op.value,
                            "comment":op.comment,
                            "checked":op.checked
                        }
                    ]
                }
            )
        }
        else{
            parsedOps[index].data.push(
                {
                    "id":op.id,
                    "budget":op.budget,
                    "value":op.value,
                    "comment":op.comment,
                    "checked":op.checked 
                }
            )
        }
    })
    return parsedOps
}

export default parseOpsInSection