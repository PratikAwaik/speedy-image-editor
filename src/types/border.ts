export interface IBorder {
  width: string;
  style: BorderStyle;
  color: string;
}

export enum BorderStyle {
  DOTTED = "dotted",
  DASHED = "dashed",
  SOLID = "solid",
  DOUBLE = "double",
  GROOVE = "groove",
  RIDGE = "ridge",
}
