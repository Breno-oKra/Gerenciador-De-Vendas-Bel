import React from 'react'
import styled from 'styled-components'
const Waves = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    .wave-1{
        //animation: name duration timing-function delay iteration-count direction fill-mode;
        animation: moveWave1 2s ease-in-out infinite alternate;
        @keyframes moveWave1{
            from{
                transform:translateX(-300px)
            }
        }
    }
    .wave-2{
        //animation: name duration timing-function delay iteration-count direction fill-mode;
        animation: moveWave1 3s ease-in-out infinite alternate;
        @keyframes moveWave1{
            from{
                transform:translateX(-100px)
            }
        }
    }
`
export default function Back(){
    return(
        <Waves>
            <svg xmlns="http://www.w3.org/2000/svg" width='2000' viewBox="0 0 1440 320">
                <path className='wave-1' fill="#ff5500" fill-opacity="1" d="M0,224L30,229.3C60,235,120,245,180,229.3C240,213,300,171,360,144C420,117,480,107,540,128C600,149,660,203,720,234.7C780,267,840,277,900,266.7C960,256,1020,224,1080,197.3C1140,171,1200,149,1260,133.3C1320,117,1380,107,1410,101.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
                <path className='wave-2' fill="#ff550076" fill-opacity="1" d="M0,192L21.8,186.7C43.6,181,87,171,131,176C174.5,181,218,203,262,181.3C305.5,160,349,96,393,74.7C436.4,53,480,75,524,101.3C567.3,128,611,160,655,160C698.2,160,742,128,785,117.3C829.1,107,873,117,916,144C960,171,1004,213,1047,218.7C1090.9,224,1135,192,1178,192C1221.8,192,1265,224,1309,234.7C1352.7,245,1396,235,1418,229.3L1440,224L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
            </svg>
        </Waves>
    )
}