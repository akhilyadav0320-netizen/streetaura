import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup, Nav, Modal, Offcanvas, Navbar } from 'react-bootstrap';
import { FaUsers, FaBox, FaShoppingBag, FaSearch, FaTrash, FaEdit, FaPlus, FaChartBar, FaBars } from 'react-icons/fa';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });

  const [users, setUsers] = useState([
    { id: "USR001", name: "Akhil", email: "akhil.admin@gmail.com", role: "Super Admin", status: "Active" },
    { id: "USR002", name: "Manikanta", email: "manikanta.editor@gmail.com", role: "Editor", status: "Active" },
    { id: "USR003", name: "Pavan", email: "pavan.user@gmail.com", role: "User", status: "Suspended" },
    { id: "USR004", name: "Nagendra", email: "nagendra.user@gmail.com", role: "User", status: "Active" },
  ]);

  const handleCloseMenu = () => setShowMobileMenu(false);
  const handleShowMenu = () => setShowMobileMenu(true);

  const handleAddUser = (e) => {
    e.preventDefault();
    const id = `USR00${users.length + 1}`;
    setUsers([...users, { id, ...newUser }]);
    setShowModal(false);
  };

  const SidebarLinks = () => (
    <Nav className="flex-column px-2 mt-3">
      <Nav.Link onClick={() => {setActiveTab("dashboard"); handleCloseMenu();}} className={`mb-2 rounded p-3 ${activeTab === "dashboard" ? "bg-danger text-white shadow" : "text-dark"}`}>
        <FaChartBar className="me-2" /> Dashboard
      </Nav.Link>
      <Nav.Link onClick={() => {setActiveTab("users"); handleCloseMenu();}} className={`mb-2 rounded p-3 ${activeTab === "users" ? "bg-danger text-white shadow" : "text-dark"}`}>
        <FaUsers className="me-2" /> Users
      </Nav.Link>
      <Nav.Link onClick={() => {setActiveTab("products"); handleCloseMenu();}} className={`mb-2 rounded p-3 ${activeTab === "products" ? "bg-danger text-white shadow" : "text-dark"}`}>
        <FaBox className="me-2" /> Products
      </Nav.Link>
    </Nav>
  );

  return (
    <div className="bg-light min-vh-100">
      {/* --- MOBILE NAVBAR --- */}
      <Navbar bg="white" className="d-md-none border-bottom px-3 sticky-top">
        <Button variant="light" onClick={handleShowMenu} className="me-2">
          <FaBars />
        </Button>
        <Navbar.Brand className="fw-bold d-flex align-items-center" style={{color: '#c60935', gap: '10px'}}>
          <img src="Image/BrandLogo1.png" alt="Logo" width="30" height="30" className="rounded" />
          STREET AURA
        </Navbar.Brand>
      </Navbar>

      <Offcanvas show={showMobileMenu} onHide={handleCloseMenu} className="w-75">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold d-flex align-items-center" style={{ color: '#c60935', gap: '10px' }}>
            <img src="Image/BrandLogo1.png" alt="Logo" width="35" height="35" className="rounded" />
            STREET AURA
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <SidebarLinks />
        </Offcanvas.Body>
      </Offcanvas>

      <Container fluid>
        <Row>
          {/* --- DESKTOP SIDEBAR --- */}
          <Col md={2} className="bg-white shadow-sm vh-100 d-none d-md-block pt-4 position-fixed">
            <div className="d-flex align-items-center justify-content-center mb-4 gap-2">
              <img src="Image/BrandLogo1.png" alt="Logo" width="30" height="30" className="rounded" />
              <h5 className="mb-0 fw-bold" style={{color: '#c60935'}}>STREET AURA</h5>
            </div>
            <SidebarLinks />
          </Col>

          {/* --- MAIN CONTENT AREA --- */}
          <Col md={{ span: 10, offset: 2 }} className="p-3 p-md-4">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
              <h3 className="fw-bold mb-0 text-capitalize">{activeTab}</h3>
              <Button variant="danger" className="shadow-sm w-auto" style={{backgroundColor: '#c60935'}} onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" /> New {activeTab === "users" ? "User" : "Item"}
              </Button>
            </div>

            <Row className="g-3 mb-4">
              <Col xs={12} sm={6} lg={4}>
                <Card className="border-0 shadow-sm p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-primary"><FaUsers /></div>
                    <div><small className="text-muted">Total Users</small><h4 className="fw-bold mb-0">{users.length}</h4></div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white py-3 border-0">
                <InputGroup className="ms-auto" style={{ maxWidth: '400px' }}>
                  <InputGroup.Text className="bg-white border-end-0"><FaSearch className="text-muted" /></InputGroup.Text>
                  <Form.Control className="border-start-0" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
                </InputGroup>
              </Card.Header>
              <Card.Body className="p-0">
                <Table hover responsive className="mb-0 align-middle">
                  <thead className="bg-light small text-uppercase">
                    <tr><th className="ps-4">ID</th><th>Name</th><th className="d-none d-lg-table-cell">Email</th><th>Status</th><th className="text-end pe-4">Actions</th></tr>
                  </thead>
                  <tbody>
                    {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                      <tr key={user.id}>
                        <td className="ps-4 text-muted small">{user.id}</td>
                        <td>
                          <div className="fw-bold">{user.name}</div>
                          <div className="d-lg-none text-muted small">{user.email}</div>
                        </td>
                        <td className="d-none d-lg-table-cell text-secondary">{user.email}</td>
                        <td><Badge pill bg={user.status === "Active" ? "success" : "danger"}>{user.status}</Badge></td>
                        <td className="text-end pe-4 text-nowrap">
                          <Button variant="light" size="sm" className="me-1"><FaEdit /></Button>
                          <Button variant="light" size="sm" className="text-danger"><FaTrash /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title className="fw-bold">Add User</Modal.Title></Modal.Header>
        <Form onSubmit={handleAddUser}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Name</Form.Label>
              <Form.Control required placeholder="Enter full name" onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control required type="email" placeholder="example@gmail.com" onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="light" onClick={() => setShowModal(false)}>Close</Button>
            <Button type="submit" variant="danger" style={{backgroundColor: '#c60935'}}>Save User</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;