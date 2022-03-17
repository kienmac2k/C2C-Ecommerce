import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTotal } from "../../app/cart/slice";
const OrderInfo = () => {
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setTotal());
  }, [dispatch]);
  return (
    <div>
      <table
        style={{ width: "100%", fontSize: "1.3rem", marginBottom: "4rem" }}
      >
        <thead>
          <tr>
            <th>Order Summary</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Delivery Charges</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="font-weight-bold">FREE </td>
          </tr>

          <tr>
            <td>VAT(7.5%)</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="font-weight-bold ">{(total * 7.5) / 100}</td>
          </tr>

          <tr>
            <td className="font-weight-bold">Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="font-weight-bold">{(total * 107.5) / 100}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderInfo;
