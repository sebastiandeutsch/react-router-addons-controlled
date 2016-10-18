import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import Router from '../modules/ControlledBrowserRouter'
import { Link, Match } from 'react-router'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

const NAVIGATE = 'NAVIGATE'

const initialState = {
  router: {
    location: history.location,
    action: history.action
  }
}

const reducer = (state=initialState, action) => {
  if (action.type === NAVIGATE) {
    return {
      ...state,
      router: {
        location: action.location,
        action: action.action
      }
    }
  } else {
    return state
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = connect((state) => {
  return {
    location: state.router.location,
    action: state.router.action
  }
})(class App extends React.Component {

  static propTypes = {
    location: PropTypes.object,
    action: PropTypes.string,
    dispatch: PropTypes.func,
  }

  render() {
    return (
      <Router
        history={history}
        location={this.props.location}
        action={this.props.action}
        onChange={(location, action) => {
          // you must always dispatch a `SYNC` action,
          // because, guess what? you can't actual control the browser history!
          // anyway, use your current action not "SYNC"
          if (action === 'SYNC') {
            this.props.dispatch({
              type: NAVIGATE,
              location,
              action: this.props.action
            })
          } else if (!window.block) {
            this.props.dispatch({
              type: NAVIGATE,
              location,
              action
            })
          } else {
            console.log('blocked!') // eslint-disable-line
          }
        }}
      >
        <div>
          <ul>
            <li><Link to="/one">One</Link></li>
            <li><Link to="/two">Two</Link></li>
            <li><Link to="/three">Three</Link></li>
            <li><a href="https://google.com">Google</a></li>
          </ul>
          <button onClick={() => {
            this.props.dispatch({
              type: NAVIGATE,
              location: { pathname: '/three' },
              action: 'PUSH'
            })
          }}>Go to /three</button>

          <div style={{ padding: 10 }}>
            <Match pattern="/" exactly render={() => <div>Home</div>}/>
            <Match pattern="/one" render={() => <div>One</div>}/>
            <Match pattern="/two" render={() => <div>Two</div>}/>
            <Match pattern="/three" render={() => <div>Three</div>}/>
          </div>
        </div>
      </Router>
    )
  }
})

render(<Provider store={store}><App/></Provider>, document.getElementById('app'))

