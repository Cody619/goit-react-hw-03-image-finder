import React from 'react'
export const ImageGalleryItem = (props) => {
  return (
    <li className="ImageGalleryItem" onClick={props.onClick}>
      <img
        src={props.src}
        alt="все сломалось"
        className="ImageGalleryItem-image"
      />
    </li>
  )
}
