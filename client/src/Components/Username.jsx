import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Assets/profile.png';
import '../styles/username.css';

function Username() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center ">
        <div className="glass">
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-grey-500">
              Explore More by connecting with us
            </span>
          </div>

          <form className="py-1 ">
            <div className="profile flex justify-center py-4">
              <img src={Avatar} alt="Avatar" className="profile_img" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input type="text" placeholder="username" className="input-box textbox" />
              <button type="submit" className="btn">
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-grey-500">
                Not a Member{' '}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username;
