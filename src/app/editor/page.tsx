import ImageEditor from "@/components/image-editor";
import ImageUploader from "@/components/image-uploader";

export default function EditorPage() {
  return (
    <div className="max-w-[800px] flex items-center justify-center">
      <div className="flex flex-col gap-8">
        <ImageUploader />
        <ImageEditor />
      </div>
    </div>
  );
}
