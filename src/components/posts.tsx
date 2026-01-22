import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  createdAt: string;
  author?: Author;
  slug: string;
};

const Posts = ({ title, createdAt, author, slug }: Props) => {
  return (
    <section className="mb-8 p-4 w-full">
      <Link as={`/${slug}`} href="/[slug]" className="hover:underline">
        {title}
      </Link>
    </section>
  );
};

export default Posts;
