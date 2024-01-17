"use client";

import {cn} from "@/lib/utils";
import {DragEvent, FocusEvent, useEffect, useRef, useState} from "react";
import {ITextData} from "@/types/text";
import {useTextStore} from "@/stores/text";

interface TextProps {
  textData: ITextData;
}

export default function Text({textData}: TextProps) {
  const [editable, setEditable] = useState(false);
  const setSelectedText = useTextStore((s) => s.setSelectedText);
  const updateText = useTextStore((s) => s.updateText);
  const paraRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (paraRef.current && editable) {
      paraRef.current.focus();
    }
  }, [editable]);

  const handleOnDragStart = (e: DragEvent<HTMLDivElement>) => {
    updateText(textData.id, {
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
    e.dataTransfer.setData(`textData`, textData.id);
  };

  const handleOnBlur = (e: FocusEvent<HTMLDivElement>) => {
    const imageEditorContainer = document.getElementById(
      "image-editor-container"
    );

    // allow blur to work only inside image container
    if (imageEditorContainer?.contains(e.relatedTarget)) {
      setEditable(false);
      updateText(textData.id, {text: paraRef.current?.innerText});
      setSelectedText(null);
    }
  };

  return (
    <div
      className={cn(
        "absolute z-10 rounded-md",
        editable ? "cursor-default" : "cursor-move",
        editable ? "border border-dashed border-border" : "border-none"
      )}
      draggable
      onDragStart={handleOnDragStart}
      style={{
        top: textData?.top ? textData?.top : "50%",
        left: textData?.left ? textData?.left : "50%",
      }}
      onBlur={handleOnBlur}
    >
      <div
        className="relative p-1 w-fit"
        onClick={(e) => {
          if (!editable) {
            e.stopPropagation();
            setEditable(true);
            setSelectedText(textData.id);
          }
        }}
      >
        <p
          style={{
            color: textData?.color,
            fontSize: textData?.fontSize + "px",
          }}
          contentEditable={editable}
          ref={paraRef}
          className="px-2 py-1 outline-none border-none"
          suppressContentEditableWarning
        >
          {textData.text}
        </p>
      </div>
    </div>
  );
}
