import {create} from "zustand";

interface ImageStoreProps {
  uploadedImage: File | null;
  setUploadedImage: (image: File) => void;
}

export const useImageStore = create<ImageStoreProps>((set) => ({
  uploadedImage: null,
  setUploadedImage: (image: File) => set(() => ({uploadedImage: image})),
}));
