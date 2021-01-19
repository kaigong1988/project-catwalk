import React from 'react';
import { hot } from 'react-hot-loader/root';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewMain from './ratings-reviews/ReviewMain';
import Related from './related-products/index.jsx';
import Detail from './productDetail/index.jsx';
import SearchIcon from '@material-ui/icons/Search';
import Form from 'react-bootstrap/Form';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      current: undefined,
      darkMode: false,
    };
    this.changeCurrent = this.changeCurrent.bind(this);
    this.setDarkMode = this.setDarkMode.bind(this);
  }

  componentDidMount() {
    let current = this.setCurrent();
    if (current === undefined) {
      window.location.search = `?id=1`;
      this.setState({
        current: 1,
        darkMode: this.state.darkMode,
      });
    } else {
      this.setState({
        current: current,
        darkMode: this.state.darkMode,
      });
    }
  }

  setCurrent() {
    let searchParam = window.location.search;
    let searchParamSplit = searchParam.split('=');
    let curItem = searchParamSplit[1];
    return curItem;
  }

  changeCurrent(id) {
    console.log(id);
    window.location.search = `?id=${id}`;
  }

  setDarkMode(e) {
    if (!this.state.darkMode) {
      this.activateDarkness();
      this.setState({ darkMode: true });
    } else {
      window.location.reload(false);
    }
  }

  // ------------------- dark mode magic ----------------------
  activateDarkness() {
    document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
    document.body
      .querySelectorAll('img, picture, video')
      .forEach(
        (element) => (element.style.filter = 'invert(1) hue-rotate(180deg)')
      );
  }

  render() {
    if (this.state.current === undefined) {
      return <div>please wait</div>;
    } else {
      return (
        <div>
          <header>
            <h1 class="main-logo">DANGO</h1>
            {/* <div class="search-wrap">
              <input
                type="text"
                class="search"
                placeholder="What are you looking for?"
              />
              <button type="submit" class="searchButton">
                <SearchIcon />
              </button>
            </div> */}
            <div className="dark-mode-wrapper">
              <WbSunnyIcon
                style={{ display: 'inline', marginRight: '.8rem' }}
              />
              <Form.Check
                type="switch"
                id="dark-mode-switch"
                style={{ display: 'inline' }}
                onChange={this.setDarkMode}
              />
              <Brightness3Icon style={{ display: 'inline' }} />
            </div>
            <hr class="header-break"></hr>
          </header>
          <div className="container">
            <Detail current={this.state.current} />
            <Related
              current={this.state.current}
              changeCurrent={this.changeCurrent}
            />
            <ReviewMain current={this.state.current} />
          </div>
        </div>
      );
    }
  }
}

export default hot(App);
