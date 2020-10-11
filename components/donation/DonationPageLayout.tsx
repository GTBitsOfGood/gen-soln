import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import FullPageLayout from "components/FullPageLayout";

import DonationPageHeader from "./header/DonationPageHeader";

interface StyleProps {
  backgroundImage: string;
}

const useStyles = makeStyles(({ margins }: Theme) =>
  createStyles({
    container: {
      flexDirection: "column"
    },
    content: {
      flex: 1,
      display: "flex",
      backgroundImage: (props: StyleProps) => props.backgroundImage,
      backgroundSize: "cover",
      backgroundRepeat: "repeat-y",
      backgroundPosition: "center",
      padding: `${margins.LARGE_VERTICAL} ${margins.HORIZONTAL}`
    }
  })
);

type Props = React.ComponentProps<typeof DonationPageHeader> & StyleProps;

const DonationPageLayout: React.FC<Props> = ({
  children,
  backgroundImage,
  ...rest
}) => {
  const { container, content } = useStyles({ backgroundImage });

  return (
    <FullPageLayout className={container}>
      <DonationPageHeader {...rest} />
      <div className={content}>{children}</div>
    </FullPageLayout>
  );
};

export default DonationPageLayout;
