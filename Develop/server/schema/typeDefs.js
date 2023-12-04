const typeDefs = `{
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
        
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users(username: String!): User
    }

    type Mutation {
        createUser( username: String! email: String! password: String!): Auth
        login(username: String! password: String!): Auth
        saveBook(title: String!): Book
        deleteBook(bookId: ID!): Book
    }
}`

module.exports = typeDefs;