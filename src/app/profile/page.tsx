// src/app/profile/page.tsx
"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Profile</h1>
      {session?.user && (
        <div className="mt-4">
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>
          <p>
            <strong>Matriculation Number:</strong> {session.user.matricNumber}
          </p>
          <p>
            <strong>Role:</strong> {session.user.role}
          </p>
        </div>
      )}
    </div>
  );
}
