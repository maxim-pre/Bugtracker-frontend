import { Component } from "react";
import { login } from "../services/authService";

class DemoLogin extends Component {
  async componentDidMount() {
    try {
      const { data: jwt } = await login("demo", "demo12345");
      localStorage.setItem("token", jwt.access);
      window.location.href = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data.detail;
        this.setState({ errors });
      }
    }
  }

  render() {
    return null;
  }
}

export default DemoLogin;
