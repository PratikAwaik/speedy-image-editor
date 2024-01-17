export interface ISidebarOption {
  type: string;
  component: React.ReactNode;
  icon: React.ReactNode;
  text: string;
}

export enum ISidebarOptionType {
  TEXT = "text",
  FILTERS = "filters",
  BORDER = "border",
}
