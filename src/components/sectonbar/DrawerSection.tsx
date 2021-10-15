import React from 'react';
import Section from './index'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import {HiMenu} from 'react-icons/hi'
import {ConainterDraw,DrawerDiv,SectionComponentDraw} from '../../styles/pages/sectonBar.style'


  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  

export default function DrawerSection(){
    const [state, setState] = React.useState({
        left: false,
    });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <DrawerDiv
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        <SectionComponentDraw>
            <Section/>
        </SectionComponentDraw>
     
    </DrawerDiv>
  );
    return(
        <ConainterDraw>
            <React.Fragment key={'left'}>
            <Button className="buttons" onClick={toggleDrawer("left", true)}><HiMenu size={30}/></Button>
                <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </ConainterDraw>
    )
} 