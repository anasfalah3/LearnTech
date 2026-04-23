import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getUsersApi } from '../../api/usersApi'
import Avatar from '../../components/common/Avatar'

function ManageUsers() {
      const { token, showToast } = useAuth()
      const [users, setUsers] = useState([])
      const [loading, setLoading] = useState(false)
      const [showForm, setShowForm] = useState(false)
      const [editingId, setEditingId] = useState(null)
      const [formData, setFormData] = useState({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role: 'user',
            avatar: '',
      })

      // Fetch users
      useEffect(() => {
            fetchUsers()
      }, [])

      const fetchUsers = async () => {
            setLoading(true)
            try {
                  const data = await getUsersApi.getAll(token)
                  setUsers(data)
            } catch (error) {
                  showToast('Failed to load users', 'error')
                  console.error(error)
            } finally {
                  setLoading(false)
            }
      }

      const handleInputChange = (e) => {
            const { name, value } = e.target
            setFormData(prev => ({
                  ...prev,
                  [name]: value,
            }))
      }

      const resetForm = () => {
            setFormData({
                  first_name: '',
                  last_name: '',
                  email: '',
                  password: '',
                  role: 'user',
                  avatar: '',
            })
            setEditingId(null)
            setShowForm(false)
      }

      const handleSubmit = async (e) => {
            e.preventDefault()
            setLoading(true)

            try {
                  if (editingId) {
                        await getUsersApi.update(editingId, formData, token)
                        showToast('User updated successfully')
                  } else {
                        await getUsersApi.create(formData, token)
                        showToast('User created successfully')
                  }
                  resetForm()
                  fetchUsers()
            } catch (error) {
                  const errorMsg = error.message || 'Failed to save user'
                  showToast(errorMsg, 'error')
                  console.error(error)
            } finally {
                  setLoading(false)
            }
      }

      const handleEdit = (user) => {
            setFormData({
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  password: '',
                  role: user.role,
                  avatar: user.avatar || '',
            })
            setEditingId(user.id)
            setShowForm(true)
      }

      const handleDelete = async (id) => {
            if (!window.confirm('Are you sure you want to delete this user?')) return

            setLoading(true)
            try {
                  await getUsersApi.delete(id, token)
                  showToast('User deleted successfully')
                  fetchUsers()
            } catch (error) {
                  showToast('Failed to delete user', 'error')
                  console.error(error)
            } finally {
                  setLoading(false)
            }
      }

      return (
            <div className="container-fluid py-4">
                  <div className="text-center mb-5">
                        <h6 className="section-title bg-white text-center text-primary px-3 d-inline-block">Manage Users</h6>
                        <h1 className="mb-3">User Management</h1>
                  </div>

                  {/* Add/Edit Form */}
                  {showForm && (
                        <div className="row mb-4">
                              <div className="col-12">
                                    <div className="card">
                                          <div className="card-header bg-primary text-white">
                                                <h5 className="mb-0">{editingId ? 'Edit User' : 'Add New User'}</h5>
                                          </div>
                                          <div className="card-body">
                                                <form onSubmit={handleSubmit}>
                                                      <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                  <label className="form-label">First Name *</label>
                                                                  <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="first_name"
                                                                        value={formData.first_name}
                                                                        onChange={handleInputChange}
                                                                        required
                                                                  />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                  <label className="form-label">Last Name *</label>
                                                                  <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="last_name"
                                                                        value={formData.last_name}
                                                                        onChange={handleInputChange}
                                                                        required
                                                                  />
                                                            </div>
                                                      </div>

                                                      <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                  <label className="form-label">Email *</label>
                                                                  <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        name="email"
                                                                        value={formData.email}
                                                                        onChange={handleInputChange}
                                                                        required
                                                                        disabled={!!editingId}
                                                                  />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                  <label className="form-label">Role *</label>
                                                                  <select
                                                                        className="form-control"
                                                                        name="role"
                                                                        value={formData.role}
                                                                        onChange={handleInputChange}
                                                                        required
                                                                  >
                                                                        <option value="user">User</option>
                                                                        <option value="admin">Admin</option>
                                                                  </select>
                                                            </div>
                                                      </div>

                                                      <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                  <label className="form-label">Password {!editingId && '*'}</label>
                                                                  <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        name="password"
                                                                        value={formData.password}
                                                                        onChange={handleInputChange}
                                                                        required={!editingId}
                                                                        placeholder={editingId ? 'Leave empty to keep current password' : 'Enter password'}
                                                                  />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                  <label className="form-label">Avatar URL</label>
                                                                  <input
                                                                        type="url"
                                                                        className="form-control"
                                                                        name="avatar"
                                                                        value={formData.avatar}
                                                                        onChange={handleInputChange}
                                                                        placeholder="https://example.com/avatar.jpg"
                                                                  />
                                                            </div>
                                                      </div>

                                                      <div className="d-flex gap-2">
                                                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                                                  {loading ? 'Saving...' : 'Save User'}
                                                            </button>
                                                            <button type="button" className="btn btn-secondary" onClick={resetForm} disabled={loading}>
                                                                  Cancel
                                                            </button>
                                                      </div>
                                                </form>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}

                  {/* Users List */}
                  <div className="row">
                        <div className="col-12">
                              <div className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                          <h5 className="mb-0">Users List ({users.length})</h5>
                                          <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                      if (showForm) resetForm()
                                                      else setShowForm(true)
                                                }}
                                          >
                                                {showForm ? 'Hide Form' : '+ Add User'}
                                          </button>
                                    </div>
                                    <div className="table-responsive">
                                          <table className="table table-hover mb-0">
                                                <thead className="table-light">
                                                      <tr>
                                                            <th>Avatar</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Role</th>
                                                            <th>Actions</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {loading && users.length === 0 ? (
                                                            <tr>
                                                                  <td colSpan="5" className="text-center py-4">
                                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                        Loading users...
                                                                  </td>
                                                            </tr>
                                                      ) : users.length === 0 ? (
                                                            <tr>
                                                                  <td colSpan="5" className="text-center py-4 text-muted">
                                                                        No users found
                                                                  </td>
                                                            </tr>
                                                      ) : (
                                                            users.map(user => (
                                                                  <tr key={user.id}>
                                                                        <td>
                                                                              <Avatar user={user} size="sm" />
                                                                        </td>
                                                                        <td>
                                                                              <strong>{user.first_name} {user.last_name}</strong>
                                                                        </td>
                                                                        <td>{user.email}</td>
                                                                        <td>
                                                                              <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'info'}`}>
                                                                                    {user.role}
                                                                              </span>
                                                                        </td>
                                                                        <td>
                                                                              <button
                                                                                    className="btn btn-sm btn-warning me-2"
                                                                                    onClick={() => handleEdit(user)}
                                                                              >
                                                                                    <i className="fa fa-edit"></i>
                                                                              </button>
                                                                              <button
                                                                                    className="btn btn-sm btn-danger"
                                                                                    onClick={() => handleDelete(user.id)}
                                                                              >
                                                                                    <i className="fa fa-trash"></i>
                                                                              </button>
                                                                        </td>
                                                                  </tr>
                                                            ))
                                                      )}
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default ManageUsers