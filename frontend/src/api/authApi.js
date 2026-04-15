// Static user data for demonstration
const staticUsers = [
      {
            id: 1,
            email: 'admin@example.com',
            password: 'admin',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin'
      },
      {
            id: 2,
            email: 'user@example.com',
            password: 'user',
            firstName: 'Regular',
            lastName: 'User',
            role: 'user'
      }
]

// Mock login function
export const login = async (email, password) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const user = staticUsers.find(u => u.email === email && u.password === password)
      if (user) {
            const { password, ...userWithoutPassword } = user
            return {
                  user: userWithoutPassword,
                  token: 'mock-jwt-token-' + user.id
            }
      } else {
            throw new Error('Invalid email or password')
      }
}

// Mock register function
export const register = async (firstName, lastName, email, password) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Check if user already exists
      const existingUser = staticUsers.find(u => u.email === email)
      if (existingUser) {
            throw new Error('User already exists')
      }

      // Create new user
      const newUser = {
            id: staticUsers.length + 1,
            email,
            password,
            firstName,
            lastName,
            role: 'user' // Default role
      }

      staticUsers.push(newUser)

      const { password: _, ...userWithoutPassword } = newUser
      return {
            user: userWithoutPassword,
            token: 'mock-jwt-token-' + newUser.id
      }
}