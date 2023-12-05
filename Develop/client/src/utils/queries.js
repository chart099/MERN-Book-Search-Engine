import { gql } from '@apollo/client';

export default GET_ME = gql `
    query me {
        me {
            _id
            name
            bookCount
            savedBooks
        }
    }
`;
