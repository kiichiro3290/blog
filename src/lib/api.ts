import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import Post from '@/interfaces/post'

const postsDirectory = join(process.cwd(), 'src/docs/')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  console.log(data, content)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getPost(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    title: data.title,
    createdAt: data.createdAt,
    lastUpdated: data.lastUpdated,
    author: data.author,
    tags: data.tags,
    content: content
  }

}

// フィールドに欲しい値を入力する→柔軟
export function getAllPosts(): Post[] {
  
  const slugs = getPostSlugs()

  const posts = slugs
    .map((slug) => {
      const post = getPost(slug)
      return post
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.lastUpdated > post2.lastUpdated ? -1 : 1))

  return posts
}