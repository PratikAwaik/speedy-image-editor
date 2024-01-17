import {IFilter} from "@/types/filter";
import {create} from "zustand";

interface FiltersStoreProps {
  filters: IFilter[];
  addFilter: (filter: IFilter) => void;
  removeFilter: (id: string) => void;
  updateFilter: (id: string, filter: Partial<IFilter>) => void;
}

export const useFiltersStore = create<FiltersStoreProps>((set) => ({
  filters: [],
  addFilter: (filter: IFilter) =>
    set((state) => ({filters: [...state.filters, filter]})),
  removeFilter: (id: string) =>
    set((state) => ({filters: state.filters.filter((f) => f.id !== id)})),
  updateFilter: (id: string, filter: Partial<IFilter>) =>
    set((state) => ({
      filters: state.filters.map((f) => (f.id === id ? {...f, ...filter} : f)),
    })),
}));
