import React from 'react'
import { ThemeProvider } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import {theme} from '../src/styles/theme'
import GlobalStyle from '../src/styles/globalStyles'
import styled from 'styled-components'

import 'react-calendar/dist/Calendar.css';

const Container = styled.div`
  width: 100%;
  max-height: 100vh;
  min-height: 600px;
  display: flex;
  justify-content: center;
  
`
interface loginProps{
  name?:string;
  login?:string
}
export default function App({ Component, pageProps }) {
  const[login,setLogin] = React.useState<boolean>(true)
  
  return (
    <>
     <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <title>Gerenciador</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
          <Container>       
            <Component {...pageProps} />
          </Container>
      </ThemeProvider>
    </>
  )
}

