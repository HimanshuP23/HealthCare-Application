import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Modal, Button, Table, Form } from "react-bootstrap";
import "../../css/styles.css"

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation
  const [showSuccess, setShowSuccess] = useState(false); // State for success popup
  const [roles, setRoles] = useState(["PATIENT", "ADMIN", "DOCTOR"]);
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "PATIENT",
    password: "",
    userId: "",
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch users by role or all
  const fetchUsers = async (role = "ALL") => {
    try {
      const endpoint =
        role === "ALL"
          ? "http://localhost:8080/admin/getallusers"
          : `http://localhost:8080/admin/getusersbyrole?role=${role}`;
      const response = await axios.get(endpoint, { headers });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role filter change
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    fetchUsers(role);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Open modal for adding or editing a user
  const openModal = (user = null) => {
    setSelectedUser(user);
    if (user) {
      setFormValues({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        userId: user.userId,
        password: user.password || "",
      });
    } else {
      setFormValues({
        name: "",
        email: "",
        phoneNumber: "",
        role: "PATIENT",
        password: "",
        userId: "",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Save user (add or update)
  const saveUser = async () => {
    try {
      if (selectedUser) {
        await axios.put(
          `http://localhost:8080/admin/user/${selectedUser.userId}`,
          formValues,
          { headers }
        );
        setShowSuccess(true);
      } else {
        await axios.post("http://localhost:8080/admin/adduser", formValues, {
          headers,
        });
        setShowSuccess(true);
      }
      fetchUsers(selectedRole);
      closeModal();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Show delete confirmation modal
  const confirmDelete = (userId) => {
    setSelectedUser(userId);
    setShowDeleteConfirm(true);
  };

  // Delete user
  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/admin/user/${selectedUser}`, {
        headers,
      });
      fetchUsers(selectedRole);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar and Navbar */}
      <Sidebar />
      <div className="content-container" style={{ flex: 1 }}>
        <Navbar />
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="heading" style={{color: "rgb(26, 101, 63)"}}>Admin Panel - Manage Users</h2>
            <Button variant="primary" onClick={() => openModal()}>
              Add User
            </Button>
          </div>
          <div className="mb-4">
            <Form.Select
              value={selectedRole}
              onChange={handleRoleChange}
              aria-label="Filter by role"
            >
              <option value="ALL">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Form.Select>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => openModal(user)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDelete(user.userId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Success Modal */}
          <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
            <Modal.Header closeButton style={{ backgroundColor: "#AEEA94" }}>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser ? "User Updated Successfully!" : "User Added Successfully!"}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowSuccess(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
            <Modal.Header closeButton style={{ backgroundColor: "#D84040" }}>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={deleteUser}>
                Yes, Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal for Add/Edit User */}
          <Modal show={isModalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Read-only userId field */}
                {selectedUser && (
                  <Form.Group className="mb-3">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="userId"
                      value={formValues.userId}
                      readOnly
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <div className="role-select-wrapper">
                    <Form.Select
                      name="role"
                      value={formValues.role}
                      onChange={handleChange}
                      required
                      className="custom-select"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    required={!selectedUser} // Password is required only when adding a user
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={saveUser}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
