import Head from "next/head";
import { getAllPosts } from "@/lib/api";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Container from "@/components/container";
import Posts from "@/components/posts";
import Intro from "@/components/intro";

export default function Page() {
  const allPosts = getAllPosts();

  return (
    <>
      <Head>
        <title>{`Top Page`}</title>
      </Head>
      <Header />

      <Container>
        <Intro />
        <div className="flex flex-row gap-8 pb-32">
          <div className="lg:basis-3/4 w-full">
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
          <div className="basis-1/4 hidden lg:inline-flex">
            <Sidebar allPosts={allPosts} />
          </div>
        </div>
      </Container>
    </>
  );
}
