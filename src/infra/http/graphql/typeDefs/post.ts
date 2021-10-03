import { gql } from 'apollo-server-core'

export const postTypeDef = gql`
  extend type Query {
    getPostsFeed(page: Int, perPage: Int): [PostWithDetails!]! @auth
  }

  extend type Mutation {
    createPost(
      content: String!
      replyForPostId: String
      repostForPostId: String
      media: [Upload!]
    ): PostWithDetails @auth
  }

  type PostWithDetails {
    id: String!
    content: String!
    imageSourceUrl: String
    replyForPostId: String
    repostForPostId: String
    author: Author!
    totalLikes: Int!
    createdAt: DateTime!
  }

  type Author {
    id: String!
    username: String!
    name: String!
    avatarSourceUrl: String
  }
`
