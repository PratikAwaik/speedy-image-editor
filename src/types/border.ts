export interface IBorder {
  width: string;
  style: BorderStyle;
  color: string;
}

export enum BorderStyle {
  // dotted", "dashed", "solid", "double", "groove", "ridge
  DOTTED = "dotted",
  DASHED = "dashed",
  SOLID = "solid",
  DOUBLE = "double",
  GROOVE = "groove",
  RIDGE = "ridge",
}
