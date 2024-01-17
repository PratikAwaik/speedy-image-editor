import {ITextData} from "@/types/text-data";
import {create} from "zustand";
import {v4 as uuidv4} from "uuid";

interface TextStoreProps {
  texts: ITextData[];
  addText: (text: Partial<ITextData>) => void;
  removeText: (id: string) => void;
  updateText: (id: string, textData: Partial<ITextData>) => void;
  selectedText: ITextData | null;
  setSelectedText: (id: string | null) => void;
}

export const useTextStore = create<TextStoreProps>((set) => ({
  texts: [],
  addText: (text: Partial<ITextData>) =>
    set((state) => ({
      texts: [...state.texts, {...text, id: uuidv4()} as ITextData],
    })),
  removeText: (id: string) =>
    set((state) => ({texts: state.texts.filter((text) => text.id !== id)})),
  updateText: (id: string, textData: Partial<ITextData>) =>
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
