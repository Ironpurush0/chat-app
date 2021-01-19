import React, {useState} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {gql, useLazyQuery} from '@apollo/client'

const LoginPage = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const LOGIN_USER = gql`
    query loginUser($username: String! $password: String!){
        login(username: $username password: $password){
            username email createdAt token
        }
    }
  `

const [login, {loading}] = useLazyQuery(LOGIN_USER, {
    onCompleted(data){
        console.log(data)
        localStorage.setItem('token', data.login.token)
        props.history.push("/chat")
    },
    onError(error){
        console.log(error.graphQLErrors[0].extensions.errors)
        setErrors(error.graphQLErrors[0].extensions.errors)
    }
})

  const submitForm = (event) => {
    event.preventDefault()

    login({variables: {username, password}})

    setUsername("")
    setPassword("")

    console.log(errors)
  }

  if(loading){
      return <h1>Loading...</h1>
  }

  return (
      <Row className="py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center">Login</h1>
          <br />
          <Form onSubmit={submitForm}>
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
            <div className="text-center">
              <Button variant="primary" type="submit" style={{backgroundColor: "black", border: "none"}}>
                Login
              </Button>
            </div>
            <Form.Text className="text-center mt-3">Don't have an account? <Link to="/register">Sign up</Link></Form.Text>
        </Form>
        </Col>
      </Row>
  );
}

export default LoginPage;
