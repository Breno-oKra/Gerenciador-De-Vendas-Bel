import React from 'react'
import {Container,Box,ImagesBack,FormStyle} from '../src/styles/pages/login'
import AnimationManager from '../src/components/LoadPage/loginManager'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import {Button} from '@material-ui/core'
import {useRouter} from 'next/router'


export default function Login(props){
    const[dataPage,setDataPage] = React.useState<boolean>(false)
    const[loginError,setLoginError] = React.useState<string>('')
    const Router = useRouter()
    React.useEffect(() => {
        if(props.res){
            Router.push("/home")
            return
        }
        setDataPage(true)
    },[props])
   
    return dataPage?(
        <Container>
            <ImagesBack>
                <AnimationManager/>
            </ImagesBack>
            <Box>
                <div className="waves">
                    <svg id="visual" viewBox="0 0 900 600" width="100%"  xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M703 0L650 33.3C597 66.7 491 133.3 473.2 200C455.3 266.7 525.7 333.3 538.3 400C551 466.7 506 533.3 483.5 566.7L461 600L0 600L0 566.7C0 533.3 0 466.7 0 400C0 333.3 0 266.7 0 200C0 133.3 0 66.7 0 33.3L0 0Z" fill="#ff8b36" stroke-linecap="round" stroke-linejoin="miter"></path></svg>
                </div>
               <div className="backImage">
                  
               </div>
               <img src="https://s1.1zoom.me/big0/480/School_Notebooks_Pencils_Ballpoint_pen_561232_1280x853.jpg" alt="" />
                <div className="login">
                    <FormStyle onSubmit={function handlerCreateMercadory(event){
                        event.preventDefault();
                        const dadosForm = new FormData(event.target)
                        const mercadoryItem = {
                            name:dadosForm.get('name'),
                            password:dadosForm.get('password')
                        }
                        fetch('/api/teste',{
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json',
                            },
                            body: JSON.stringify(mercadoryItem)
                        }).then(async(response) => {
                            const data = await response.json()

                           if(data.res){ 
                                nookies.set(null,'USERBEL',data.res,{
                                    path:'/',
                                    maxAge:86400*7
                                })
                                Router.push("/home")
                               
                            }
                            setLoginError("usuario/senha invalidos!")
                            
                        }).catch((err) => alert(err))
                       
                        
                       
                    }}>
                        <p>usuario</p>
                        <input name="name" type="text" />
                        <p>senha</p>
                        <input name="password" type="password" />
                        <p className="error">{loginError}</p>
                        <Button type="submit" className="button">logar</Button >
                        
                    </FormStyle>
                   
                </div>
            </Box>
        </Container>
    ):(<></>)
}


export async function getServerSideProps(context) {
    const cookies = nookies.get(context).USERBEL
    const res = jwt.decode(cookies) 
    return {
        props: {
            res: cookies !== undefined? true : false
        }, // will be passed to the page component as props
      }
  } 
