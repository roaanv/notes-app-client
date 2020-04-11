import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import config from "../config";
import BillingForm, {StripeCreateTokenResponse} from "../components/BillingForm";
import {Elements, StripeProvider} from "react-stripe-elements";
import {BillingData} from "../models/Billing";
import "./Settings.css"

const Settings:React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);

  function billUser(details: BillingData) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  async function handleFormSubmit(storage: number, { token, error }: StripeCreateTokenResponse) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id
      });

      alert("Your card has been charged successfully!");
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Settings">
      <StripeProvider stripe={stripe}>
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </div>
  );}

export default Settings;