import { combineReducers } from 'redux'

const InitData: [] = []

interface actionType {
  data?: object,
  type?: string
}
const NavabarData = (state = InitData, action: actionType) => {
  switch (action.type) {
    case 'init':
      const { data } = action
      console.log('data啊', data);
      return data

    default:
      return state
  }
}

export default combineReducers({
  NavabarData
})