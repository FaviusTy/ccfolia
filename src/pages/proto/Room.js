import React from "react";
// import styled from "styled-components";
import Titlebar from "components/Titlebar";
import theme from "styles/theme";
import { FaPaperPlane, FaClipboard, FaAngleUp, FaBell } from "react-icons/fa";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
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

import InfoIcon from "@material-ui/icons/Info";
import Button from '@material-ui/core/Button';

// import { unstable_Box as Box } from '@material-ui/core/Box';
import Box from "modules/material-ui-polyfill/Box";

const Rooms = () => {
  return (
    <Box display="flex">
      <AppBar color="inherit" position="fixed" elevation={0}>
        <Toolbar>
          <Box marginRight={2}><Avatar src="/icon-200x200.png" /></Box>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            CCFOLIA
          </Typography>
          <IconButton><InfoIcon /></IconButton>
          <IconButton><InfoIcon /></IconButton>
          <IconButton><InfoIcon /></IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          nostrum repellendus repellat aliquid magni, ullam quod enim,
          architecto ipsam, obcaecati animi cupiditate officia! Itaque autem
          cupiditate, voluptatibus corporis hic totam?
        </p>
      </Box>
      <Box>
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
        <Box>
          <Select
            // value={this.state.age}
            // onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={20}
                name="age"
                id="outlined-age-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <TextField
            // id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            // value={}
            // onChange={}
            // margin="normal"
            // helperText="hello"
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
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
