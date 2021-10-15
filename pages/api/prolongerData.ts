import {SiteClient} from 'datocms-client'
const TOKEN = process.env.API_TOKEN_FULL
const client = new SiteClient(TOKEN)


export default async  function recebedorDeRequest(request,response){
    if(request.method === 'POST'){
        let data = []
        const finderBd = await client.items.find(request.body.idClient, {
        }).then((res) =>{
            const convert = JSON.parse(res.historicbuy)
            const finder = convert.find((item) => item.id == parseInt(request.body.idBuy))

            let reconstructor = {...finder}
            reconstructor.pay = request.body.pay

            let index = convert.indexOf(finder);
            console.log(request.body.idBuy)
            if(index >= 0){
                convert.splice(index, 1);

                data = [...convert,reconstructor]
                return
            }
            data = [...convert]
            
        })
        const upgrade = await client.items
        .update(request.body.idClient, {
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