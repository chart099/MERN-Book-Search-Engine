const {User, Book} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError("User not authenticated");
          }
    },

    Mutation: {
        createUser: async (parent, {username, email, password})=> {
            const user = await User.create(username,);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password})=> {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError("Email or password incorrect");
              }
              const correctPassword = await user.isCorrectPassword(password);
        
              if (!correctPassword) {
                throw AuthenticationError("Email or password incorrect");
              }
              const token = signToken(user);
        
              return { token, user };
        },

        saveBook: async(parent, {bookId}, context)=> {
            if (context.book){
            return await User.findOneAndUpdate(
                { _id: context.user._id, "book.bookId": bookId},
                 { $addToSet: { "book.savedBooks": {bookId} } },
                 {new: true}
             )
            }
        },

        deleteBook: async(parent, {bookId}, context)=> {
            if (context.user) {
                return await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: {_id: bookId} } },
                    { new: true }
                )
            }
        }

    }  
}


module.exports = resolvers;