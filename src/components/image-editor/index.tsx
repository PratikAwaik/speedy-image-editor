/* eslint-disable @next/next/no-img-element */
"use client";

import {DragEvent, useEffect, useRef, useState} from "react";
import Text from "./text";
import {useImageStore} from "@/stores/image";
import ImageUploader from "../image-uploader";
import {Button} from "../ui/button";
import {Download} from "lucide-react";
import {toPng} from "html-to-image";
import {useTextStore} from "@/stores/text";
import {useFiltersStore} from "@/stores/filters";
import {useBorderStore} from "@/stores/border";

export default function ImageEditor() {
  const uploadedImage = useImageStore((s) => s.uploadedImage);
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null
  >();
  const texts = useTextStore((s) => s.texts);
  const updateText = useTextStore((s) => s.updateText);
  const filters = useFiltersStore((s) => s.filters);
  const border = useBorderStore((s) => s.border);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    showImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedImage]);

  const showImage = () => {
    if (uploadedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onloadend = () => {
        if (reader.result) setImagePreview(reader.result);
      };
    }
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    const text = texts.find(
      (t) => t.id === (e.dataTransfer.getData("textData") as string)
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
        link.download = uploadedImage?.name + "-edited.png";
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <div className="w-full flex items-end justify-around gap-6">
        <ImageUploader />
        {uploadedImage && (
          <Button className="gap-2" onClick={downloadImage}>
            <Download width={20} height={20} />
            Download
          </Button>
        )}
      </div>
      {imagePreview && (
        <div className="flex flex-col items-center justify-center gap-8">
          <div
            className="w-[600px] max-h-[600px] relative border"
            onDrop={(e) => handleOnDrop(e)}
            onDragOver={(e) => handleOnDragOver(e)}
          >
            <div
              className="w-full h-full"
              ref={imageContainerRef}
              style={{
                borderWidth: `${border?.width}px`,
                borderStyle: border?.style,
                borderColor: border?.color,
              }}
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
              />
              {texts.map((text) => (
                <Text key={text.id} textData={text} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
