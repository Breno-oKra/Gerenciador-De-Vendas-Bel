import styled from 'styled-components'

export const InputBox = styled.div`
    width: 100%;
    height: 85px;
    margin-bottom: 5px;
    @media(max-width:600px){
        height: 90px;
    }
`
export const InputComponent = styled.input`
    width: 100%;
    height: 60%;
    border: none;
    background-color: #e7e7e7;
    border-radius: 20px;
    padding-left: 20px;
    &:focus{
        outline: 0;
        box-shadow: 0 0 0;
    }
`
export const SelectComponent = styled.select`
    width: 100%;
    height: 60%;
    border: none;
    background-color: #e7e7e7;
    padding-left: 20px;
    &:focus{
        outline: 0;
        box-shadow: 0 0 0;
    }
`