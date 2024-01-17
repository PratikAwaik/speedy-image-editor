import {filters} from "@/lib/constants";
import {IFilter} from "@/types/filter";
import {KeyboardEvent, useMemo, useState} from "react";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {useFiltersStore} from "@/stores/filters";
import {Info} from "lucide-react";

export default function AddEditFiltersForm() {
  return (
    <form className="flex flex-col gap-4 w-full max-h-[600px] py-6 overflow-auto">
      <p className="text-sm inline-flex items-start gap-2">
        <Info width={20} height={20} />
        Press enter after adding values for the effect to take place.
      </p>
      {filters.map((filter) => (
        <FilterInput key={filter.id} filter={filter} />
      ))}
    </form>
  );
}

function FilterInput({filter}: {filter: IFilter}) {
  const filters = useFiltersStore((s) => s.filters);
  const filterExists = useMemo(
    () => filters.find((f) => f.id === filter.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter.id, filters.length]
  );
  const [value, setValue] = useState("");
  const addFilter = useFiltersStore((s) => s.addFilter);
  const updateFilter = useFiltersStore((s) => s.updateFilter);
  const removeFilter = useFiltersStore((s) => s.removeFilter);

  const handleAddFilter = () => {
    if (filterExists) {
      if (value === "") removeFilter(filter.id);
      else updateFilter(filter.id, {value});
    } else addFilter({...filter, value});
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddFilter();
    }
  };

  return (
    <div key={filter.type} className="flex flex-col gap-2 mx-2">
      <Label htmlFor={filter.type}>{filter.name}</Label>
      <div className="relative">
        <Input
          type="number"
          id={filter.type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          required
        />
        {filter.unit && (
          <div className="h-full w-fit bg-slate-600 px-3 absolute right-0 top-0 text-sm text-primary-foreground dark:text-secondary-foreground inline-flex items-center rounded-tr-md rounded-br-md">
            {filter.unit}
          </div>
        )}
      </div>
    </div>
  );
}
