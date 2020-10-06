import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import FullPageLayout from "components/FullPageLayout";

const useStyles = makeStyles({
  container: {
    display: "flex"
  },
  sidebar: {
    flex: 1,
    display: "flex",
    height: "100vh",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  content: {
    flex: 7,
    display: "flex",
    height: "100vh",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
});

interface Props {
  sidebarComponent: React.ReactNode;
}

const EventsPageLayout: React.FC<Props> = ({ sidebarComponent, children }) => {
  const { container, sidebar, content } = useStyles();

  return (
    <FullPageLayout className={container}>
      <div className={sidebar}>{sidebarComponent}</div>
      <div className={content}>{children}</div>
    </FullPageLayout>
  );
};

export default EventsPageLayout;
