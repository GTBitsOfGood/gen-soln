export type Content = "login" | "forgotPassword" | "chooseService" | "signup";

export interface ContentComponent {
  navigateToContent: (content: Content) => void;
}
