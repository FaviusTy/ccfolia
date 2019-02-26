import React, { useState } from "react";
import styled from "styled-components";
import Titlebar from "../../components/Titlebar";
import theme from "../../styles/theme";
import { FaPlusCircle } from "react-icons/fa";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

// import { unstable_Box as Box } from '@material-ui/core/Box';
import Box from "modules/material-ui-polyfill/Box";
// import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const MMM = () => {
  const [open, setOpen] = useState(false)
  return (<Box>
    <button onClick={() => setOpen(!open)}>open</button>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ratione quaerat cumque, ducimus rerum odit, earum adipisci commodi necessitatibus ipsa animi laudantium accusantium eveniet provident! In natus fuga esse nam!</DialogContent>
    </Dialog>
  </Box>)
}

const Backdrop = () => {
  const [open, setOpen] = useState(false)
  return (<Box bgcolor="#222" color="#fff" height="100%">
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, harum hic? Saepe nihil ad asperiores ut mollitia, optio corporis autem debitis, in, vero itaque dolorum. Fuga quae voluptatem dolorem. Nemo?</p>
    <button onClick={() => setOpen(!open)}>open</button>
  </Box>)
}

const Home = () => {
  const [open, setOpen] = useState(false)
  return (
    <Box width="320px" position="relative">
      <button onClick={() => setOpen(!open)}>open</button>
      <SwipeableDrawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <Box height="320px" width="320px">
          <MMM />
        </Box>
        {/* <GridList>
          {[...Array(10)].map((_, i) => {
            return (
              <GridListTile key={i}>
                <img src="/bg.jpg" />
                <GridListTileBar
                  onClick={() => setOpen(!open)}
                  title={"aaa"}
                  subtitle={<span>by: ccfolia</span>}
                  actionIcon={
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            );
          })}
          <GridListTile>+</GridListTile>
        </GridList> */}
      </SwipeableDrawer>
        {/* <Titlebar /> */}
      </Box>
  );
};

export default Home;
