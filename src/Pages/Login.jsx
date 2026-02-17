import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    if (logged) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Logic updated to match your credentials
    if (email === "streetaura@gmail.com" && password === "123456") {
      setError(""); 
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); 
    } 
    else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="shadow p-4 border-0">
            <h3 className="text-center mb-4" style={{ color: "#c60935" }}>Login</h3>
            
            {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter Email" 
                  required 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter Password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <InputGroup.Text 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={{ cursor: "pointer", backgroundColor: "white" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Button 
                type="submit" 
                className="w-100 border-0" 
                style={{ backgroundColor: "#c60935" }}
              >
                Login
              </Button>
            </Form>

            {/* --- CREDENTIALS BOX ADDED BACK BELOW --- */}
            <div className="mt-4 pt-3 border-top">
              <p className="mb-1 text-muted small fw-bold">Login Credentials:</p>
              <div className="p-3 bg-light rounded border shadow-sm" style={{ fontFamily: "monospace" }}>
                <div className="text-truncate">
                    <strong>Email:</strong> streetaura@gmail.com
                </div>
                <div>
                    <strong>Password:</strong> 123456
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;