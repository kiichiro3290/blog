import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
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
        <div className="flex flex-row">
          <div className="basis-3/4">
            {router.isFallback ? (
              <PostTitle>Loading…</PostTitle>
            ) : (
              <>
                <article className="mb-32">
                  <Head>
                    <title>{title}</title>
                  </Head>
                  <PostHeader
                    title={post.title}
                    date={post.date}
                    author={post.author}
                  />
                  <PostBody content={post.content} />
                </article>
              </>
            )}
          </div>
          <div className="basis-1/3">
            <Sidebar allPosts={allPosts} />
          </div>
        </div>
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
  const allPosts = getAllPosts(["title", "date", "slug", "author", "tags"]);

  const post = getPostBySlug(params.slug, [
    "title",
    "date",
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
