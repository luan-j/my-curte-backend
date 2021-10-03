import { GraphQLDateTime } from 'graphql-iso-date'
import { GraphQLUpload } from 'graphql-upload'

export const baseResolver = {
  DateTime: GraphQLDateTime,
  Upload: GraphQLUpload,
}
