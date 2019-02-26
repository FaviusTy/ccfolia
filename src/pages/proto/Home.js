import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Titlebar from "../../components/Titlebar";
import theme from "../../styles/theme";
import { FaPlusCircle } from "react-icons/fa";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import InfoIcon from "@material-ui/icons/Info";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import { unstable_Box as Box } from '@material-ui/core/Box';
import Box from "modules/material-ui-polyfill/Box";
// import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AddIcon from '@material-ui/icons/Add';

const GridBase = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 64px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  /* grid-template-rows: 1fr 1fr 1fr; */
  /* grid-gap: 10px; */
  /* grid-template-rows: repeat(3, 1fr); */
  width: 100%;
  height: 100%;
  @media (max-width: 720px) {
    display: block;
  }
`;
const GridItem = styled.div`
  grid-column: ${({ col }) => col};
  grid-row:  ${({ row }) => row};
  overflow: scroll;
  /* width: 10px; */
  /* height: 10px; */
`;


const Home = () => {
  const [open, setOpen] = useState(false)
  const [rooms, setRooms] = useState([])
  return (
    <>
      <AppBar color="inherit" position="fixed" elevation={0}>
        <Toolbar>
          <Box marginRight={2}><Avatar src="/icon-200x200.png" /></Box>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            CCFOLIA - v1.0.0-alpha
          </Typography>
          <IconButton><InfoIcon /></IconButton>
          <IconButton><InfoIcon /></IconButton>
          <IconButton><InfoIcon /></IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box padding={4}>
        <Box position="fixed" right="24px" bottom="24px">
          <Fab color="primary" onClick={() => setOpen(true)}><AddIcon /></Fab>
        </Box>
        <Typography variant="h4" component="h3" gutterBottom>
          ROOMS
        </Typography>
        <Grid container spacing={24}>
          {rooms.map(({ t }, i) => {
            return (
              <Grid key={i} item xs={12} sm={4} md={3} lg={2}>
                <Card>
                  <CardActionArea component={Link} to={`/rooms/${i}`}>
                    <CardMedia image="/bg.jpg" style={{ height: 140 }} />
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        Lizard
                      </Typography>
                      <Typography component="p">{Date(t)}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button onClick={() => setOpen(true)} size="small" color="primary">EDIT</Button>
                    <Button size="small" color="primary">SHARE</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            setRooms([...rooms, { t: Date.now() }])
            setOpen(false)
          }} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
