import {
  GET_NPBS,
  GET_CBS,
  GET_EMISSIONS,
  GET_EXPENDITURES,
  GET_OUTAGE,
  GET_GENERATION,
  GET_REGIONALGENERATION,
} from '../actions/types';

const initialState = {
  npbs: {
    data: [],
    loading: true,
    error: {},
  },
  cbs: {
    data: [],
    loading: true,
    error: {},
  },
  emissions: {
    data: [],
    loading: true,
    error: {},
  },
  expenditure: {
    data: [],
    loading: true,
    error: {},
  },
  generation: {
    data: [],
    loading: true,
    error: {},
  },
  outage: {
    data: [],
    loading: true,
    error: {},
  },
  regional: {
    data: [],
    loading: true,
    error: {},
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NPBS:
      return {
        ...state,
        npbs: {
          ...state.npbs,
          data: payload,
          loading: false,
        },
      };
    case GET_CBS:
      return {
        ...state,
        cbs: {
          ...state.cbs,
          data: payload,
          loading: false,
        },
      };
    case GET_EMISSIONS:
      return {
        ...state,
        emissions: {
          ...state.emissions,
          data: payload,
          loading: false,
        },
      };
    case GET_EXPENDITURES:
      return {
        ...state,
        expenditure: {
          ...state.expenditure,
          data: payload,
          loading: false,
        },
      };
    case GET_GENERATION:
      return {
        ...state,
        generation: {
          ...state.generation,
          data: payload,
          loading: false,
        },
      };
    case GET_OUTAGE:
      return {
        ...state,
        outage: {
          ...state.outage,
          data: payload,
          loading: false,
        },
      };
    case GET_REGIONALGENERATION:
      return {
        ...state,
        regional: {
          ...state.regional,
          data: payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}
