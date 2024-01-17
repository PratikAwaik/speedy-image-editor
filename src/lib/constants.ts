import {FilterType, FilterUnit} from "@/types/filter";
import {v4 as uuidv4} from "uuid";

/* ROUTES */
export const routes = {
  auth: {
    LOGIN: "/login",
  },
  HOME: "/",
  EDITOR: "/editor",
};

/* FILTERS */
export const filters = [
  {
    id: uuidv4(),
    name: "Blur",
    type: FilterType.BLUR,
    unit: FilterUnit.PX,
  },
  {
    id: uuidv4(),
    name: "Brightness",
    type: FilterType.BRIGHTNESS,
    unit: null,
  },
  {
    id: uuidv4(),
    name: "Contrast",
    type: FilterType.CONTRAST,
    unit: null,
  },
  {
    id: uuidv4(),
    name: "Grayscale",
    type: FilterType.GRAYSCALE,
    unit: null,
  },
  {
    id: uuidv4(),
    name: "Hue rotate",
    type: FilterType.HUE_ROTATE,
    unit: FilterUnit.DEG,
  },
  {
    id: uuidv4(),
    name: "Invert",
    type: FilterType.INVERT,
    unit: null,
  },
  {
    id: uuidv4(),
    name: "Opacity",
    type: FilterType.OPACITY,
    unit: null,
  },
  {
    id: uuidv4(),
    name: "Saturate",
    type: FilterType.SATURATE,
    unit: null,
  },
  {
    id: uuidv4(),
    name: "Sepia",
    type: FilterType.SEPIA,
    unit: null,
  },
];
