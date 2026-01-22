import Head from "next/head";
import { getAllPosts } from "@/lib/api";
import Container from "@/components/container";
import Canvas from "@/components/canvas";

export default function Page() {
  const allPosts = getAllPosts();

  return (
    <>
      <Head>
        <title>{`Top Page`}</title>
      </Head>
      <Container>
        <div className="flex flex-col gap-8 pb-32 max-w-2xl mx-auto items-center mt-16">
          <div className="w-full h-full">
            <Canvas posts={allPosts} />
          </div>
        </div>
      </Container>
    </>
  );
}
