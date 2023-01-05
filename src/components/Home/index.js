import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="container">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs,salary information,company{' '}
        <br />
        reviews.Find the job that fits your abilities and potential
      </p>

      <Link to="/jobs" className="item">
        <button className="findjob-button" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)
export default Home
