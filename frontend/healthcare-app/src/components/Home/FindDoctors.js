import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/FindDoctors.css";
import Header from "./Header";
import Footer from "./Footer";

const FindDoctors = () => {
  // Store all fetched doctors and the currently displayed (filtered) doctors.
  const [allDoctors, setAllDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Add state to track which doctor's phone number is visible
  const [showPhoneNumberFor, setShowPhoneNumberFor] = useState(null);
  
  // State for search query and selected filter.
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const navigate = useNavigate();

  // Fetch all doctors on component mount.
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Get the JWT token from localStorage.
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/doctors/getalldoctors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Transform the data to include a doctor name from the associated user.
        const transformedDoctors = response.data.map((doctor) => ({
          ...doctor,
          doctorname: doctor.user?.name,
        }));

        setAllDoctors(transformedDoctors);
        setDoctors(transformedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors whenever searchQuery or filterType (or the fetched list) changes.
  useEffect(() => {
    if (!searchQuery) {
      setDoctors(allDoctors);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allDoctors.filter((doctor) => {
        // Use the selected filter field; if none is selected, default to doctor name.
        if (filterType === "specialization") {
          return doctor.specialization?.toLowerCase().includes(lowerCaseQuery);
        } else if (filterType === "qualification") {
          return doctor.qualification?.toLowerCase().includes(lowerCaseQuery);
        } else if (filterType === "experienceYears") {
          return doctor.experienceYears?.toString().includes(lowerCaseQuery);
        } else if (filterType === "clinicAddress") {
          return doctor.clinicAddress?.toLowerCase().includes(lowerCaseQuery);
        } else if (filterType === "availableDays") {
          return doctor.availableDays?.toLowerCase().includes(lowerCaseQuery);
        } else {
          // If no specific filter is selected, search by doctor name.
          return doctor.doctorname?.toLowerCase().includes(lowerCaseQuery);
        }
      });
      setDoctors(filtered);
    }
  }, [searchQuery, filterType, allDoctors]);

  const handleBookAppointment = (doctor) => {
    // Pass the doctor details as state when navigating
    navigate("/book-appointment", { 
      state: { 
        doctorId: String(doctor.doctorId), 
        doctorName: doctor.doctorname, 
        specialization: doctor.specialization,
        consultationFee: doctor.consultationFee
      } 
    });
  };

  // Toggle phone number visibility
  const handleContactClick = (doctorId) => {
    setShowPhoneNumberFor(prev => prev === doctorId ? null : doctorId);
  };

  return (
    <div>
      <Header />
      {/* Full-page background */}
      <div className="full-page-bg"></div>

      <div className="container mt-4">
        <h2 className="mb-4 component-title">Find Doctors</h2>

        {/* Search & Filter Section */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-3">
            <select
              className="form-select modern-filter-dropdown"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Filter By (default: Doctor Name)</option>
              <option value="specialization">Specialization</option>
              <option value="qualification">Qualification</option>
              <option value="experienceYears">Experience (Years)</option>
              <option value="clinicAddress">Clinic Address</option>
              <option value="availableDays">Available Days</option>
            </select>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className="form-control modern-search-input"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Doctor Cards */}
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Card
              key={doctor.doctorId}
              className="mb-4 p-3 shadow-sm doctor-card modern-card"
            >
              <Row className="align-items-center">
                {/* Doctor Image */}
                <Col xs={3} md={2} className="ps-5">
                  <img
                    src={doctor.imageUrl || "https://via.placeholder.com/250"}
                    alt={doctor.doctorname}
                    className="rounded-circle doctor-img"
                    style={{
                      width: "250px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </Col>

                {/* Doctor Details */}
                <Col xs={9} md={7}>
                  <h5 className="doctor-name mb-3">Dr. {doctor.doctorname}</h5>
                  <p className="mb-1">
                    <strong>Specialization:</strong> {doctor.specialization}
                  </p>
                  <p className="mb-1">
                    <strong>Experience:</strong> {doctor.experienceYears} years overall
                  </p>
                  <p className="mb-1">
                    <strong>Clinic Address:</strong> {doctor.clinicAddress}
                  </p>
                  <p className="mb-1">
                    <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
                  </p>
                  <p className="mb-1">
                    <strong>Patient Stories:</strong> {doctor.patientStories || "50"}
                  </p>
                  <p className="mb-1">
                    <strong>Rating:</strong> <span className="badge bg-success">✅ {doctor.rating || "90%"}</span>
                  </p>
                </Col>

                {/* Booking & Contact */}
                <Col xs={12} md={3} className="text-md-end text-center">
                  <p className="text-success">📅 Available Today</p>
                  <Button
                    variant="primary"
                    className="mb-2 w-100"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    Book Appointment <br />
                  </Button>
                  {showPhoneNumberFor === doctor.doctorId ? (
                    <div className="phone-number-display">
                      <div className="phone-number mb-2">
                        <strong>📞 {doctor.user?.phoneNumber}</strong>
                      </div>
                      <small className="terms-text">
                        You can contact doctor at this number
                      </small>
                      {!doctor.user?.phoneNumber && (
                        <small className="text-danger">
                          Phone number not available
                        </small>
                      )}
                      <Button
                        variant="outline-danger"
                        className="w-100 mt-2"
                        onClick={() => handleContactClick(doctor.doctorId)}
                      >
                        Hide Number
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={() => handleContactClick(doctor.doctorId)}
                      disabled={!doctor.user?.phoneNumber}
                    >
                      📞 Contact Clinic
                    </Button>
                  )}
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <p>No doctors available at the moment.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FindDoctors;
