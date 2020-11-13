import React, { useState } from "react";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const EventsPageFilteredHeaderAlert: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      autoHideDuration={8000}
      onClose={() => setOpen(false)}
    >
      <Alert severity="warning">
        You must share your location to sort by &quot;Closest to you&quot;
      </Alert>
    </Snackbar>
  );
};

export default EventsPageFilteredHeaderAlert;
