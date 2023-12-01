const typeDefs = `{
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bookCount: Number
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: String
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
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