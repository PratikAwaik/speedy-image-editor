import EditorSidebar from "@/components/editor-sidebar";
import ImageEditor from "@/components/image-editor";
import ImageUploader from "@/components/image-uploader";

export default function EditorPage() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-10">
      <h1 className="text-center text-4xl font-semibold mb-4 text-brand-foreground mt-6">
        🚀 Speedy Image Editor
      </h1>
      <ImageUploader />
      <div className="flex items-center max-w-[1200px] h-fit mx-auto gap-6">
        <EditorSidebar />
        <ImageEditor />
      </div>
    </div>
  );
}
