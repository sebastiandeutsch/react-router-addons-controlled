// I've wasted some time trying to make this API work, but have decided to stop
// for now and ship something that I have that's already working.
//
// The idea here is that instead of creating an alternative `History` with
// `ControlledHistory`, I think we could just compose with the various *Router
// components and render a `LocationController` that manages the two-way
// binding (which might even be a replacement or implementation for the
// router's <Redirect/> component.
//
// The implementaiton for `LocationController` should be nearly identical to
// `ControlledHistory` but instead of listening to and storing `location` and
// `action` in state like `ControlledHistory`, it just gets the real location
// from the router above it, and the `requestedLocation` from the app. Then,
// when it receives props it decides what to do.
//
// I've attempted it a few times by refactoring `ControlledHistory` but never
// quite got it working. One important thing to remember is it needs to shadow
// `context.location`.
//
// So anyway, here's how the various `Controlled<Type>Router` could be
// implemented with a functioning `LocationController`

const ControlledBrowserRouter = ({
  location:requestedLocation,
  action:requestedAction,
  onChange,
  children,
  ...routerOptions
}) => (
  <BrowserRouter {...routerOptions}>
    {({ router, location, action }) => (
      <LocationController
        router={router}
        location={location}
        action={action}
        onChange={onChange}
        requestedLocation={requestedLocation}
        requestedAction={requestedAction}
        children={children}
      />
    )}
  </BrowserRouter>
)

