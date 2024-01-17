export interface IFilter {
  id: string;
  name: string;
  type: FilterType;
  unit: FilterUnit | null;
  value?: string | null;
}

export enum FilterType {
  BLUR = "blur",
  BRIGHTNESS = "brightness",
  CONTRAST = "contrast",
  GRAYSCALE = "grayscale",
  HUE_ROTATE = "hue-rotate",
  INVERT = "invert",
  OPACITY = "opacity",
  SATURATE = "saturate",
  SEPIA = "sepia",
}

export enum FilterUnit {
  PX = "px",
  DEG = "deg",
}
