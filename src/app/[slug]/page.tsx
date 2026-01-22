import Container from "@/components/container";
import PostBody from "@/components/post-body";
import { getPost, getPostSlugs } from "@/lib/api";

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
  const title = `${post.title}`;

  return (
    <Container>
      <meta name="title" content={title} />
      <PostBody content={post.content} />
    </Container>
  );
}
