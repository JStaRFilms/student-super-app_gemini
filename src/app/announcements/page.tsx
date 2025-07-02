// src/app/announcements/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "~/trpc/server";

export default async function AnnouncementsPage() {
  const announcements = await api.announcement.getAllAnnouncements();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">All Announcements</h1>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <CardTitle>{announcement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{announcement.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted by {announcement.author.name} on{" "}
                {announcement.createdAt.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
