import Link from "next/link";

import { CreatePost } from "@/components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Create <span className="text-red-400">T3</span> App
        </h1>
        <div className="flex flex-col gap-4 md:gap-8 md:flex-row sm:px-8 max-w-4xl">
          <Card className="w-[350px]">
            <Link href='https://create.t3.gg/en/usage/first-steps' target="_blank">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">First Steps →</CardTitle>
              </CardHeader>
              <CardContent>
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </CardContent>
            </Link>
          </Card>
          <Card className="w-[350px]">
            <Link href="https://create.t3.gg/en/introduction" target="_blank">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Documentation →</CardTitle>
              </CardHeader>
              <CardContent>
                Learn more about Create T3 App, the libraries it uses, and how to
                deploy it.
              </CardContent>
            </Link>
          </Card>
        </div >
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Button asChild>
              <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                {session ? "Sign out" : "Sign in"}
              </Link>
            </Button>
          </div>
        </div>
        <CrudShowcase />
      </div >
    </main >
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  // if (!session?.user) return null;

  // const latestPost = await api.post.getLatest();
  const latestPost = {
    id: 1,
    name: 'name',
    createdAt: 'now',
    updatedAt: 'now',
    createdById: '1',
  }

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        {latestPost ? (
          <p className="truncate">Your most recent post: {latestPost.name}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}
      </CardHeader>
      <CardContent>
        <CreatePost />
      </CardContent>
    </Card>
  );
}
