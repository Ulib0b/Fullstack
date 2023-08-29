import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]!){
    addBook (
      title: $title,
      author: $author,
      published: $publishedInt,
      genres: $genres
    ){
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount 
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($selectedName: String!, $yearInt: Int!){
    editAuthor (
      name: $selectedName,
      setBornTo: $yearInt
    ){
      name,
      born
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`