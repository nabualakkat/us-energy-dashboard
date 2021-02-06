import {GET_NPBS, GET_CBS, GET_EMISSIONS, GET_EXPENDITURES} from '../actions/types'

const initialState = {
  npbs: {
    data: [],
    loading: true,
    error: {}
  },
  cbs: {
    data: [],
    loading: true,
    error: {}
  },
  emissions: {
    data: [],
    loading: true,
    error: {}
  },
  expenditure: {
    data: [],
    loading: true,
    error: {}
  },
}

export default function(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_NPBS:
      return {
        ...state,
        npbs: {
          ...state.npbs,
          data: payload,
          loading: false
        }
      }
    case GET_CBS:
      return {
        ...state,
        cbs: {
          ...state.cbs,
          data: payload,
          loading: false
        }
      }
    case GET_EMISSIONS:
      return {
        ...state,
        emissions: {
          ...state.emissions,
          data: payload,
          loading: false
        }
      }
    case GET_EXPENDITURES:
      return {
        ...state,
        expenditure: {
          ...state.expenditure,
          data: payload,
          loading: false
        }
      }
    default:
      return state
  }
}