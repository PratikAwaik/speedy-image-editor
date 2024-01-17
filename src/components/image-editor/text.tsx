"use client";

import {cn} from "@/lib/utils";
import {Trash} from "lucide-react";
import {DragEvent, useState} from "react";
import {ITextData} from "@/types/text-data";
import {useTextStore} from "@/stores/text";

interface TextProps {
  textData: ITextData;
}

export default function Text({textData}: TextProps) {
  const [editable, setEditable] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const setSelectedText = useTextStore((s) => s.setSelectedText);
  const updateText = useTextStore((s) => s.updateText);
  const removeText = useTextStore((s) => s.removeText);

  const [editableText, setEditableText] = useState(textData.text);

  //   const textRef = useRef<HTMLDivElement | null>(null);

  //   useEffect(() => {
  //     document.addEventListener("click", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }, []);

  //   const handleClickOutside = (e: any) => {
  //     console.log(textRef.current?.contains(e.target));
  //     console.log(e.target);
  //     if (!textRef.current?.contains(e.target)) {
  //       setShowEditOptions(false);
  //       setEditable(false);
  //     }
  //   };

  const handleOnDragStart = (e: DragEvent<HTMLDivElement>) => {
    updateText(textData.id, {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
    e.dataTransfer.setData(`textData`, textData.id);
  };

  return (
    <div
      className={cn(
        "border absolute z-10",
        editable ? "cursor-default" : "cursor-move",
        showEditOptions ? "border-dashed" : "border-none"
      )}
      draggable
      onDragStart={(e) => handleOnDragStart(e)}
      style={{
        top: textData?.top ? textData?.top : "50%",
        left: textData?.left ? textData?.left : "50%",
      }}
      //   ref={textRef}
      onBlur={() => {
        setShowEditOptions(false);
        setEditable(false);
        updateText(textData.id, {text: editableText});
        setSelectedText(null);
      }}
    >
      <div
        className="relative p-1 w-fit"
        onClick={(e) => {
          if (!showEditOptions) {
            e.stopPropagation();
            setEditable(true);
            setShowEditOptions(true);
            setSelectedText(textData.id);
          }
        }}
      >
        {editable ? (
          <input
            type="text"
            value={editableText}
            onChange={(e) => {
              setEditableText(e.target.value);
            }}
            className="bg-transparent max-w-fit border-none outline-none p-0 m-0"
            style={{
              fontSize: textData?.fontSize + "px",
              color: textData?.color,
            }}
          />
        ) : (
          <p
            style={{
              color: textData?.color,
              fontSize: textData?.fontSize + "px",
            }}
          >
            {textData?.text}
          </p>
        )}
        {showEditOptions && (
          <div className="flex items-center absolute -top-6 right-0 gap-1">
            <Trash
              width={18}
              height={18}
              className="text-background cursor-pointer"
              onClick={() => {
                removeText(textData.id);
                setSelectedText(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
