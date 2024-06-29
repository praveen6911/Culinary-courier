import React from "react";
import "../styles/Developer.css";
class DeveloperClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    //   count: 0,
      name: props.name,
      age: props.age,
      company: props.company,
      role: props.role,
      location : props.location,
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/samantha");
    const json = await data.json();
    // console.log(json);

    this.setState({
      name: json.name,
      location: json.location, 
      githuburl: json.html_url,
      public_repos: json.public_repos,
      avatar_url: json.avatar_url,
    });
  }

  render() {
    const { name, githuburl, public_repos, avatar_url ,location} = this.state;

    return (
      <div className="Developer">
        {/* <h1>{count}</h1> */}
        <img src={avatar_url} alt="" className="Developer-avatar" />
        <h1>{name}</h1>
        <h2>{public_repos}</h2> 
        <h2>{githuburl}</h2>
        <h5>{location}</h5>
        {/* <button
          onClick={() => {
            this.setState({ count: count + 1 });
          }}
        >
          count increaser
        </button> */}
      </div>
    );
  }
}

export default DeveloperClass;
