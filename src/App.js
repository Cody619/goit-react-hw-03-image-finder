import './App.css'
import { Searchbar } from './components/Searchbar'
import { Component } from 'react'
import Loader from 'react-loader-spinner'
import { ImageGallery } from './components/ImageGallery'
import { Button } from './components/Button'
import { getImages } from './services/api'

class App extends Component {
  state = {
    isLoading: false,
    imgs: [],
  }

  currentPage = 1
  lastSearchText = ''

  loadMore = () => {
    this.setState({
      isLoading: true,
    })
    this.currentPage += 1

    getImages(this.currentPage, this.lastSearchText).then((response) => {
      this.setState(
        (state) => {
          return {
            isLoading: false,
            imgs: [...state.imgs, ...response.data.hits],
          }
        },
        () => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          })
        },
      )
    })
  }

  fetchImg = (searchText) => {
    this.setState({
      isLoading: true,
    })
    this.currentPage = 1
    this.lastSearchText = searchText

    getImages(this.currentPage, searchText).then((response) => {
      this.setState({
        isLoading: false,
        imgs: response.data.hits,
      })
    })
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.fetchImg} />
        <ImageGallery imgs={this.state.imgs} />
        <div className="Center">
          {this.state.isLoading ? (
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={25}
              width={25}
            />
          ) : null}
          {this.state.imgs.length !== 0 && !this.state.isLoading ? (
            <Button onClick={this.loadMore} />
          ) : null}
        </div>
      </div>
    )
  }
}

export default App
