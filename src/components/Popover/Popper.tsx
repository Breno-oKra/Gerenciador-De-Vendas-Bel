import React from 'react'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import styled from 'styled-components'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const ButtonActive = styled.button`
    z-index: 8;
    position: absolute;
    top: 2px;
    right: 0px;
    border: none;
    background-color: #ffffff1f;
    
`
const Poppers = styled(Popper)`
    z-index: 8;
   .MuiPaper-root {
     min-width: 100px;
   }
`
interface PopperProps{
  funEdit:any;
  funDel:any;
}
export default function PopperComp({funEdit,funDel}:PopperProps) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <div>
        <ButtonActive  ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
            <BiDotsVerticalRounded/>
        </ButtonActive>

        <Poppers open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin:'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={(event) => {
                      handleClose(event)
                      funEdit()
                    }}>Editar</MenuItem>
                    <MenuItem onClick={(event) => {
                      handleClose(event)
                      funDel()
                    }}>Deletar</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}