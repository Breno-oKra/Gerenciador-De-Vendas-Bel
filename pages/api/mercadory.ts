import {SiteClient} from 'datocms-client'
const TOKEN = process.env.API_TOKEN_FULL;
const client = new SiteClient(TOKEN);
export default async  function recebedorDeRequest(request,response){
    if(request.method === 'POST'){
        let idMercadory =[]
        const parseri = JSON.stringify([])
        if(request.body.update){
            const upgradeMercadory = await client.items.update(request.body.idMercadory, {
                invested: parseInt(request.body.invested),
                qtdstock: parseInt(request.body.qtdItems),
                valueitem: parseInt(request.body.valueItem),
            })
            response.json({
                dados:'Algum dado qualquer',
                registrao:upgradeMercadory,
            })
            return;
        }
        const register = await client.items.create({
            itemType:"1073574",
            idprovider:request.body.idProvider,
            name: request.body.name,
            image: request.body.imageProvider,
            invested: parseInt(request.body.invested),
            provider: request.body.provider,
            qtdstock: parseInt(request.body.qtdItems),
            valueitem: parseInt(request.body.valueItem),
            sold: 0,
            wins: 0,
            profit: (parseInt(request.body.qtdItems) * parseInt(request.body.valueItem)) - parseInt(request.body.invested) ,
            client:parseri,
            closed:false,

        }).then((res) => idMercadory = res.id)
        let DataMercadoy = []
        await client.items.find(request.body.idProvider, {
        }).then((res) =>{
            const convert = JSON.parse(res.mercadory)
            const verifi = convert.length < 1
            
            verifi? DataMercadoy = [idMercadory] :  DataMercadoy = [...convert,idMercadory]
        }).catch((err) => err)

        const upgradeProvider = await client.items.update(request.body.idProvider, {
            mercadory:JSON.stringify(DataMercadoy),

        }).then((item) => item).catch((err) => err)
        response.json({
            dados:'Algum dado qualquer',
            registrao:register,
            update:upgradeProvider
        })
        return;
    }
    response.status(404).json({
        message:'Não Encontrado'
    })
}