import React, { Component } from 'react'
import { ImageGalleryItem } from './ImageGalleryItem'
import { Modal } from './Modal'

export class ImageGallery extends Component {
  state = {
    isModalOpen: false,
    imgUrl: '',
  }

  modalOpen = (imgUrl) => {
    this.setState({
      isModalOpen: true,
      imgUrl,
    })
  }
  modalClose = () => {
    this.setState({ isModalOpen: false })
  }
  render() {
    return (
      <div>
        <ul className="ImageGallery">
          {this.props.imgs.map((item) => {
            return (
              <ImageGalleryItem
                key={item.id}
                src={item.previewURL}
                onClick={() => {
                  this.modalOpen(item.largeImageURL)
                }}
              />
            )
          })}
        </ul>
        {this.state.isModalOpen ? (
          <Modal onClose={this.modalClose} bigUrl={this.state.imgUrl} />
        ) : null}
      </div>
    )
  }
}
