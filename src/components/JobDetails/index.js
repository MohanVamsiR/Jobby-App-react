import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {ImLocation2} from 'react-icons/im'
import {HiOutlineExternalLink} from 'react-icons/hi'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }

      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
        employmentType: eachItem.employment_type,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    console.log(skills)

    return (
      <>
        <Header />
        <div className="JD">
          <div className="jobcard-description">
            <div className="logo-job">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
            <div className="description-link">
              <h1 className="desc">Description</h1>
              <div>
                <a
                  href={companyWebsiteUrl}
                  className="website-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                  <span>
                    <HiOutlineExternalLink />
                  </span>
                </a>
              </div>
            </div>
            <p className="descri">{jobDescription}</p>
            <h1 className="skills">Skills</h1>
            <div className="skill-container">
              {skills.map(each => (
                <div key={each.name} className="skill-set">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{each.name}</p>
                </div>
              ))}
            </div>
            <h1 className="skills">Life at Company</h1>
            <div className="company-life">
              <p className="descri">{description}</p>

              <img
                alt="life at company"
                src={imageUrl}
                className="image-company"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarJobs.map(each => (
              <SimilarJobs details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="profile-failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }
}

export default JobDetails
