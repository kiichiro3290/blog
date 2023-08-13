import type Author from './author'

type Post = {
  slug: string
  title: string
  createdAt: string
  lastUpdated: string
  author: Author
  tags: string[]
  content: string
}

export default Post