import { LOAD_OPEN_ORDERS } from "./action_types";
import api from "../services/api";

export const loadOrders = () => async (dispatch) => {
  let response = await api.loadOrders();
  dispatch({
    type: LOAD_OPEN_ORDERS,
    orders: response.data.orders
  });
}