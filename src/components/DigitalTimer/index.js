import {Component} from 'react'

import './index.css'

const initialState = {
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
  timerStatus: false,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingInSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingInSeconds / 60)
    const seconds = Math.floor(totalRemainingInSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  incrementTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  decrementTimerLimitInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
    }))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({timerStatus: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  startOrPauseTimer = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes, timerStatus} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (timerStatus) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({timerStatus: !prevState.timerStatus}))
  }

  render() {
    const {timerLimitInMinutes, timerStatus} = this.state
    const timerStatusText = timerStatus ? 'Running' : 'Paused'
    const buttonStatusImgUrl = timerStatus
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const imgAltText = timerStatus ? 'pause icon' : 'play icon'
    const buttonStatusText = timerStatus ? 'Pause' : 'Start'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-text-container">
          <div className="timer-container">
            <div className="timer-display-container">
              <h1 className="timer-display">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-status-text">{timerStatusText}</p>
            </div>
          </div>
          <div className="timer-setting-container">
            <div className="start-reset-container">
              <div className="start-pause-buttons-container">
                <button
                  type="button"
                  className="start-stop-btn"
                  onClick={this.startOrPauseTimer}
                >
                  <img
                    src={buttonStatusImgUrl}
                    alt={imgAltText}
                    className="start-stop-image"
                  />
                </button>
                <p className="button-status-text">{buttonStatusText}</p>
              </div>
              <div className="reset-container">
                <button
                  type="button"
                  className="start-stop-btn"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="start-stop-image"
                  />
                </button>
                <p className="button-status-text">Reset</p>
              </div>
            </div>
            <p className="set-timer-text">Set Timer Limit</p>
            <div className="timer-operations-container">
              <button
                className="timer-limit-button"
                type="button"
                onClick={this.decrementTimerLimitInMinutes}
              >
                <p className="operation">-</p>
              </button>
              <p className="timer-limit-text">{timerLimitInMinutes}</p>
              <button
                className="timer-limit-button"
                type="button"
                onClick={this.incrementTimerLimitInMinutes}
              >
                <p className="operation">+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
