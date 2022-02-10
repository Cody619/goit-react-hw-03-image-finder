import './App.css'
import axios from 'axios'
import { Searchbar } from './components/Searchbar'
import { Component } from 'react'
import Loader from 'react-loader-spinner'
import queryString from 'query-string'
import { ImageGallery } from './components/ImageGallery'
import { Button } from './components/Button'
import { api_key } from './components/Services'

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

    const params = queryString.stringify({
      key: api_key,
      q: this.lastSearchText,
      page: this.currentPage,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    })

    axios.get('?' + params).then((response) => {
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

    const params = queryString.stringify({
      key: api_key,
      q: searchText,
      pege: 1,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    })

    axios.get('?' + params).then((response) => {
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
