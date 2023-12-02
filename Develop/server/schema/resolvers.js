const {User, Book} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        singleUser: async (parent, { username })=> {
            // only create params if an id exists
            const params = username ? { username } : {};
            return User.findOne(params)
        }
    },

    Mutation: {
        createUser: async (parent, args)=> {
            const user = await User.create(args);
            return user;
        },
        login: async (parent, {username, password})=> {
            const user = await User.findOne({ username });
            if (!user) {
                throw AuthenticationError;
              }
              const correctPassword = await user.isCorrectPassword(password);
        
              if (!correctPassword) {
                throw AuthenticationError;
              }
              const token = signToken(user);
        
              return { token, user };
        },

        saveBook: async(parent, {bookId}, context)=> {
            await User.findOneAndUpdate(
                { _id: context.user._id },
                 { $addToSet: { savedBooks: bookId } } )
        },

        deleteBook: async(parent, {bookId}, context)=> {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    {_id: bookId},
                    {
                        $pull: {savedBooks: bookId.bookId}
                    }
                )
            }
        }

    }

       
    
}


// createUser( username: String! email: String! password: String!): Auth
// login(username: String! password: String!): Auth
// saveBook(title: String!): Book
// deleteBook(bookId: ID!): Book