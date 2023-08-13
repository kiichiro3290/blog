import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";
import PostBody from "@/components/post-body";
import PostInfo from "@/components/post-info";
import PostTitle from "@/components/post-title";
import { getPost } from "@/lib/api";
import Head from "next/head";

type Props = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: Props) {
  const post = getPost(params.slug);
  const title = `${post.title}`;

  if (!post?.slug) {
    // return <ErrorPage statusCode={404} />;
    // TODO: エラーページ作成
  }

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
              <PostBody content={post.content} />
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
