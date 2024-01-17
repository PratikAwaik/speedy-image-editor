import EditorSidebar from "@/components/editor-sidebar";
import ImageEditor from "@/components/image-editor";

export default function EditorPage() {
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-4xl font-semibold mb-4 text-brand-foreground mt-6">
        🚀 Speedy Image Editor
      </h1>
      <div className="flex items-center justify-between max-w-[1200px] h-full mx-auto gap-6">
        <EditorSidebar />
        <ImageEditor />
      </div>
    </div>
  );
}
