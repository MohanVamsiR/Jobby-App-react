import {Link} from 'react-router-dom'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {ImLocation2} from 'react-icons/im'
import './index.css'

const JobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="jobcard">
        <div className="logo-job">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="company-name">
            <h1 className="company-title">{title}</h1>
            <div className="rating">
              <BsFillStarFill className="star" />
              <p className="ratings">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-package">
          <div className="location">
            <ImLocation2 className="icons" />
            <p className="sub-para">{location}</p>
            <BsBriefcaseFill className="icons" />
            <p className="sub-para">{employmentType}</p>
          </div>
          <div>
            <p className="pack">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <p className="desc">Description</p>
        <p className="descri">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
