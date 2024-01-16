"use client";

import {ChangeEvent} from "react";
import {Input} from "./ui/input";
import {Label} from "./ui/label";
import {useImageStore} from "@/stores/image-store";

export default function ImageUploader() {
  const setUploadedImage = useImageStore((s) => s.setUploadedImage);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) setUploadedImage(files[0]);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="image-uploader">Upload Image</Label>
      <Input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        id="image-uploader"
        onChange={handleChange}
      />
    </div>
  );
}
