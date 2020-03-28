export type Content = "login" | "forgotPassword" | "chooseService";

export interface ContentComponentProps {
  navigateToContent: (content: Content) => void;
}
