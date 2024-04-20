"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input'

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <Input type="text" placeholder="Title" onChange={(e) => setName(e.target.value)} value={name} />
      <Button type="submit" disabled={createPost.isPending}>
        {createPost.isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
