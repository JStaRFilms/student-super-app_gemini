import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Authentication pages for the Student Super-App",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {children}
    </div>
  );
}
