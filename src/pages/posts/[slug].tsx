import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostInfo from "../../components/post-info";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import Sidebar from "../../components/sidebar";

type Props = {
  post: PostType;
  allPosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, allPosts, preview }: Props) {
  const router = useRouter();
  const title = `${post.title}`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Header />
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
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
                <Sidebar allPosts={allPosts} />
              </div>
            </div>
          </article>
        )}
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const allPosts = getAllPosts([
    "title",
    "createdAt",
    "lastUpdated",
    "slug",
    "author",
    "tags",
  ]);

  const post = getPostBySlug(params.slug, [
    "title",
    "createdAt",
    "lastUpdated",
    "slug",
    "author",
    "content",
    "tags",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      allPosts,
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
