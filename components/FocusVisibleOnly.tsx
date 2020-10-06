import { makeStyles } from "@material-ui/core";
import React from "react";

interface Props {
  onClick: () => void;
}

const useStyles = makeStyles({
  nofocus: {
    "&:focus": {
      outline: "none"
    }
  }
});

/**
 * FocusVisibleOnly allows us to have divs that act like buttons (i.e. can be clicked)
 * while still allowing keyboard accessibility.
 *
 * We want a focus ring when a user tabs to this component, but not when a user
 * clicks on this component. To do this, the non-tabbable inner div suppresses
 * the focus ring while still bubbling the onClick event to the outer div. The
 * outer div *is* tabbable but it doesn't suppress its focus ring.
 *
 * Adapted from:
 * https://stackoverflow.com/questions/31402576/enable-focus-only-on-keyboard-use-or-tab-press
 */
const FocusVisibleOnly: React.FC<Props> = ({ onClick, children }) => {
  const { nofocus } = useStyles();
  return (
    <div onClick={onClick} onKeyPress={onClick} role="button" tabIndex={0}>
      <div tabIndex={-1} className={nofocus}>
        {children}
      </div>
    </div>
  );
};

export default FocusVisibleOnly;
