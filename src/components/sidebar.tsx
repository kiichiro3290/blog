import Link from "next/link";
import Post from "../interfaces/post";

type Props = {
  allPosts: Post[];
};

const Sidebar = ({ allPosts }: Props) => {
  return (
    <div className="flex flex-col px-8 sm:hidden lg:inline-flex">
      <p className="font-bold text-2xl pb-4">サイドバー</p>
      <div className="flex flex-col gap-4">
        {allPosts &&
          allPosts.map((post) => (
            <Link
              key={post.slug}
              as={`/posts/${post.slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              <p className="text-2xl">{post.title}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
