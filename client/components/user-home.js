import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/reducers/user'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import 'react-toastify/dist/ReactToastify.css'
import {MyButton as Button} from './Button'

/**
 * COMPONENT
 */

export const UserHome = props => {
  let {userName} = props

  return (
    <div id="userHomeStyle">
      <div className="column">
        <p id="welcomeStyle">Welcome, {userName}</p>
        <div>
          <Link
            to={
              localStorage.gameId && localStorage.playerId === props.user._id
                ? `/games/rooms/${localStorage.roomId}/game/${localStorage.gameId}`
                : '/lobby'
            }
          >
            <Button text="Play" color="default" icon="game" />
          </Link>
        </div>
        <div>
          <Link to="/shop">
            <Button text="Shop" color="default" icon="shop" />
          </Link>
        </div>
        <div>
          <Link to="/decks">
            <Button text="My Collection" color="default" icon="deck" />
          </Link>
        </div>
        <div>
          <div>
            <Link to="/history">
              <Button text="Stats" color="default" icon="stats" />
            </Link>
          </div>
          <a href="#" onClick={props.handleClick}>
            <Button text="Logout" color="default" icon="logout" />
          </a>
        </div>
        <p></p>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    userName: state.user.userName
  }
}
const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(me()),
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
