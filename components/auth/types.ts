export type Content = "login" | "forgotPassword" | "chooseService" | "signup";

export interface ContentComponentProps {
  navigateToContent: (content: Content) => void;
}
