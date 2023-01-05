import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DisplayProfile from '../DisplayProfile'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    searchInp: '',
    radio: '',
    jobApiStatus: jobsApiStatusConstants.initial,
    checkboxList: [],
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobApiStatus: jobsApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInp, radio, checkboxList} = this.state
    const newChecklist = checkboxList.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${newChecklist}&minimum_package=${radio}&search=${searchInp}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobApiStatus: jobsApiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({jobApiStatus: jobsApiStatusConstants.failure})
    }
  }

  onSelectCheckbox = event => {
    const {checkboxList} = this.state
    if (checkboxList.includes(event.target.id)) {
      const index = checkboxList.indexOf(event.target.id)
      checkboxList.splice(index, 1)
    } else {
      checkboxList.push(event.target.id)
    }
    this.setState({checkboxList}, this.getJobs)
  }

  onSelectRadio = event => {
    this.setState({radio: event.target.id}, this.getJobs)
  }

  renderEmployment = () => (
    <ul className="unordered-list">
      {employmentTypesList.map(each => (
        <li
          className="list-el"
          key={each.employmentTypeId}
          onChange={this.onSelectCheckbox}
        >
          <input
            type="checkbox"
            id={each.employmentTypeId}
            className="checkbox"
          />
          <label htmlFor={each.employmentTypeId} className="label-el">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderSalary = () => (
    <ul className="unordered-list">
      {salaryRangesList.map(each => (
        <li className="list-el-radio" key={each.salaryRangeId}>
          <input
            type="radio"
            id={each.salaryRangeId}
            className="radio"
            name="option"
            value={each.salaryRangeId}
            onChange={this.onSelectRadio}
          />
          <label htmlFor={each.salaryRangeId} className="label-el">
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderNoJobs = () => (
    <div className="profile-failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
        className="failure-image"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-para">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  successView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobs()
    }
    return (
      <ul className="jobs-container-ul">
        {jobsList.map(each => (
          <JobCard details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobs()
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

  renderJobs = () => {
    const {jobApiStatus} = this.state

    switch (jobApiStatus) {
      case jobsApiStatusConstants.inProgress:
        return this.renderLoadingView()
      case jobsApiStatusConstants.failure:
        return this.renderFailureView()
      case jobsApiStatusConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInp: event.target.value})
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickSearchInput = () => {
    this.getJobs()
  }

  renderSearchInput = () => {
    const {searchInp} = this.state
    return (
      <>
        <input
          type="search"
          className="search-bar"
          placeholder="search"
          value={searchInp}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onClickEnter}
        />
        <button
          className="search-btn"
          type="button"
          onClick={this.onClickSearchInput}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="preference-profile-container">
            <div className="search-bar-sm">{this.renderSearchInput()}</div>
            <DisplayProfile />
            <hr className="hr-line" />
            <h1 className="text">Type of Employment</h1>
            {this.renderEmployment()}
            <hr className="hr-line" />
            <h1 className="text">Salary Range</h1>
            {this.renderSalary()}
          </div>

          <div className="search-result-contaienr">
            <div className="search-bar-lg">{this.renderSearchInput()}</div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
