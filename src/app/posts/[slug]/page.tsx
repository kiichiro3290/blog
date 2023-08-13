import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";
import PostBody from "@/components/post-body";
import PostInfo from "@/components/post-info";
import PostTitle from "@/components/post-title";
import { getPost, getPostSlugs } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
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
  const post = getPost(params.slug);
  const content = await markdownToHtml(post.content);
  const title = `${post.title}`;

  // if (!post?.slug) {
  // return <>404: NotFound</>;
  // }

  return (
    <Layout>
      <Header />
      <Container>
        <article className="mb-32 basis-3/4">
          <Head>
            <title>{title}</title>
          </Head>
          <PostTitle>{title}</PostTitle>
          <div className="flex flex-row gap-8">
            <div className="lg:basis-3/4 sm:w-full bg-white rounded-md px-4">
              <PostBody content={content} />
            </div>
            <div className="basis-1/3 sm:hidden lg:inline">
              <PostInfo createdAt={post.createdAt} author={post.author} />
              {/* <Sidebar allPosts={allPosts} /> */}
            </div>
          </div>
        </article>
      </Container>
    </Layout>
  );
}
