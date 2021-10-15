import React from 'react'
export function FinderClientsOnMonth(Pendents,date){
    let dataTemp = null
    let finder = Pendents.filter((item) => {
        dataTemp = new Date(item.pay)
        if(dataTemp.getDate() === date.getDate() && dataTemp.getMonth() === date.getMonth()){
            return item
        } 

    })
    return finder
}
export function FinderColor(array) {
    // função usada para não aparecer a mesma cor 2 vezes em 1 dia do calendario
    let color = ''
    let arr = []
    array.forEach((item)=>{
        if(item.color !== color){
            color = item.color
            arr.push(item)
            return item
        }   
    });
    return arr
} 
export function tileContent({ date, view,Pendents,setDataCalender,ComponentClient }) {    
    if (view === 'month') {  
        
        let dataTemp = null
       
        //ajuda a não calcular dias de outros meses junto com o mes atual
        date.getDate() === 25? setDataCalender(date.getMonth()) : ''
        if(Pendents.find((item) => {
            
            dataTemp = new Date(item.pay)
            if(dataTemp.getDate() === date.getDate() && dataTemp.getMonth() === date.getMonth()){
                return true
            }  
        })){    
            let resultItemColor = FinderClientsOnMonth(Pendents,date)
            let findy = FinderColor(resultItemColor) 
             
            return <ComponentClient color={findy} />
        }
    }
  }