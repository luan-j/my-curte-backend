import { gql } from 'apollo-server-core'

export const baseTypeDef = gql`
  scalar DateTime
  scalar Upload

  directive @auth on FIELD_DEFINITION

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
