import {IText} from "@/types/text";
import {create} from "zustand";
import {v4 as uuidv4} from "uuid";

interface TextStoreProps {
  texts: IText[];
  addText: (text: Partial<IText>) => void;
  removeText: (id: string) => void;
  updateText: (id: string, textData: Partial<IText>) => void;
  selectedText: IText | null;
  setSelectedText: (id: string | null) => void;
}

export const useTextStore = create<TextStoreProps>((set) => ({
  texts: [],
  addText: (text: Partial<IText>) =>
    set((state) => ({
      texts: [...state.texts, {...text, id: uuidv4()} as IText],
    })),
  removeText: (id: string) =>
    set((state) => ({texts: state.texts.filter((text) => text.id !== id)})),
  updateText: (id: string, textData: Partial<IText>) =>
    set((state) => ({
      texts: state.texts.map((text) =>
        text.id === id ? {...text, ...textData} : text
      ),
    })),
  selectedText: null,
  setSelectedText: (id: string | null) =>
    set((state) => ({
      selectedText:
        id !== null ? state.texts.find((text) => text.id === id) : null,
    })),
}));
