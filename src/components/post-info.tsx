import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import type Author from "../interfaces/author";

type Props = {
  createdAt: string;
  author: Author;
};

const PostInfo = ({ createdAt, author }: Props) => {
  return (
    <div className="rounded-md bg-white py-2 px-4 mb-4">
      <div>
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mt-4 mb-6 text-lg flex flex-row gap-2">
        <p>作成日: </p>
        <DateFormatter dateString={createdAt} />
      </div>
    </div>
  );
};

export default PostInfo;
