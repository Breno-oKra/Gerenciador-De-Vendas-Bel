import {SiteClient} from 'datocms-client'
import {TableMercadoriaProps} from '../mercadoryOff'
import {HistoricBuys} from '../pag'
const TOKEN = process.env.API_TOKEN_FULL
const client = new SiteClient(TOKEN)

export default async  function recebedorDeRequest(request,response){
    if(request.method === 'POST'){
        let NewDataClient : HistoricBuys[]
        let ObjectMercadory :  HistoricBuys
        let NewDataMercadory : TableMercadoriaProps
        let verifiLastBuy = false
        let payPendents = 0
        await client.items.find(request.body.idClient, {
        }).then((res) =>{
            const convert = JSON.parse(res.historicbuy)
             //delete
            
            const finder = convert.find((item) => item.id === request.body.idObject)
            ObjectMercadory = {...finder}
            let index = convert.indexOf(finder);
            convert.splice(index, 1);
            NewDataClient = [...convert]

            verifiLastBuy =  convert.find((item) => item.fornecedor == request.body.provider)         
            payPendents = ObjectMercadory.pay != 'efetivado'? res.paypendent - 1 : res.paypendent
        })
        await client.items.find(request.body.idMercadory, {
        }).then((res) =>{
            NewDataMercadory = res 
            console.log(verifiLastBuy)    
            if(verifiLastBuy == undefined){
                let parser = JSON.parse(res.client) 
                const finder = parser.find((item) => item == request.body.idClient)
                let index = parser.indexOf(finder);
                parser.splice(index, 1);

                NewDataMercadory.client = parser
            }
        })
        const upgrade = await client.items
        .update(request.body.idMercadory, {
            qtdstock: NewDataMercadory.qtdstock + ObjectMercadory.qtd,
            sold:NewDataMercadory.sold - ObjectMercadory.qtd,
            wins:NewDataMercadory.wins - ObjectMercadory.valueTotal,
            client:NewDataMercadory.client
        })
        const upgradeMercadory = await client.items
        .update(request.body.idClient, {
            paypendent: payPendents,
            historicbuy:JSON.stringify(NewDataClient)
        })
        response.json({
            registrao:upgrade,
            registrado:upgradeMercadory
        })
        return;
    }
    response.status(404).json({
        message:'Não Encontrado'
    })

}