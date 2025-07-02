import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await auth();
  const latestAnnouncements = await api.announcement.getLatestAnnouncements();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-100 p-4">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <Link href="/profile">
                  <span className="font-semibold">{session.user.name}</span>
                </Link>
                <Link
                  href="/api/auth/signout"
                  className="rounded-full bg-gray-200 px-4 py-2 font-semibold no-underline transition hover:bg-gray-300"
                >
                  Sign out
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white no-underline transition hover:bg-blue-600"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Latest Announcements</h2>
            <div className="space-y-4">
              {latestAnnouncements.map((announcement) => (
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

          <div>
            <h2 className="text-2xl font-bold mb-4">Resource Spotlight</h2>
            {/* Placeholder for resource spotlight */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Title</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Resource description...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
