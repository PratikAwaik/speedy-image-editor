import {cn} from "@/lib/utils";
import {Button} from "../ui/button";
import {ISidebarOption} from "@/types/sidebar";

interface SidebarButtonProps {
  option: ISidebarOption;
  selectedOption: ISidebarOption;
  onClick: (option: ISidebarOption) => void;
}

export default function SidebarButton({
  option,
  selectedOption,
  onClick,
}: SidebarButtonProps) {
  return (
    <Button
      className={cn(
        "flex-col gap-1 text-foreground outline-none border-none hover:bg-brand-foreground px-3 h-fit w-14",
        selectedOption.text === option.text
          ? "bg-brand-foreground"
          : "bg-transparent"
      )}
      onClick={() => onClick(option)}
    >
      {option.icon}
      <span className="text-xs">{option.text}</span>
    </Button>
  );
}
