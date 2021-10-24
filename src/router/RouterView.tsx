import { Switch, Route, Redirect } from 'react-router-dom'

interface RouterViewProps {
  routes?: any
}
const RouterView: React.FC<RouterViewProps> = ({
  routes
}) => {

  return (
    <Switch>
      {
        routes.map((item: any, index: number) => {
          if (item.component) {
            return <Route key={index} path={item.path} exact={item.exact} component={item.component} />
          } else {
            return <Route key={index} path={item.path} exact={item.exact}>
              <Redirect to={item.to} />
            </Route>
          }
        })
      }
    </Switch>
  )
}

export default RouterView