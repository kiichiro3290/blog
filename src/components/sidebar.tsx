import Link from "next/link";
import PostType from "@/interfaces/post";

type Props = {
  allPosts: PostType[];
};

const Sidebar = ({ allPosts }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <p className="font-bold text-2xl pb-4">他のページ</p>
      <div className="flex flex-col gap-4 rounded-md bg-white w-full p-4">
        {allPosts &&
          allPosts.map((post) => (
            <Link
              key={post.slug}
              as={`/posts/${post.slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              <p className="text-xl">{post.title}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
