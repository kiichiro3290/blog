import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  date: string;
  author: Author;
  slug: string;
};

const PostPreview = ({ title, date, author, slug }: Props) => {
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
};

export default PostPreview;
