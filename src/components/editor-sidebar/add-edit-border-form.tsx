import {BorderStyle, IBorder} from "@/types/border";
import {FormEvent, useEffect, useState} from "react";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {HexColorPicker} from "react-colorful";
import {Button} from "../ui/button";
import {Trash} from "lucide-react";
import {useBorderStore} from "@/stores/border";
import {Combobox} from "../ui/combobox";

const borderStyleOptions = [
  // dotted", "dashed", "solid", "double", "groove", "ridge

  {label: "Dotted", value: BorderStyle.DOTTED},
  {
    label: "Dashed",
    value: BorderStyle.DASHED,
  },
  {label: "Solid", value: BorderStyle.SOLID},
  {label: "Double", value: BorderStyle.DOUBLE},
  {label: "Groove", value: BorderStyle.GROOVE},
  {label: "Ridge", value: BorderStyle.RIDGE},
];

export default function AddEditBorderForm() {
  const [border, setBorder] = useState<IBorder>({
    width: "",
    style: BorderStyle.SOLID,
    color: "",
  });
  const storeBorder = useBorderStore((s) => s.border);
  const setStoreBorder = useBorderStore((s) => s.setBorder);

  useEffect(() => {
    if (storeBorder) {
      setBorder(storeBorder);
    } else
      setBorder({
        width: "",
        style: BorderStyle.SOLID,
        color: "",
      });
  }, [storeBorder]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStoreBorder(border);
  };

  return (
    <form className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="border-width">Border width</Label>
        <div className="relative">
          <Input
            id="border-width"
            type="number"
            value={border.width}
            onChange={(e) =>
              setBorder((prev) => ({...prev, width: e.target.value}))
            }
          />
          <div className="h-full w-fit bg-slate-600 px-3 absolute right-0 top-0 text-sm text-primary-foreground dark:text-secondary-foreground inline-flex items-center rounded-tr-md rounded-br-md">
            px
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="border-style">Border style</Label>
        <Combobox
          options={borderStyleOptions}
          value={border.style}
          setValue={(val) =>
            setBorder((prev) => ({...prev, style: val as BorderStyle}))
          }
        />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              <span>Select</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["dotted", "dashed", "solid", "double", "groove", "ridge"].map(
              (style) => (
                <DropdownMenuItem key={style}>{style}</DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="border-color">Border color</Label>
        <HexColorPicker
          color={border.color}
          onChange={(color) => setBorder((prev) => ({...prev, color}))}
          className="!w-full"
        />
      </div>
      <div className="w-full flex items-center gap-4">
        <Button type="submit" onClick={handleSubmit} className="grow">
          Add border
        </Button>
        {storeBorder && (
          <Button type="button" onClick={() => setStoreBorder(null)}>
            <Trash width={20} height={20} />
          </Button>
        )}
      </div>
    </form>
  );
}
