import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Modal, Button, Table, Form } from "react-bootstrap";
import "../../css/styles.css"

const AdminDoctorPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation
  const [showSuccess, setShowSuccess] = useState(false); // State for success popup
  const [showSuccessUpdated, setShowSuccessUpdated] = useState(false); // State for update success popup
  const [searchQuery, setSearchQuery] = useState("");  // To store search input
  const [filterType, setFilterType] = useState("");  // To store selected filter type

  const [formValues, setFormValues] = useState({
    doctorId: "",
    specialization: "",
    qualification: "",
    experienceYears: "",
    clinicAddress: "",
    consultationFee: "",
    availableDays: "",
    availableTimeStart: "",
    availableTimeEnd: "",
    userId: "",
  });

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      let url = "http://localhost:8080/admin/doctor/getalldoctors";
      
      if (searchQuery) {
        switch (filterType) {
          case "specialization":
            url = `http://localhost:8080/admin/doctor/getdoctorsbyspecialization?specialization=${searchQuery}`;
            break;
          case "qualification":
            url = `http://localhost:8080/admin/doctor/getdoctorsbyqualification?qualification=${searchQuery}`;
            break;
          case "experienceYears":
            url = `http://localhost:8080/admin/doctor/getdoctorsbyexperience?experienceYears=${searchQuery}`;
            break;
          case "clinicAddress":
            url = `http://localhost:8080/admin/doctor/getdoctorsbyaddress?clinicAddress=${searchQuery}`;
            break;
          case "availableDays":
            url = `http://localhost:8080/admin/doctor/getdoctorsbydays?availableDays=${searchQuery}`;
            break;
          default:
            break;
        }
      }
      
      const response = await axios.get(url, { headers });
    //   console.log(response)
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [searchQuery, filterType]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Open modal for adding or editing a doctor
  const openModal = (doctor = null) => {
    setSelectedDoctor(doctor);
    if (doctor) {
      setFormValues({
        doctorId: doctor.doctorId,
        specialization: doctor.specialization,
        qualification: doctor.qualification,
        experienceYears: doctor.experienceYears,
        clinicAddress: doctor.clinicAddress,
        consultationFee: doctor.consultationFee,
        availableDays: doctor.availableDays,
        availableTimeStart: doctor.availableTimeStart,
        availableTimeEnd: doctor.availableTimeEnd,
        userId: doctor.user.userId,
      });
    } else {
      setFormValues({
        doctorId: "",
        specialization: "",
        qualification: "",
        experienceYears: "",
        clinicAddress: "",
        consultationFee: "",
        availableDays: "",
        availableTimeStart: "",
        availableTimeEnd: "",
        userId: "",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showSuccessUpdatedPopup = () => {
    setShowSuccessUpdated(true);
    setTimeout(() => {
      setShowSuccessUpdated(false);
    }, 3000); // Hide after 5 seconds
  };

  const showSuccessPopup = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000); // Hide after 5 seconds
  };
  

  // Save doctor (add or update)
  const saveDoctor = async () => {
    try {
      if (selectedDoctor) {
        await axios.put(
          `http://localhost:8080/admin/doctor/updatedoctor/${selectedDoctor.doctorId}`,
          formValues,
          { headers }
        );
        showSuccessUpdatedPopup();
      } else {
        await axios.post(
          `http://localhost:8080/admin/doctor/createdoctor/${formValues.userId}`,
          formValues,
          { headers }
        );
        showSuccessPopup();
      }
      fetchDoctors();
      closeModal();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  // Show delete confirmation modal
  const confirmDelete = (doctorId) => {
    setSelectedDoctor(doctorId);
    setShowDeleteConfirm(true);
  };

  // Delete doctor
  const deleteDoctor = async () => {
    try {
      await axios.delete(`http://localhost:8080/admin/doctor/deletedoctor/${selectedDoctor}`, {
        headers,
      });
      fetchDoctors();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting doctor:", error);
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
            <h2 className="heading" style={{color: "rgb(26, 101, 63)"}}>Admin Panel - Manage Doctors</h2>
            <Button variant="primary" onClick={() => openModal()}>
              Add Doctor
            </Button>
          </div>
          {/* Success Popup */}
          {showSuccess && (
            <div className="alert alert-success mt-4">
              <strong>Success!</strong> New Doctor successfully added.
            </div>
          )}

          {/* Successful Update Popup */}
          {showSuccessUpdated && (
            <div className="alert alert-info mt-4">
              <strong>Success!</strong> Doctor details successfully updated.
            </div>
          )}
          <div className="d-flex">
            <select
              className="form-select me-2 mb-2"
              style={{ width: "20%" }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="" disabled selected>Search Doctor by </option>  
              <option value="specialization">Specialization</option>
              <option value="qualification">Qualification</option>
              <option value="experienceYears">Experience (Years)</option>
              <option value="clinicAddress">Clinic Address</option>
              <option value="availableDays">Available Days</option>
            </select>
            <input
              type="text"
              className="form-control mb-2"
              style={{ width: "80%" }}
              placeholder="Type details here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th>Experience (Years)</th>
                <th>Clinic Address</th>
                <th>Consultation Fee</th>
                <th>Available Days</th>
                <th>Available Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.doctorId}> 
                  <td>{doctor.doctorId}</td>  
                  <td>{doctor.specialization}</td>
                  <td>{doctor.qualification}</td>
                  <td>{doctor.experienceYears}</td>
                  <td>{doctor.clinicAddress}</td>
                  <td>{doctor.consultationFee}</td>
                  <td>{doctor.availableDays}</td>
                  <td>
                    {doctor.availableTimeStart} - {doctor.availableTimeEnd}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => openModal(doctor)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDelete(doctor.doctorId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for adding/editing doctor */}
          <Modal show={isModalOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedDoctor ? "Edit Doctor" : "Add Doctor"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="userId">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="userId"
                    value={formValues.userId}
                    onChange={handleChange}
                    placeholder="Enter userId"
                    readOnly={!!selectedDoctor} // Make read-only if editing a doctor
                  />
                </Form.Group>

                {selectedDoctor && (
                  <Form.Group controlId="doctorId">
                    <Form.Label>Doctor ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="doctorId"
                      value={formValues.doctorId}
                      readOnly
                    />
                  </Form.Group>
                )}

                <Form.Group controlId="specialization">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    value={formValues.specialization}
                    onChange={handleChange}
                    placeholder="Enter specialization"
                  />
                </Form.Group>

                <Form.Group controlId="qualification">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    type="text"
                    name="qualification"
                    value={formValues.qualification}
                    onChange={handleChange}
                    placeholder="Enter qualification"
                  />
                </Form.Group>

                <Form.Group controlId="experienceYears">
                  <Form.Label>Experience (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    name="experienceYears"
                    value={formValues.experienceYears}
                    onChange={handleChange}
                    placeholder="Enter years of experience"
                  />
                </Form.Group>

                <Form.Group controlId="clinicAddress">
                  <Form.Label>Clinic Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="clinicAddress"
                    value={formValues.clinicAddress}
                    onChange={handleChange}
                    placeholder="Enter clinic address"
                  />
                </Form.Group>

                <Form.Group controlId="consultationFee">
                  <Form.Label>Consultation Fee</Form.Label>
                  <Form.Control
                    type="number"
                    name="consultationFee"
                    value={formValues.consultationFee}
                    onChange={handleChange}
                    placeholder="Enter consultation fee"
                  />
                </Form.Group>

                <Form.Group controlId="availableDays">
                  <Form.Label>Available Days</Form.Label>
                  <Form.Control
                    type="text"
                    name="availableDays"
                    value={formValues.availableDays}
                    onChange={handleChange}
                    placeholder="Enter available days"
                  />
                </Form.Group>

                <Form.Group controlId="availableTimeStart">
                  <Form.Label>Available Time Start</Form.Label>
                  <Form.Control
                    type="time"
                    name="availableTimeStart"
                    value={formValues.availableTimeStart}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="availableTimeEnd">
                  <Form.Label>Available Time End</Form.Label>
                  <Form.Control
                    type="time"
                    name="availableTimeEnd"
                    value={formValues.availableTimeEnd}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={saveDoctor}>
                Save Doctor
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            show={showDeleteConfirm}
            onHide={() => setShowDeleteConfirm(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this doctor?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={deleteDoctor}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorPanel;
  