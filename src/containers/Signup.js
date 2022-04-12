import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";
import { Formik } from 'formik';
import * as Yup from 'yup';
 
class RegistrationForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password1: "",
      password2: "",
      userType: "",
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
};
   

  /*state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    userType: "",
  };*/
  
  handleSubmit = e => {
    e.preventDefault();

    const { username, email, password1, password2, userType } = this.state;
    this.props.signup(username, email, password1, password2, userType );
    
    const signupFormValid = 
    !username?.length || 
    !email?.length ||
    !password1?.length ||
    !password2?.length ||
    !userType?.length ;
    /*
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let is_student = false;
        if (values.userType === 'student') is_student = true;
        this.props.onAuth(values.userName, values.password,is_student);
        //this.props.history.push("/");
      }
    });*/
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, email, password1, password2, userType } = this.state;
    const { error, loading, token } = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Signup to your account
          </Header>
          {error && <p>{this.props.error.message}</p>}

          <React.Fragment>
          <Form size="large"  onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleChange}
                  value={username}
                  name="username"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={email}
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password1}
                  name="password1"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password2}
                  name="password2"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                />
                <Form.Input name="userType" value={userType} required={true} onChange={this.handleChange} >
                <select>
                  <option value="">Please select a user type !</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                </Form.Input>
                <Form.Field>
                <Button
                  color="teal"
                  fluid
                  size="large"
                  loading={loading}
                  disabled={loading}
                >
                  Signup
                </Button>
                </Form.Field>
              </Segment>
            </Form>
            <Message>
              Already have an account? <NavLink to="/login">Login</NavLink>
            </Message>
          </React.Fragment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (username, email, password1, password2, is_student) =>
      dispatch(authSignup(username, email, password1, password2, is_student))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
