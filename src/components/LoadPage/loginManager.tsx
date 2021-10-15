import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../assets/animation/loginManager.json'
import styled from 'styled-components'

const Container = styled.div`
    position: absolute;
    left:0;
    bottom:0;
    width:100%;
    z-index: 0;
    opacity: 0.4;
  

`
export default function AnimationManager(){
    const[stateAnimation,setStateAnimate] = React.useState({isStopped: false, isPaused: false})

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
              height={'100%'}
              width={'100%'}
              isStopped={stateAnimation.isStopped}
              isPaused={stateAnimation.isPaused}/>
        </Container>
    )
}