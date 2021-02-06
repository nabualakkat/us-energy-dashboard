import {GET_NPBS, GET_CBS, GET_EMISSIONS, GET_EXPENDITURES} from './types'
import {setAlert} from './alert'
import api from '../utils/api'


export const getNPBS = () => async (dispatch) => {
  try {
    const res = await api.get('/data/production')
    dispatch({
      type: GET_NPBS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert('Unable to load Net Production by Source data', 'error'))
  }
}
export const getCBS = () => async (dispatch) => {
  console.log('cbs called')
  try {
    const res = await api.get('/data/consumption')
    dispatch({
      type: GET_CBS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert('Unable to load Conusmption by Sector data', 'error'))
  }
}
export const getEmissions = () => async (dispatch) => {
  try {
    const res = await api.get('/data/emissions')
    dispatch({
      type: GET_EMISSIONS,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert('Unable to load Emissions data', 'error'))
  }
}
export const getExpenditures = () => async (dispatch) => {
  try {
    const res = await api.get('/data/expenditure')
    dispatch({
      type: GET_EXPENDITURES,
      payload: res.data
    })
  } catch (err) {
    dispatch(setAlert('Unable to load Economic data', 'error'))
  }
}