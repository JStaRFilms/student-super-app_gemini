// src/app/feedback/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export default function FeedbackPage() {
  const [content, setContent] = useState("");

  const submitFeedback = api.feedback.submitFeedback.useMutation({
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
      setContent("");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit feedback. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback.mutate({ content });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Anonymous Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="content">Your Feedback</Label>
          <Input
            id="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={submitFeedback.isPending}>
          {submitFeedback.isPending ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </div>
  );
}
