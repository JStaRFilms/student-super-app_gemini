// src/app/resources/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "~/trpc/server";

export default async function ResourcesPage() {
  const resources = await api.resource.getResources();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Resource Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {resource.type}</p>
              <p>Course: {resource.courseCode}</p>
              <p>Level: {resource.level}</p>
              <p>Semester: {resource.semester}</p>
              <a href={resource.fileUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">Download</a>
              <p className="text-sm text-gray-500 mt-2">
                Uploaded by {resource.uploader.name} on{" "}
                {resource.createdAt.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
