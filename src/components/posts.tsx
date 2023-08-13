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
    <section className="border-b-2 border-slate-300 mb-8">
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg flex flex-row">
            <p>作成日：</p>
            <DateFormatter dateString={createdAt} />
          </div>
        </div>
        <div>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
};

export default Posts;
