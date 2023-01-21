import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const style = { layout: "vertical" };

const PaypalCheckoutButton = ({ currency, amount, showSpinner }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, dispatch, options, showSpinner]);

  return (<>
    { (showSpinner && isPending) && <div className="spinner" /> }
    <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
            return actions.order
                .create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: currency,
                                value: amount,
                            },
                        },
                    ],
                })
                .then((orderId) => {
                    return orderId;
                });
        }}
        onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
            });
        }}
    />
</>
);
}

export default PaypalCheckoutButton;