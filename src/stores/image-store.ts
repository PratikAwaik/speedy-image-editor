import {ITextData} from "@/types/text-data";
import {create} from "zustand";

interface ImageStoreProps {
  uploadedImage: File | null;
  setUploadedImage: (image: File) => void;
  openAddEditDialog: boolean;
  setOpenAddEditDialog: (open: boolean) => void;
  // textData: ITextData;
  // setTextData: (text: Partial<ITextData>) => void;
  texts: ITextData[];
  addText: (text: Partial<ITextData>) => void;
  removeText: (index: number) => void;
  updateText: (index: number, textData: Partial<ITextData>) => void;
  selectedText: ITextData | null;
  setSelectedText: (index: number | null) => void;
}

export const useImageStore = create<ImageStoreProps>((set) => ({
  uploadedImage: null,
  setUploadedImage: (image: File) => set(() => ({uploadedImage: image})),
  openAddEditDialog: false,
  setOpenAddEditDialog: (open: boolean) =>
    set(() => ({openAddEditDialog: open})),
  // textData: {
  //   id: 0,
  //   text: "",
  //   fontSize: "14",
  //   color: "",
  //   toAddText: false,
  // },
  // setTextData: (textData: Partial<ITextData>) =>
  //   set((state) => ({textData: {...state.textData, textData}})),
  texts: [],
  addText: (text: Partial<ITextData>) =>
    set((state) => ({
      texts: [...state.texts, {...text, id: state.texts.length} as ITextData],
    })),
  removeText: (index: number) =>
    set((state) => ({texts: state.texts.toSpliced(index, 1)})),
  updateText: (index: number, textData: Partial<ITextData>) =>
    set((state) => ({
      texts: state.texts.map((text, idx) =>
        index === idx ? {...text, ...textData} : text
      ),
    })),
  selectedText: null,
  setSelectedText: (index: number | null) =>
    set((state) => ({
      selectedText: index !== null ? state.texts[index] : null,
    })),
}));
