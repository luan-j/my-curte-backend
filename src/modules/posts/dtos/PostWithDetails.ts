export type PostWithDetails = {
  id: string
  content: string
  mediaSourceUrl?: string[]
  replyForPostId?: string
  repostForPostId?: string
  author: {
    id: string
    username: string
    name: string
    avatarSourceUrl?: string
  }
  totalLikes: number
  createdAt: Date
}
