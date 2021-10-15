import React from 'react'


export function IsLockyDubmit(data){
    if(data == null ){
        return 'efetivado'
    }
    let refator = `${data.slice(0,4)}/${data.slice(5,7)}/${data.slice(8,10)}`
    let datas = new Date(refator) 
    let AtualDate = new Date()
        if((datas.getFullYear() < AtualDate.getFullYear()) || (datas.getMonth() == AtualDate.getMonth()) && (datas.getDate() < AtualDate.getDate()) || ((datas.getMonth() < AtualDate.getMonth()) && (datas.getFullYear() == AtualDate.getFullYear()) )){
            return false
        }
        else{
            return refator
        }
}