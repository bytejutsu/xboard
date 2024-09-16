import React from "react";
import CryptoJS from "crypto-js";

import { SECRET_KEY } from "../constants";
import { useDispatch } from "react-redux";
import { setCurrentBoardId, setListBoard } from "../../../Store/board";
export default function OpenFileHandler() {
  const dispatch = useDispatch();
  const handleSetBoardData = (str = "") => {
    if (!str?.length) {
      return;
    }
    let bytes = CryptoJS.AES.decrypt(str, SECRET_KEY);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    dispatch(setListBoard(decryptedData?.listBoard));
    dispatch(setCurrentBoardId(decryptedData?.currentBoardId));
  };
  React.useEffect(() => {
    // dispatch(setListBoard([]))
    // dispatch(setCurrentBoardId(null))
  }, []);
  return null;
}
