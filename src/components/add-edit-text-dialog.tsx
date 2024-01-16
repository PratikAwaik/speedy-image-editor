import {Text} from "lucide-react";
import {Button} from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {Label} from "./ui/label";
import {Input} from "./ui/input";
import {HexColorPicker} from "react-colorful";
import {useImageStore} from "@/stores/image-store";
import {useEffect, useState} from "react";
import {ITextData} from "@/types/text-data";

export default function AddEditTextDialog() {
  const open = useImageStore((s) => s.openAddEditDialog);
  const setOpen = useImageStore((s) => s.setOpenAddEditDialog);
  const addText = useImageStore((s) => s.addText);
  const [textData, setTextData] = useState<Partial<ITextData>>({
    text: "",
    fontSize: "14",
    color: "",
  });
  const selectedText = useImageStore((s) => s.selectedText);
  const updateText = useImageStore((s) => s.updateText);

  useEffect(() => {
    if (selectedText) {
      setTextData(selectedText);
    }
  }, [selectedText]);

  const onOpenChange = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    // setTextData({...textData, toAddText: true});
    if (selectedText) updateText(selectedText.id, textData);
    else addText(textData);
    onOpenChange();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Text width={16} height={16} />
          <span>Text</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedText ? "Update" : "Add"} text</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 my-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="text">Text</Label>
            <Input
              type="text"
              id="text"
              value={textData?.text}
              onChange={(e) => setTextData({...textData, text: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="font-size">Font size</Label>
            <Input
              type="number"
              id="font-size"
              value={textData?.fontSize}
              onChange={(e) =>
                setTextData({...textData, fontSize: e.target.value})
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="color">Color</Label>
            <HexColorPicker
              color={textData?.color}
              onChange={(color) => setTextData({...textData, color: color})}
              className="!w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} className="w-full">
            {selectedText ? "Update" : "Add"} Text
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
