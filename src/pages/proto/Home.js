import React, { useState } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import InfoIcon from "@material-ui/icons/Info";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import AddIcon from "@material-ui/icons/Add";
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';

import Box from "modules/material-ui-polyfill/Box";
import { LayoutItem, LayoutGrid } from "components/shared/Layout";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  return (
    <LayoutGrid>
      <AppBar color="inherit" position="fixed" elevation={0}>
        <Toolbar>
          <Box marginRight={2}>
            <Avatar src="/icon-200x200.png" />
          </Box>
          <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
            CCFOLIA - v1.0.0-alpha
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
      </AppBar>
      <LayoutItem col="1/13" row="2/13">
        <Box padding={4}>
          <Box position="fixed" right="24px" bottom="24px">
            <Fab color="primary" onClick={() => setOpen(true)}>
              <AddIcon />
            </Fab>
          </Box>
          <Typography variant="h4" component="h3" gutterBottom>
            ROOMS
          </Typography>
          <Grid container spacing={24}>
            {rooms.map(({ name, t }, i) => {
              return (
                <Grid key={i} item xs={12} sm={4} md={3} lg={2}>
                  <Card>
                    <CardActionArea component={Link} to={`/rooms/${i}`}>
                      <CardMedia image="/bg.jpg" style={{ height: 140 }} />
                      <CardContent>
                        <Typography variant="h5" component="h3" gutterBottom>
                          {name}
                        </Typography>
                        <Typography component="p">{Date(t)}</Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        onClick={() => setOpen(true)}
                        size="small"
                        color="primary"
                      >
                        EDIT
                      </Button>
                      <Button size="small" color="primary">
                        SHARE
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </LayoutItem>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Formik
          initialValues={{ name: "ROOM: " + Date.now().toString(34) }}
          onSubmit={(values) => {
            console.log(values)
            setRooms([...rooms, { t: Date.now(), ...values }]);
            setOpen(false);
          }}
        >{() => (
            <Form>
              <DialogTitle id="form-dialog-title">Room</DialogTitle>
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
                <Button onClick={() => setOpen(false)} color="primary">
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
    </LayoutGrid>
  );
};

export default Home;
