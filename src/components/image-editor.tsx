/* eslint-disable @next/next/no-img-element */
"use client";

import {DragEvent, useEffect, useState} from "react";
import AddEditTextDialog from "./add-edit-text-dialog";
import Text from "./text";
import {useImageStore} from "@/stores/image-store";

export default function ImageEditor() {
  const uploadedImage = useImageStore((s) => s.uploadedImage);
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null
  >();
  // const textData = useImageStore((s) => s.textData);
  // const setTextData = useImageStore((s) => s.setTextData);
  const texts = useImageStore((s) => s.texts);
  const selectedText = useImageStore((s) => s.selectedText);
  const updateText = useImageStore((s) => s.updateText);

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
    const text = texts[Number(e.dataTransfer.getData("textData") as string)];
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

  return (
    <div className="w-full h-full">
      {imagePreview && (
        <div className="flex flex-col gap-8">
          <div
            className="w-[600px] max-h-[600px] relative border"
            onDrop={(e) => handleOnDrop(e)}
            onDragOver={(e) => handleOnDragOver(e)}
          >
            <img
              src={imagePreview as string}
              alt="Uploaded Image Preview"
              className="w-full h-full object-contain"
              loading="lazy"
            />
            {/* {textData?.toAddText && <Text />} */}
            {texts.map((text, idx) => (
              <Text
                key={`${text.text}-${idx}`}
                index={idx}
                textData={text}
                handleOnDrop={handleOnDrop}
              />
            ))}
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <AddEditTextDialog />
          </div>
        </div>
      )}
    </div>
  );
}
