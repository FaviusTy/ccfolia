import React, { useState } from "react";
// import styled from "styled-components";
import Titlebar from "components/Titlebar";
import { FaPaperPlane, FaClipboard, FaAngleUp, FaBell } from "react-icons/fa";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Badge from '@material-ui/core/Badge';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from "@material-ui/core/CardActionArea";
import LinearProgress from '@material-ui/core/LinearProgress';

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from '@material-ui/core/Tooltip';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";

import { LayoutItem, LayoutGrid } from "components/shared/Layout";

// import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';

// import { unstable_Box as Box } from '@material-ui/core/Box';
import Box from "modules/material-ui-polyfill/Box";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // primary: {
    //   light: "#7986cb",
    //   main: "#3f51b5",
    //   dark: "#303f9f",
    //   contrastText: "#fff"
    // },
    // secondary: {
    //   light: "#ff4081",
    //   main: "#f50057",
    //   dark: "#c51162",
    //   contrastText: "#fff"
    // },
    background: {
      paper: "#fff",
      default: "rgba(0, 0, 0, 0.54)"
    },
    grey: {
      50: "#fafafa",
      100: "rgba(0, 0, 0, 0.54)",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#fff",
      600: "#fff",
      700: "#fff",
      800: "#fff",
      900: "#fff",
      A100: "#fff",
      A200: "#fff",
      A400: "#fff",
      A700: "#fff"
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    }
  }
});

const Rooms = () => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [openCharacterList, setOpenCharacterList] = useState(false);
  const [openCharacterDetail, setOpenCharacterDetail] = useState(false);
  return (
    // <MuiThemeProvider theme={theme}>
    <LayoutGrid>
      {/* <AppBar color="inherit" position="fixed" elevation={0}>
        <Toolbar>
          <Box marginRight={2}><Avatar src="/icon-200x200.png" /></Box>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            CCFOLIA
          </Typography>
          <IconButton>
            <InfoIcon />
          </IconButton>
          <IconButton>
            <InfoIcon />
          </IconButton>
          <IconButton>
            <InfoIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar> */}
      <LayoutItem col="1/13" row="1/13">
        <img
          src="/bg.jpg"
          width="100%"
          height="100%"
          alt=""
          style={{ verticalAlign: "middle" }}
        />
      </LayoutItem>
      <LayoutItem col="9/13" row="1/13" style={{
        paddingBottom: openChatBox ? 178 : 0,
        overflow: "scroll"
      }}>
        <Box bgcolor="rgba(255, 255, 255, 1)">
          <AppBar position="sticky" anchor="bottom" color="default" elevation={0}>
            <Tabs
              value={1}
              // onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
              <Tab label="Item Four" />
              <Tab label="Item Five" />
              <Tab label="Item Six" />
              <Tab label="Item Seven" />
            </Tabs>
          </AppBar>
          <List>
            {[...Array(12)].map((_, id) => {
              return (
                <ListItem key={id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/bg.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                      <>
                        <Typography component="span" color="textPrimary">
                          Ali Connors
                        </Typography>
                        {
                          "Lorem ipsum dolor sit amet consectetur adipisicing elit. In error fugiat voluptas ea nostrum enim nemo reprehenderit consectetur veritatis ipsum odio aliquid, repellat voluptatibus architecto veniam, quam tempore dignissimos vel."
                        }
                      </>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </LayoutItem>
      <LayoutItem col="1/3" row="1/13" style={{
        paddingBottom: openChatBox ? 178 : 0
      }}>
        <Box p={1} height="100%" sizing="border" style={{
          overflow: "scroll",
          boxSizing: "border-box"
        }}>
          {[...Array(4)].map((_, id) => {
            return (
              <Card style={{ marginBottom: 8 }}>
                <CardActionArea onClick={() => setOpenCharacterDetail(id + 1)}>
                  <Box p={1} display="flex">
                    <Avatar src="/bg.jpg" />
                    <Box mx={1} flex="1">
                      <Typography variant="subtitle2">Name</Typography>
                      <Box my={0.5} position="relative">
                        <Tooltip title="10/10" placement="right">
                          <LinearProgress variant="determinate" value={60} style={{ height: 8 }} />
                        </Tooltip>
                      </Box>
                      <Box my={0.5} position="relative">
                        <Tooltip title="10/10" placement="right">
                          <LinearProgress variant="determinate" value={60} style={{ height: 8 }} />
                        </Tooltip>
                      </Box>
                      <Box my={0.5} position="relative">
                        <Tooltip title="10/10" placement="right">
                          <LinearProgress variant="determinate" value={60} style={{ height: 8 }} />
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </CardActionArea>
              </Card>
            )
          })}
        </Box>
      </LayoutItem>
      <Drawer variant="persistent" open={openChatBox} onClose={() => setOpenChatBox(false)} anchor="bottom">
        {/* <Box padding={1}> */}
        <Toolbar disableGutters>
          <IconButton onClick={() => setOpenCharacterList(!openCharacterList)}>
            <Avatar src="/bg.jpg" />
          </IconButton>
          {/* <TextField
            label="Name"
          /> */}
          <Typography variant="subtitle2" style={{ flexGrow: 1 }}>Lorem, ipsum.</Typography>
          <Button onClick={() => setOpenChatBox(false)}>CLOSE</Button>
        </Toolbar>
        {/* </Box> */}
        <Box>
          <TextField
            label="Message"
            multiline
            rowsMax="4"
            rows="4"
            fullWidth
            variant="filled"
          />
        </Box>
      </Drawer>
      <Drawer open={openCharacterList} onClose={() => setOpenCharacterList(false)} anchor="bottom">
        <List>
          <ListItem component={Button}>
            Lorem, ipsum.
          </ListItem>
          <ListItem component={Button}>
            Lorem, ipsum.
          </ListItem>
          <ListItem component={Button}>
            Lorem, ipsum.
          </ListItem>
          <ListItem component={Button}>
            Lorem, ipsum.
          </ListItem>
        </List>
      </Drawer>
      <Dialog open={openCharacterDetail} onClose={() => setOpenCharacterDetail(false)} anchor="bottom">
        <Formik
          initialValues={{ name: "ROOM: " + Date.now().toString(34) }}
          onSubmit={(values) => {
            console.log(values)
            // setRooms([...rooms, { t: Date.now(), ...values }]);
            setOpenCharacterDetail(false);
          }}
        >{() => (
          <Form>
            <DialogTitle id="form-dialog-title">Character Status</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here.
                We will send updates occasionally.
              </DialogContentText>
              <Field component={TextField}
                autoFocus
                name="name"
                margin="dense"
                label="Room name"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCharacterDetail(false)} color="primary">
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
              >
                OK
              </Button>
            </DialogActions>
          </Form>
        )}</Formik>
      </Dialog>
      <Box position="absolute" bottom={24} right={24}>
        <Fab color="primary" onClick={() => setOpenChatBox(!openChatBox)}>
          <AddIcon />
        </Fab>
      </Box>
      <Box position="absolute" top={8} left={8}>
        <IconButton onClick={() => setOpenChatBox(!openChatBox)}>
          <AddIcon />
        </IconButton>
      </Box>
    </LayoutGrid>
    // </MuiThemeProvider>
  );
};

// const Container = styled(Grid)`
//   height: 100%;
// `;
// const Screen = styled(Grid)`
//   height: 100%;
// `;
// const Controls = styled(Grid)`
//   height: 100%;
// `;
// const Messages = styled(List)`
//   box-sizing: border-box;
//   max-height: 100%;
//   overflow: scroll;
// `;

export default Rooms;
