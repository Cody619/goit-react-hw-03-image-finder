import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Modal extends Component {
  handleOverLayClick = (event) => {
    if (event.target === event.currentTarget) this.props.onClose()
  }
  handlePress = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose()
    }
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handlePress)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePress)
  }

  render() {
    return ReactDOM.createPortal(
      <div className="Overlay" onClick={this.handleOverLayClick}>
        <div className="Modal">
          <img src={this.props.bigUrl} alt="" />
        </div>
      </div>,
      document.getElementById('ModalRoot'),
    )
  }
}
