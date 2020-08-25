export type Content = "login" | "forgotPassword";

export interface ContentComponentProps {
  navigateToContent: (content: Content) => void;
}
