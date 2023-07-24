import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  author: Author
  tags: string[]
  content: string
}

export default PostType