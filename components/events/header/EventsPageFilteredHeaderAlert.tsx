import React, { useState } from "react";

import { IconButton, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { XIcon } from "@core/icons";

const EventsPageFilteredHeaderAlert: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
      >
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <XIcon fontSize="inherit" />
            </IconButton>
          }
        >
          You must share your location to sort by &quot;Closest to you&quot;
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EventsPageFilteredHeaderAlert;
