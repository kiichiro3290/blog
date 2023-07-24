import Container from "../components/container";
import Posts from "../components/posts";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{`Top Page`}</title>
        </Head>
        <Header />
        <Container>
          <div className="flex flex-row">
            <div className="basis-3/4">
              <Intro />
              {allPosts &&
                allPosts.map((post) => (
                  <Posts
                    title={post.title}
                    date={post.date}
                    author={post.author}
                    slug={post.slug}
                  />
                ))}
            </div>
            <div className="basis-1/4">
              <Sidebar allPosts={allPosts} />
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}

// SSG
export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "author"]);

  return {
    props: { allPosts },
  };
};
