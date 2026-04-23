import React from 'react'

function Avatar({ user, size = 'md' }) {
      const sizeClasses = {
            sm: { width: '32px', height: '32px', fontSize: '12px' },
            md: { width: '48px', height: '48px', fontSize: '16px' },
            lg: { width: '80px', height: '80px', fontSize: '24px' },
      }

      const style = sizeClasses[size] || sizeClasses.md

      // Get initials from first and last name
      const getInitials = () => {
            if (!user) return '??'
            const first = user.first_name ? user.first_name.charAt(0).toUpperCase() : ''
            const last = user.last_name ? user.last_name.charAt(0).toUpperCase() : ''
            return (first + last) || 'U'
      }

      // Generate a consistent color based on initials
      const getBackgroundColor = () => {
            const colors = [
                  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
                  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#A8E6CF',
            ]
            const initials = getInitials()
            const charCode = initials.charCodeAt(0) + initials.charCodeAt(1)
            return colors[charCode % colors.length]
      }

      if (user?.avatar) {
            return (
                  <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="rounded-circle"
                        style={{
                              ...style,
                              objectFit: 'cover',
                              border: '2px solid #ddd',
                        }}
                  />
            )
      }

      return (
            <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                        ...style,
                        backgroundColor: getBackgroundColor(),
                        color: 'white',
                        fontWeight: 'bold',
                        border: '2px solid #ddd',
                  }}
            >
                  {getInitials()}
            </div>
      )
}

export default Avatar
