import React from 'react'

import {Container, Button, Row, Col} from 'react-bootstrap'

import {Link} from 'react-router-dom'

const HomePage = () => {
    return (
        <Container>
            <Row className="py-5 justify-content-center">
                <Col>
                    <h1 className="mt-5">Chatty Patty</h1>
                    <Link to="/register">
                        <Button variant="primary">Primary</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage
