import Container from "@/components/container";
import Header from "@/components/header";
import PostBody from "@/components/post-body";
import PostInfo from "@/components/post-info";
import PostTitle from "@/components/post-title";
import Sidebar from "@/components/sidebar";
import { getAllPosts, getPost, getPostSlugs } from "@/lib/api";
import Head from "next/head";

type Param = {
  slug: string;
};

type Props = {
  params: Param;
};

export async function generateStaticParams(): Promise<Param[]> {
  const slugs = getPostSlugs();
  return slugs.map((slug) => {
    const realSlug = slug.replace(/\.md$/, "");
    return { slug: realSlug };
  });
}

export default async function Page({ params }: Props) {
  if (!params.slug) {
    // TODO: NotFoundページ
    return <>404: NotFound</>;
  }

  const post = getPost(params.slug);
  const allPosts = getAllPosts();
  const title = `${post.title}`;

  return (
    <>
      <Header />
      <Container>
        <article className="pb-32 basis-3/4">
          <Head>
            <title>{title}</title>
          </Head>
          <PostTitle>{title}</PostTitle>
          <div className="flex flex-row gap-8">
            <div className="lg:basis-3/4 sm:w-full bg-white rounded-md px-4">
              <PostBody content={post.content} />
            </div>
            <div className="basis-1/3 hidden lg:inline-block">
              <PostInfo createdAt={post.createdAt} author={post.author} />
              <Sidebar allPosts={allPosts} />
            </div>
          </div>
        </article>
      </Container>
    </>
  );
}
