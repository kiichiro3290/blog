import type Author from './author'

type PostType = {
  slug: string
  title: string
  createdAt: string
  lastUpdated: string
  author: Author
  tags: string[]
  content: string
}

export default PostType