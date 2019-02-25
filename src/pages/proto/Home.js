import React from "react";
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


const Home = () => {
  return (
    <Box display="flex" height="100%">
      {/* <Titlebar /> */}
      <Box flex={1}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
        laudantium facilis eos consectetur, fugiat dignissimos cumque? Odit
        fugit exercitationem temporibus nulla, veniam, sed voluptatum eius
        ipsam distinctio, nisi sapiente obcaecati.
      </Box>
      <Box width={420} overflow="scroll">
        <GridList>
          {[...Array(10)].map((_, i) => {
            return (
              <GridListTile key={i}>
                <img src="/bg.jpg" />
                <GridListTileBar
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
        </GridList>
      </Box>
    </Box>
  );
};

export default Home;
