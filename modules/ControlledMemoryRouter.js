import React, { PropTypes } from 'react'
import ControlledHistory from './ControlledHistory'
import StaticRouter from 'react-router/StaticRouter'

const ControlledMemoryRouter = ({
  history,
  location,
  action,
  onChange,
  restoreKeys,
  saveKeys,
  ...routerProps
}) => (
  <ControlledHistory
    history={history}
    location={location}
    action={action}
    onChange={onChange}
    restoreKeys={restoreKeys}
    saveKeys={saveKeys}
  >
    {({ history, action, location }) => (
      <StaticRouter
        action={action}
        location={location}
        onPush={history.push}
        onReplace={history.replace}
        blockTransitions={history.block}
        {...routerProps}
      />
    )}
  </ControlledHistory>
)

ControlledMemoryRouter.propTypes = {
  // controlled props
  history: PropTypes.object,
  location: PropTypes.object,
  action: PropTypes.string,
  onChange: PropTypes.func,
  restoreKeys: PropTypes.func,
  saveKeys: PropTypes.func,

  // history options
  getUserConfirmation: PropTypes.func,
  initialEntries: PropTypes.array,
  initialIndex: PropTypes.number,
  keyLength: PropTypes.number,

  // router options
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ])
}

export default ControlledMemoryRouter
