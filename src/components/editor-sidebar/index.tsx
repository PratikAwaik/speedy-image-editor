"use client";

import {Box, Filter, Text} from "lucide-react";
import {useState} from "react";
import {ISidebarOption} from "@/types/sidebar";
import SidebarButton from "./sidebar-button";
import AddEditTextForm from "./add-edit-text-form";
import AddEditFiltersForm from "./add-edit-filters-form";
import AddEditBorderForm from "./add-edit-border-form";
import {useImageStore} from "@/stores/image";

const sidebarOptions = [
  {
    type: "text",
    component: <AddEditTextForm />,
    icon: <Text width={20} height={20} className="shrink-0" />,
    text: "Text",
  },
  {
    type: "filters",
    component: <AddEditFiltersForm />,
    icon: <Filter width={20} height={20} className="shrink-0" />,
    text: "Filters",
  },
  {
    type: "border",
    component: <AddEditBorderForm />,
    icon: <Box width={20} height={20} className="shrink-0" />,
    text: "Border",
  },
];

export default function EditorSidebar() {
  const [selectedOption, setSelectedOption] = useState<ISidebarOption>(
    sidebarOptions[0]
  );
  const uploadedImage = useImageStore((s) => s.uploadedImage);

  const handleOnClick = (option: ISidebarOption) => {
    setSelectedOption(option);
  };

  if (!uploadedImage) return null;

  return (
    <div className="w-fit h-full flex items-center gap-2">
      <div className="w-fit h-fit p-4 rounded-lg flex flex-col items-center justify-center gap-4 bg-sidebar-background">
        {sidebarOptions.map((option: ISidebarOption) => (
          <SidebarButton
            key={option.text}
            option={option}
            selectedOption={selectedOption}
            onClick={handleOnClick}
          />
        ))}
      </div>
      <div className="w-80 max-h-[600px] bg-sidebar-background rounded-lg p-6 flex items-center">
        {selectedOption.component}
      </div>
    </div>
  );
}
