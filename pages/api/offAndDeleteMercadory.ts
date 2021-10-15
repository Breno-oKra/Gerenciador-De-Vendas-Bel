import {SiteClient} from 'datocms-client'
const TOKEN = process.env.API_TOKEN_FULL;
const client = new SiteClient(TOKEN);

export default async  function recebedorDeRequest(request,response){
    if(request.method === 'POST'){
        let newDateProvider = []
        if(request.body.update){
            if(request.body.edit){
                let upgradeMercadory = []
                if(request.body.name !== undefined){
                    upgradeMercadory = await client.items.update(request.body.idMercadory, {
                        name:request.body.name,
                        invested:parseInt(request.body.invested),
                        qtdstock:parseInt(request.body.qtdItems),
                        valueitem:parseInt(request.body.valueItem)
                        
                    })
                    response.json({
                        registrado:upgradeMercadory
                    })
                    return;
                }
                upgradeMercadory = await client.items.update(request.body.idMercadory, {
                    qtdstock:parseInt(request.body.qtdItems),
                    valueitem:parseInt(request.body.valueItem)
                    
                })
                response.json({
                    registrado:upgradeMercadory
                })
                return;
            }
            const upgradeMercadory = await client.items.update(request.body.idMercadory, {
                closed:request.body.close
            })
            response.json({
                registrado:upgradeMercadory
            })
            return;
        }
        await client.items.find(request.body.idProvider, {
        }).then((res) =>{
            const parser = JSON.parse(res.mercadory)
            let finder = parser.find((item) => item == request.body.idMercadory)
            let index = parser.indexOf(finder);
            parser.splice(index, 1);
            newDateProvider = parser
        })
        const upgrade = await client.items
        .update(request.body.idProvider, {
            mercadory:JSON.stringify(newDateProvider)
        })
        const deleProvider = await client.items.destroy(request.body.idMercadory, {
        }).then((res) => res).catch((err) => err)
        response.json({
            dados:'Algum dado qualquer',
            registrao:deleProvider,
            update:upgrade
        })
       
        return
    }
    response.status(404).json({
        message:'Não Encontrado'
    })
}