import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const drawerWidth = 588;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#FD9755"
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),

      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: 500
    }
  })
);

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
        </Drawer>

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
      </div>
    </div>
  );
}
