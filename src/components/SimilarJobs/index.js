import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {ImLocation2} from 'react-icons/im'
import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = details

  return (
    <li className="similar-job-card">
      <div className="logo-job">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <h1 className="desc">Description</h1>
      <p className="descri">{jobDescription}</p>

      <div className="location-type-package">
        <div className="location">
          <ImLocation2 className="icons" />
          <p className="sub-para">{location}</p>
          <BsBriefcaseFill className="icons" />
          <p className="sub-para">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
