import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";

export function useModalControl() {
  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);

  const showModal = (modalName) => dispatch(openModal(modalName));
  const hideModal = () => dispatch(closeModal());
  const isActive = (modalName) => activeModal === modalName;

  return { showModal, hideModal, isActive };
}
