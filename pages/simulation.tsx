import React from 'react'
import {ContainerPages} from './home'
import {BoxContainer,ContainerForm,ContainerResult,ResultBox,ImageBackground} from '../src/styles/pages/Simulation.styles'
import FormAddMercadory from '../src/components/FormComponent/FormMercadoryCalc'
import Back from '../src/assets/gf'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import DrawerSection from '../src/components/sectonbar/DrawerSection';
import SectionOn from '../src/components/sectonbar/SectionOn'
import {useRouter} from 'next/router'
export default function Pag(props){
    const[totalBuy,setTotalBuy] = React.useState({totalBuy:0,totalProfit:0})
    const[loginValide,setLoginValide] = React.useState<boolean>(false)
    const Router = useRouter()
    
    React.useEffect(() => {
        if(props.res){
            Router.push("/")
            return
        }
        setLoginValide(true)
    },[props])
    return  (
        <>
            <SectionOn page={'simulation'}/>
            <DrawerSection />         
            <ContainerPages>
                {
                    loginValide?(
                        <BoxContainer>
                            <ImageBackground>
                                <Back/>
                            </ImageBackground>
                                <div className="centralizeForm">
                                <ContainerForm>
                                    <ContainerResult className="containerResult">
                                        <ResultBox>
                                                <h3>valor total ao vender tudo</h3>
                                                <span>${totalBuy.totalBuy}</span>
                                        </ResultBox>
                                        <ResultBox>
                                                <h3>lucro</h3>
                                                {totalBuy.totalProfit < 0? (<span className="fail">perca de {totalBuy.totalProfit}$</span>) : (<span className="wins">${totalBuy.totalProfit}</span>)}
                                                
                                        </ResultBox>
                                    </ContainerResult>
                                    <FormAddMercadory setValues={setTotalBuy} calc={true}/>
                                    
                                    </ContainerForm>
                                </div>
                                
                        </BoxContainer>
                    ):
                    <></>
                }
                
                
            </ContainerPages>
        </>
    )
}
export async function getServerSideProps(context) {
    const cookies = nookies.get(context).USERBEL
    const res = jwt.decode(cookies) 
    return {
        props: {
            res: ((res == undefined) || (res == null ))? true : false
        }, // will be passed to the page component as props
    }
} 