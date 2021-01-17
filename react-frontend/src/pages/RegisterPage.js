import React, {useState} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'

import {gql, useMutation} from '@apollo/client'

const App = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})

  const REGISTER_USER = gql`
    mutation registerUser($username: String! $email: String! $password: String! $confirmPassword: String!){
        register(username: $username email: $email password: $password confirmPassword: $confirmPassword){
            username email createdAt
        }
    }
  `

const [register, {loading}] = useMutation(REGISTER_USER, {
    update(_, res){
        console.log(res)
    },
    onError(error){
        console.log(error.graphQLErrors[0].extensions.errors)
        setErrors(error.graphQLErrors[0].extensions.errors)
    }
})

  const submitForm = (event) => {
    event.preventDefault()

    register({variables: {username, email, password, confirmPassword}})

    setEmail("")
    setUsername("")
    setPassword("")
    setConfirmPassword("")

    console.log(email)
    console.log(username)
    console.log(password)
    console.log(confirmPassword)
    console.log(errors)
  }

  if(loading){
      return <h1>Loading...</h1>
  }

  return (
      <Row className="py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Register</h1>
          <br />
          <Form onSubmit={submitForm}>
            <Form.Group>
                <Form.Label className={errors.email && 'text-danger'}>
                    {errors.email ?? 'Email address'}
                </Form.Label>
              <Form.Control type="email" className={errors.email && 'is-invalid'} value={email} onChange={(event) => {setEmail(event.target.value)}} placeholder="Enter email" />
            </Form.Group>
            <Form.Group>
            <Form.Label className={errors.username && 'text-danger'}>
                    {errors.username ?? 'Username'}
                </Form.Label>
              <Form.Control type="text" placeholder="Enter username" className={errors.username && 'is-invalid'} value={username} onChange={(event) => {setUsername(event.target.value)}} />
            </Form.Group>

            <Form.Group>
            <Form.Label className={errors.password && 'text-danger'}>
                    {errors.password ?? 'Password'}
                </Form.Label>
              <Form.Control type="password" placeholder="Password" className={errors.password && 'is-invalid'} value={password} onChange={(event) => {setPassword(event.target.value)}}/>
            </Form.Group>
            <Form.Group>
            <Form.Label className={errors.confirmPassword && 'text-danger'}>
                    {errors.confirmPassword ?? 'ConfirmPassword'}
                </Form.Label>
              <Form.Control type="password" placeholder="Confirm password" className={errors.confirmPassword && 'is-invalid'} value={confirmPassword} onChange={(event) => {setConfirmPassword(event.target.value)}}/>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" style={{backgroundColor: "black", border: "none"}}>
                Register
              </Button>
            </div>
        </Form>
        </Col>
      </Row>
  );
}

export default App;
