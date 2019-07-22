export const IS_LOADING = 'IS_LOADING';
export const IS_COMPLETE = 'IS_COMPLETE';
export const isLoading = () => async (dispatch) => {
  try {
    return dispatch({
      type: IS_LOADING,
      data: { isLoading: true, },
    });
  } catch (error) {
    return dispatch({
      type: IS_COMPLETE,
      data: { isLoading: false, },
    });
  }
};
export const isComplete = () => async (dispatch) => {
  try {
    return dispatch({
      type: IS_COMPLETE,
      data: { isLoading: false, },
    });
  } catch (error) {
    return dispatch({
      type: IS_COMPLETE,
      data: { isLoading: false, },
    });
  }
};
