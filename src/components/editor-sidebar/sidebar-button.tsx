import {cn} from "@/lib/utils";
import {Button} from "../ui/button";
import {ISidebarOption} from "@/types/sidebar";
import {useTheme} from "next-themes";

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
  const {theme} = useTheme();
  return (
    <Button
      className={cn(
        "flex-col gap-1 outline-none border-none hover:bg-brand-foreground px-3 h-fit w-14",
        theme === "light"
          ? "hover:text-primary-foreground"
          : "hover:text-foreground",
        selectedOption.text === option.text
          ? theme === "light"
            ? "bg-brand-foreground text-primary-foreground"
            : "bg-brand-foreground text-foreground"
          : "bg-transparent text-foreground"
      )}
      onClick={() => onClick(option)}
    >
      {option.icon}
      <span className="text-xs">{option.text}</span>
    </Button>
  );
}
