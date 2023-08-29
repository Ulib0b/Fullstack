const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')

const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')



const resolvers = {
  Query: {
    bookCount: () => { return Book.collection.countDocuments() },
    authorCount:  () => { return Author.collection.countDocuments() },
    allBooks: async (root, args) => {
      if(args.author && args.genre){
        let author = await Author.find({name: args.author})
        author = author[0]._id
        return await Book.find({author: author, genres: args.genre}).populate('author')
      }else if(args.author){
        let author = await Author.find({name: args.author})
        author = author[0]._id
        return await Book.find({author: author}).populate('author')
      }else if(args.genre){
        return await Book.find({genres: args.genre}).populate('author')
      }else
      return await Book.find({}).populate('author')
      
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      if((await Author.find({name: args.author})).length === 0){
        const author = new Author({name: args.author})
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        }
        
      }
      let author = await Author.find({name: args.author})
      author = author[0]

      

      let book = new Book({...args, author: author._id})
      try {
        await book.save()
        
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }

      

      const bookCount = (await Book.find({author: author._id})).length

      await Author.findOneAndUpdate({name: args.author}, {bookCount: bookCount})

      book = await book.populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      await Author.findOneAndUpdate({name: args.name}, {born: args.setBornTo})
      return await Author.findOne({name: args.name})
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'dwa' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  }
  
}

module.exports = resolvers