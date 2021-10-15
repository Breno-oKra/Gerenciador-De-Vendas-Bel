import {SiteClient} from 'datocms-client'
const TOKEN = process.env.API_TOKEN_FULL
const client = new SiteClient(TOKEN)

export default async  function recebedorDeRequest(request,response){
    if(request.method === 'POST'){
        let data = []
        let reconstructor = {
            id:parseInt(request.body.id),
            idMercadory: request.body.idMercadory,
            item: request.body.item,
            fornecedor: request.body.fornecedor,
            valueItem: parseInt(request.body.valueItem),
            valueTotal:parseInt(request.body.valueItem)*parseInt(request.body.qtdBuy),
            qtd: parseInt(request.body.qtdBuy),
            pay: 'efetivado',
            dayOfBuy:request.body.dayOfBuy
        }
        let payPendents = request.body.payPendent
        let idRando =  parseInt(request.body.idMercadory)+parseInt(request.body.qtdBuy) + Math.floor(Math.random()*10000) + Math.floor(Math.random()*10000)
        const finderBd = await client.items.find(request.body.idClient, {
        }).then((res) =>{
            const convert = JSON.parse(res.historicbuy)
            const finder = convert.find((item) => item.id === request.body.id && item.pay != 'efetivado')
            let index = convert.indexOf(finder);
            convert.splice(index, 1);
            let newObject = {...reconstructor}
            if(request.body.pay !== 'efetivado'){
                
                newObject.qtd = parseInt(request.body.qtdStok) - reconstructor.qtd
                newObject.pay = request.body.pay
                newObject.valueTotal = reconstructor.valueItem * (parseInt(request.body.qtdStok) - reconstructor.qtd)

                reconstructor.id = idRando
                data = [...convert,reconstructor,newObject]
            }else{
                payPendents = payPendents -1
                data = [...convert,reconstructor]
            }
            
        })
        const upgrade = await client.items
        .update(request.body.idClient, {
            paypendent:payPendents,
            historicbuy:JSON.stringify(data) ,
        })
        response.json({
            registrao:upgrade,
            registrado:finderBd
        })
        return;
    }
    response.status(404).json({
        message:'Não Encontrado'
    })

}