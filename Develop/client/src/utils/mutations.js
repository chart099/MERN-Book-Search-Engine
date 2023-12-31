import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        password
      }
    }
  }`;

export const ADD_USER = gql `
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  `

  export const SAVE_BOOK = gql `
    mutation saveBook($bookId: String! ){
      saveBook(bookId: $bookId){
        user {
          savedBooks
          bookCount
        }
      }
    }
  `

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!){
    deleteBook(bookId: $bookId){
      user {
        savedBooks
        bookCount
      }
    }
  }
  `