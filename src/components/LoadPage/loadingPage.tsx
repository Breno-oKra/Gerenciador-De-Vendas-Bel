import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../assets/animation/loadingPage.json'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
`
export default function LoagindPageIn(){
    const[stateAnimation,setStateAnimate] = React.useState({isStopped: false, isPaused: true})

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return(
        <Container>
             <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={stateAnimation.isStopped}
              isPaused={stateAnimation.isPaused}/>
        </Container>
    )
}