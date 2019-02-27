import React, { useState } from "react";
// import styled from "styled-components";
import Titlebar from "components/Titlebar";
import theme from "styles/theme";
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
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Drawer from '@material-ui/core/Drawer';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import InfoIcon from "@material-ui/icons/Info";
import Button from "@material-ui/core/Button";

import { LayoutItem, LayoutGrid } from "components/shared/Layout";

// import { unstable_Box as Box } from '@material-ui/core/Box';
import Box from "modules/material-ui-polyfill/Box";

const Rooms = () => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [openCharacterList, setOpenCharacterList] = useState(false);
  return (
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
      <LayoutItem col="1/9" row="2/13">
        <img
          src="/bg.jpg"
          width="100%"
          height="100%"
          alt=""
          style={{ verticalAlign: "middle" }}
        />
      </LayoutItem>
      <LayoutItem col="9/13" row="2/13" style={{
        paddingBottom: openChatBox ? 178 : 0
      }}>
        <Box>
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
            {[...Array(10)].map((_, id) => {
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
      <LayoutItem col="1/2" row="2/13">
        <Box>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            nostrum repellendus repellat aliquid magni, ullam quod enim,
            architecto ipsam, obcaecati animi cupiditate officia! Itaque autem
            cupiditate, voluptatibus corporis hic totam?
          </p>
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
