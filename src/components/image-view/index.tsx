/* eslint-disable @next/next/no-img-element */
"use client";

import {DragEvent, useEffect, useRef, useState} from "react";
import Text from "./text";
import {useImageStore} from "@/stores/image";
import {Button} from "../ui/button";
import {Download} from "lucide-react";
import {toPng} from "html-to-image";
import {useTextStore} from "@/stores/text";
import {useFiltersStore} from "@/stores/filters";
import {useBorderStore} from "@/stores/border";
import {Input} from "../ui/input";

export default function ImageView() {
  const uploadedImage = useImageStore((s) => s.uploadedImage);
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null
  >();
  const texts = useTextStore((s) => s.texts);
  const updateText = useTextStore((s) => s.updateText);
  const filters = useFiltersStore((s) => s.filters);
  const border = useBorderStore((s) => s.border);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [filename, setFilename] = useState("");

  useEffect(() => {
    if (uploadedImage && !imagePreview) showImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedImage]);

  const showImage = () => {
    const reader = new FileReader();
    reader.readAsDataURL(uploadedImage as File);
    reader.onloadend = () => {
      if (reader.result) setImagePreview(reader.result);
    };
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    const text = texts.find(
      (t) => t.id === (e.dataTransfer.getData("textId") as string)
    );
    if (text?.offsetX && text?.offsetY) {
      const textDataToUpdate = {
        left: e.nativeEvent.offsetX - text.offsetX,
        top: e.nativeEvent.offsetY - text.offsetY,
      };

      updateText(text.id, textDataToUpdate);
    }
  };

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const downloadImage = () => {
    if (imageContainerRef.current) {
      toPng(imageContainerRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = filename
          ? filename + ".png"
          : uploadedImage?.name + "-edited.png";
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  if (!imagePreview) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-6">
      <div className="flex flex-col items-center justify-center gap-8">
        <div
          className="w-[600px] max-h-[600px] relative border"
          onDrop={(e) => handleOnDrop(e)}
          onDragOver={(e) => handleOnDragOver(e)}
          id="image-editor-container"
        >
          <div
            className="w-full h-full"
            ref={imageContainerRef}
            style={{
              border: border
                ? `${border.width}px ${border.style} ${border.color}`
                : "none",
            }}
            // tabIndex for onBlur to set e.relatedTarget
            tabIndex={0}
          >
            <img
              src={imagePreview as string}
              alt="Uploaded Image Preview"
              className="w-full h-full object-contain"
              loading="lazy"
              style={{
                filter: filters
                  .filter((f) => f.value !== null || f.value !== undefined)
                  .map((f) => `${f.type}(${f.value}${f.unit ? f.unit : ""})`)
                  .join(" "),
              }}
              // tabIndex for onBlur to set e.relatedTarget
              tabIndex={0}
            />
            {texts.map((text) => (
              <Text key={text.id} textData={text} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-around gap-6 w-full">
          <Input
            type="text"
            placeholder="File name"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <Button className="gap-2" onClick={downloadImage}>
            <Download width={20} height={20} />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
