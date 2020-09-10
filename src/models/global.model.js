export default {
  namespace: 'global',
  state: {},
  // effects: {
  //   * save({ payload }, { call, put, select }) {
  //     console.log(payload);
  //   },
  // },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
