import {ITextData} from "@/types/text-data";
import {FormEvent, useEffect, useState} from "react";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {HexColorPicker} from "react-colorful";
import {Button} from "../ui/button";
import {useTextStore} from "@/stores/text";
import {Trash} from "lucide-react";

export default function AddEditTextForm() {
  const [textData, setTextData] = useState<Partial<ITextData>>({
    text: "",
    fontSize: "14",
    color: "",
  });
  const selectedText = useTextStore((s) => s.selectedText);
  const setSelectedText = useTextStore((s) => s.setSelectedText);
  const addText = useTextStore((s) => s.addText);
  const updateText = useTextStore((s) => s.updateText);
  const removeText = useTextStore((s) => s.removeText);

  useEffect(() => {
    if (selectedText?.id) {
      setTextData(selectedText);
    } else
      setTextData({
        text: "",
        fontSize: "14",
        color: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedText?.id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedText?.id) updateText(selectedText.id, textData);
    else {
      addText(textData);
      setTextData({
        text: "",
        fontSize: "14",
        color: "",
      });
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="text">Text</Label>
        <Input
          type="text"
          id="text"
          value={textData?.text}
          onChange={(e) => setTextData({...textData, text: e.target.value})}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="font-size">Font size</Label>
        <Input
          type="number"
          id="font-size"
          value={textData?.fontSize}
          onChange={(e) => setTextData({...textData, fontSize: e.target.value})}
          required
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
      <div className="flex items-center gap-4">
        <Button type="button" onClick={handleSubmit} className="w-full">
          {selectedText?.id ? "Update" : "Add"} Text
        </Button>
        {selectedText && (
          <Button
            type="button"
            onClick={() => {
              removeText(selectedText.id);
              setSelectedText(null);
            }}
          >
            <Trash width={20} height={20} />
          </Button>
        )}
      </div>
    </form>
  );
}
