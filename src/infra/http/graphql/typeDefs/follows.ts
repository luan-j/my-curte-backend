import { gql } from 'apollo-server-core'

export const followsTypeDef = gql`
  extend type Query {
    getUsersToFollow(page: Int, perPage: Int): [UserResponse!]! @auth
  }

  extend type Mutation {
    createUserFollow(toFollowUserId: String!): FollowResponse @auth
  }

  type FollowResponse {
    userId: String!
    followingId: String!
  }

  type UserResponse {
    id: String!
    name: String!
    username: String!
    email: String!
    bio: String
    avatarSourceUrl: String
    coverSourceUrl: String
    createdAt: DateTime!
  }
`
