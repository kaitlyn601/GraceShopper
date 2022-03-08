import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <header className="home-header">
      <div>
        <h3 className="welcome">Welcome, {username ? username : "Guest!"}</h3>
        <img
          class="home-img"
          alt="home-img"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vosges-chocolate-1636570022.png"
        />
      </div>
      <div class="text-box">
        <h1 class="heading-primary">
          <span class="heading-primary-main">15% off comfort foods</span>
          <span class="heading-primary-sub">
            <i>with</i> code CRAVINGS
          </span>
        </h1>
        <Link to="/products">
          <a href="" class="btn btn-white btn-animated">
            Shop Now
          </a>
        </Link>
      </div>
    </header>
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
