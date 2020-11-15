import React from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  MenuItem,
  Menu
} from "@material-ui/core";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import { CoreButton } from "@core/buttons";
import { SearchIcon, ThreeBarsIcon } from "@core/icons";
import config from "config";

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
      width: 130,
      height: 37
    }
  },
  searchIcon: {
    paddingLeft: 17,
    paddingTop: 0,
    color: "#999999",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 14
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
  },
  image: {
    width: 114.35,
    height: 20
  }
}));

export default function CoreNavBar() {
  const router = useRouter();
  const navTabs = ["Discover", "Events", "Non-profits", "Sign In", "Sign Up"];
  const navRoutes = [
    config.pages.index,
    config.pages.events,
    config.pages.nonprofits,
    config.pages.login,
    config.pages.signup
  ];
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
            <img
              alt="Bits of Good Logo"
              src="/site/bog-logo.svg"
              className={classes.image}
            />
          </a>
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
                  const route = navRoutes[navTabs.indexOf(navTab)];
                  return (
                    <CoreButton
                      onClick={() => {
                        void router.push(route);
                      }}
                    >
                      {navTab}
                    </CoreButton>
                  );
                }
              })}
            </div>
            <div className={classes.containButton}>
              <CoreButton
                variant="outlined"
                onClick={() => {
                  void router.push(config.pages.login);
                }}
              >
                {" "}
                Sign In{" "}
              </CoreButton>
            </div>
            <div className={classes.containButton}>
              <CoreButton
                variant="contained"
                onClick={() => {
                  void router.push(config.pages.signup);
                }}
              >
                {" "}
                Sign Up{" "}
              </CoreButton>
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
              <ThreeBarsIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
