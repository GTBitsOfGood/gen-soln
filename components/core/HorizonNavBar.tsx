import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import HorizonButton from "./HorizonButton";
//import Logo from "./logo.png";
import HorizonButtonOutline from "./HorizonButtonOutline";
import ButtonWithLowercaseText from "../ButtonWithLowercaseText";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: "100px",
    border: 1,
    borderStyle: "solid",
    borderColor: "#D2D2D2",
    backgroundColor: "#FFFFFF",
    marginRight: theme.spacing(2),
    marginLeft: 32,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: 110
    }
  },
  searchIcon: {
    paddingLeft: 17,
    color: "#999999",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "#OOOOOO"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  containButton: {
    paddingLeft: 24
  }
}));

const navTabs = ["Discover", "Events", "Non-profits", "Sign In", "Sign Up"];

export default function PrimarySearchAppBar() {
  const navTabs = ["Discover", "Events", "Non-profits", "Sign In", "Sign Up"];
  const classes = useStyles();
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {navTabs.map(navTab => (
        <MenuItem key={navTab.toString()} value={navTab} />
      ))}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: "#FFFFFF" }}>
        <Toolbar>
          <a href="https://www.bitsofgood.org/">
            <img alt="Bits of Good Logo" src="/site/bog-logo.svg" />
          </a>
          {/* <img src={Logo} alt="logo" className={classes.Logo} /> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className={classes.containButton}>
              {navTabs.map(navTab => {
                if (navTab !== "Sign Up" && navTab !== "Sign In") {
                  return (
                    <ButtonWithLowercaseText>{navTab}</ButtonWithLowercaseText>
                  );
                }
              })}
            </div>
            <div className={classes.containButton}>
              <HorizonButtonOutline> Sign In </HorizonButtonOutline>
            </div>
            <div className={classes.containButton}>
              <HorizonButton> Sign Up </HorizonButton>
            </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
