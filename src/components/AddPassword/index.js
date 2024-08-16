import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class AddPassword extends Component {
  state = {
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    latestList: [],
    isTrue: false,
    isShow: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, userNameInput, passwordInput} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValue = {
      id: v4(),
      initialValue: initial,
      websiteName: websiteInput,
      userName: userNameInput,
      password: passwordInput,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValue],
      websiteInput: '',
      userNameInput: '',
      passwordInput: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eacValue => eacValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      websiteInput,
      userNameInput,
      passwordInput,
      searchInput,
      latestList,
      isShow,
    } = this.state

    let {isTrue} = this.state
    const newList = latestList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          className="password-manager-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-container">
          <div className="password-card">
            <form
              className="password-form-container"
              onSubmit={this.onAddPassword}
            >
              <h1 className="heading">Add New Password</h1>
              <div className="password-website">
                <img
                  className="web-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="website"
                  value={websiteInput}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="password-website">
                <img
                  className="web-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  className="website"
                  placeholder="Enter Username"
                  value={userNameInput}
                  onChange={this.onChangeUserName}
                />
              </div>
              <div className="password-website">
                <img
                  className="web-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  className="website"
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="pass-image-container">
            <img
              className="sub-image-1"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
            <img
              className="sub-image-2"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
          </div>
        </div>
        <div className="added-password-container">
          <div className="search-password-container">
            <div className="count-container">
              <h1 className="password-text">Your Passwords</h1>
              <p className="count-num">{newList.length}</p>
            </div>
            <div className="search-container">
              <img
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-container">
            <input
              type="checkbox"
              id="show-pass"
              className="check-pass"
              onChange={this.showPassword}
            />
            <label className="show-pass" htmlFor="show-pass">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="no-password-container">
              <img
                className="no-password-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />

              <p className="image-text">no Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="password-list-of-user">
              {newList.map(eacValue => (
                <li
                  className="password-list"
                  id={eacValue.id}
                  key={eacValue.id}
                >
                  <p className={`initial ${eacValue.classAdd}`}>
                    {eacValue.initialValue}
                  </p>

                  <div className="user-detail">
                    <p className="website-name">{eacValue.websiteName}</p>
                    <p className="user-name">{eacValue.userName}</p>
                    {!isShow && (
                      <img
                        className="password-image"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                    {isShow && (
                      <p className="website-password">{eacValue.password}</p>
                    )}
                  </div>
                  <div className="delete-container">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => this.deleteItem(eacValue.id)}
                      data-testid="delete"
                    >
                      <img
                        className="delete-image"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default AddPassword
