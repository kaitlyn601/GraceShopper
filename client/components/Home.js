import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <header className='home-header'>
      <div>
        <img
          className='home-img'
          alt='home-img'
          src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/vosges-chocolate-1636570022.png'
        />
      </div>
      <div className='text-box'>
        <div className='heading-primary'>
          <span className='heading-primary-main'>15% off</span>
          <h2 className='heading-primary-main'>comfort</h2>
          <h2 className='heading-primary-main'>foods</h2>

          <span className='heading-primary-sub'>
            <i>with</i> code CRAVINGS
          </span>
        </div>
        <Link to='/products' className='btn btn-white btn-animated'>
          Shop Now
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
