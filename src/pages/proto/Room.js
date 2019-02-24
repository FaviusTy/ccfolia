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
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";

// import { unstable_Box as Box } from '@material-ui/core/Box';
import Box from "modules/material-ui-polyfill/Box";

const Rooms = () => {
  return (
    <Box display="flex">
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
          {[...Array(100)].map((_, id) => {
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
