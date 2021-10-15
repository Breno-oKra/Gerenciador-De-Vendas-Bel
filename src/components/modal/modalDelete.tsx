import React from 'react'
import styled from 'styled-components'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ButtonClose } from '../../styles/modals/modalWaves';
import {GrClose} from 'react-icons/gr';
import {ModalAlign} from './modal'

const Container = styled.div`
    position:relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h4{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .alignButton{
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        button{
            padding: 10px;
            border:none
        }
        button:focus{
            opacity: 0.7;
        }
        .del{
            background-color: #ff4242;
            color:#fff
        }
    }

`
const AlignQustion = styled.div`
    width: 90%;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    background-color:#f0f0f0;
    margin-bottom: 20px;
    h3{
        color: #fd3535;
        font-weight: normal;
    }
`
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width:350,
      height: 300,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: 10,
      display: 'flex',
      alignItems:'center',
      justifyContent:'center'
    },
  }),
);
type ModalsProps = {
    modal: boolean
    toggler: any
    title:string;
    info:string;
    OnSubmit:any;
}
export default function ModalDelete({modal,toggler,title,info,OnSubmit}:ModalsProps) {
  const classes = useStyles();

  const body = (
            <div className={classes.paper} >

              <Container>
                <ButtonClose className="buttonFixed" onClick={toggler}>
                    <GrClose/>
                </ButtonClose>
                  <h4>{title}</h4>
                  <AlignQustion>
                      <h3>{info}</h3>
                  </AlignQustion>
                  <form className="alignButton" onSubmit={OnSubmit} >
                      <button type='submit' className="del">Deletar</button>
                      <button onClick={toggler}>cancelar</button>
                  </form>
              </Container>
                
            </div>
                         
  );

  return (
    <div>
      <ModalAlign
        open={modal}
        onClose={toggler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </ModalAlign>
    </div>
  );
}