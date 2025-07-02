// src/app/resources/upload/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export default function ResourceUploadPage() {
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [type, setType] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [level, setLevel] = useState(0);
  const [semester, setSemester] = useState(0);
  const router = useRouter();

  const createResource = api.resource.createResource.useMutation({
    onSuccess: () => {
      toast.success("Resource uploaded successfully!");
      router.push("/resources");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload resource. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createResource.mutate({
      title,
      fileUrl,
      type,
      courseCode,
      level,
      semester,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Upload Resource</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="fileUrl">File URL</Label>
          <Input
            id="fileUrl"
            type="url"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="courseCode">Course Code</Label>
          <Input
            id="courseCode"
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="level">Level</Label>
          <Input
            id="level"
            type="number"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <Label htmlFor="semester">Semester</Label>
          <Input
            id="semester"
            type="number"
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            required
          />
        </div>
        <Button type="submit" disabled={createResource.isPending}>
          {createResource.isPending ? "Uploading..." : "Upload Resource"}
        </Button>
      </form>
    </div>
  );
}
