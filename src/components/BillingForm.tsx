import React, {FormEvent, useState} from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./BillingForm.css";

export interface BillingFormProps {
  isLoading: boolean;
  onSubmit: any;
  stripe?: any;
}

export interface StripeCreateTokenResponse {
  token: any;
  error: any;
}

const BillingForm: React.FC<BillingFormProps> = ({ isLoading, onSubmit, stripe }) => {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    storage: 0
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      fields.name !== "" &&
      fields.storage !== "" &&
      isCardComplete
    );
  }

  async function handleSubmitClick(event: FormEvent) {
    event.preventDefault();

    setIsProcessing(true);
    const { token, error } = await stripe.createToken({ name: fields.name });
    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  }

  return (
    <form className="BillingForm" onSubmit={handleSubmitClick}>
      <FormGroup controlId="storage">
        <FormLabel>Storage</FormLabel>
        <FormControl
          min="0"
          type="number"
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder="Number of notes to store"
        />
      </FormGroup>
      <hr />
      <FormGroup controlId="name">
        <FormLabel>Cardholder&apos;s name</FormLabel>
        <FormControl
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
          placeholder="Name on the card"
        />
      </FormGroup>
      <FormLabel>Credit Card Info</FormLabel>
      <CardElement
        className="card-field"
        onChange={(e: any) => setIsCardComplete(e.complete)}
        style={{
          base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
        }}
      />
      <LoaderButton
        block
        type="submit"
        size="lg"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </form>
  );
}

export default injectStripe(BillingForm);