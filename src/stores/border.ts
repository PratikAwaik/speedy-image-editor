import {IBorder} from "@/types/border";
import {create} from "zustand";

interface BorderStoreProps {
  border: IBorder | null;
  setBorder: (border: IBorder | null) => void;
}

export const useBorderStore = create<BorderStoreProps>((set) => ({
  border: null,
  setBorder: (border: IBorder | null) => set({border}),
}));
