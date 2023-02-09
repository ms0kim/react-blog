import { v4 as uuidv4 } from "uuid";
import { addToast as add, removeToast } from "../store/toastSlice";
import { useDispatch } from "react-redux"


//useState, useRef를 사용하기 위한 커스텀 use
const useToast = () => {

  //redux를 사용하기 위한 dispatch
  const dispatch = useDispatch();

  //알림 삭제
  const deleteToast = (id) => {
    dispatch(removeToast(id));
  }

  //이전 알림 포함, 새로운 알림 추가
  const addToast = (toast) => {
    const id = uuidv4();
    const toastWithId = {
      ...toast,
      id: id
    }

    //dispatch를 통해 action을 보내줌
    dispatch(add(toastWithId));

    setTimeout(() => {
      deleteToast(id);
    }, 3000)
  };

  //리턴 필수
  return { 
    //원하는 것만 불러올 수 있는 {} 객체 사용
    addToast: addToast,
    deleteToast: deleteToast
  };
};

export default useToast;