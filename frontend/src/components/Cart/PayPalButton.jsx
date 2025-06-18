// import React from 'react'
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
{/* <script src="https://www.paypal.com/sdk/js?client-id=AQD5wUD7HjzPjvjL7cVESKyVuYwuLfEcwZBF7mZEQAKDPBx_J3adL26MyNybBwcrhG1V6BfLC-NzojOT&currency=USD"></script> */}

// console.log("Amount for PayPal:", amount);
const PayPalButton = ({amount, onSuccess, onError}) => {
    return (
        <PayPalScriptProvider options={{"client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID
        }}>

          

        <PayPalButtons style={{layout: "vertical"}}
        createOrder = {(data, actions) => {
            return actions.order.create({ //create paypal order
                purchase_units: [{amount: {value: parseFloat(amount).toFixed(2)}}]
        //     define what buying  // total price
            })
        }}

        onApprove={(data, actions) => {
            return actions.order.capture().then(onSuccess)
        }}

        onError={(err) => {
  console.error("PayPal Error:", err);
  onError(err);
}}/>
        
        </PayPalScriptProvider>
    )
}

export default PayPalButton
