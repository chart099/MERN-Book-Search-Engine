import { gql } from '@apollo/client';

export const GET_ME = gql `
    query get_me {
        user {
            _id
            name
            bookCount
            savedBooks
        }
    }
`;
