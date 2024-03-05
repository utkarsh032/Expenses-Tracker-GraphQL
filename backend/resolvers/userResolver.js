import bcrypt from 'bcryptjs'
import user from '../models/userModal.js'

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required")
        }
        const existingUser = await user.findOne({ username })
        if (existingUser) {
          throw new Error("User already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const profilePicture = gender === "female" ?
          `https://avatar.iran.liara.run/public/girl?username=${username}` :
          `https://avatar.iran.liara.run/public/boy?username=${username}`
        const newUser = new user({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture
        })

        await newUser.save()
        await context.login(newUser)
        return newUser
      } catch (err) {
        console.log("Error in signup:", err)
        throw new Error(err.message || "Internal server Error")
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input
        const { user } = await context.authenticate("graphql", { username, password })

        await context.login(user)
        return user
      } catch (err) {
        console.log("Error in login:", err)
        throw new Error(err.message || "Internal server Error")
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout()
        req.session.destroy((err) => {
          if (err) throw err
        })
        res.clearCookies("connect.sid")
        return { message: "Logged out successfully" }

      } catch (err) {
        console.log("Error in logout:", err)
        throw new Error(err.message || "Internal server Error")
      }
    }
  },

  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = context.getUser()
        return user
      } catch (err) {
        console.log("Error in authUser:", err)
        throw new Error(err.message || "Internal server Error")
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await user.findById(userId)
        return user
      } catch (err) {
        console.log("Error in user query:", err)
        throw new Error(err.message || "Internal server Error")
      }
    }
  }
};

export default userResolver;
