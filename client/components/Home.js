import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3 className="welcome">Welcome, {username}</h3>
      <img
        class="home-img"
        alt="home-img"
        src="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_04/3445161/210126-godivaclosing-bd-2x1.jpg"
      />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
