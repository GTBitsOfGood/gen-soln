import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#FD9755"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: 500
    }
  })
);

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      ></Drawer>
      <Grid container direction="row" spacing={4}>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="right"
      ></Drawer>
    </div>
  );
}
