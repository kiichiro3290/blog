import Head from "next/head";
import { getAllPosts } from "@/lib/api";
import Header from "@/components/header";
import Container from "@/components/container";
import Posts from "@/components/posts";

export default function Page() {
  const allPosts = getAllPosts();

  return (
    <>
      <Head>
        <title>{`Top Page`}</title>
      </Head>
      <Container>
        <div className="flex flex-col gap-8 pb-32 mx-auto items-center mt-16">
          {allPosts &&
            allPosts.map((post) => (
              <Posts
                key={post.slug}
                title={post.title}
                createdAt={post.createdAt}
                author={post.author}
                slug={post.slug}
              />
            ))}
        </div>
      </Container>
    </>
  );
}
