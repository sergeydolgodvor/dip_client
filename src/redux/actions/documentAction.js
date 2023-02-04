import ACTIONS from './types';
import axios from 'axios';

import { showErrMsg, showSuccessMsg } from 'utils/notifications';

export const fetchAllDocuments = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/api/get_all_document', {
      headers: { Authorization: token },
    });

    dispatch({
      type: ACTIONS.GET_ALL_DOCUMENTS,
      payload: [...res.data.allDocuments],
    });
  } catch (error) {
    console.log(error);
  }
};

export const findDocument =
  ({ documentId, token }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        '/api/find_document',
        { documentId },
        {
          headers: { Authorization: token },
        }
      );

      showSuccessMsg(res.data.msg);

      dispatch({
        type: ACTIONS.FIND_DOCUMENT,
        payload: res.data.existingDocument,
      });
    } catch (error) {
      console.log(error) ||
        showErrMsg('Проверьте правильность вводимого трек-номера!');
    }
  };
