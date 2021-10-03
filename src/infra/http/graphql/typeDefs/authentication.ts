import { gql } from 'apollo-server-core'

export const authenticationTypeDef = gql`
  extend type Query {
    signIn(email: String!, password: String!): Token!
  }

  extend type Mutation {
    signUp(
      username: String!
      name: String!
      email: String!
      password: String!
      password_confirmation: String!
    ): Token!
  }

  type Token {
    accessToken: String!
  }
`
