import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
    
  }
  #__next{
    width: 100%;
    min-height: 100vh;
  }
  main{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
   
  }
  h3{
    font-weight: bold;
  }
  
  h1,h2,h3,h4{
    margin: 0;
    font-size: 15px;
    @media(max-width:570px){
      font-size: 10px;
    }
  }
`
export default GlobalStyle