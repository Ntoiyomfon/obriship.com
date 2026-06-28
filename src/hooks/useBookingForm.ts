"use client";

import { useEffect, useReducer } from "react";
import { z } from "zod";

export const bookingSteps = ["Sender", "Receiver", "Package", "Service", "Review", "Confirm"] as const;

export type BookingData = {
  sender: Record<string, string>;
  receiver: Record<string, string>;
  package: Record<string, string>;
  service: string;
  acceptedTerms: boolean;
  reference: string;
};

type BookingState = {
  step: number;
  data: BookingData;
  errors: Record<string, string>;
};

export type BookingAction =
  | { type: "field"; section: keyof BookingData; name: string; value: string | boolean }
  | { type: "service"; value: string }
  | { type: "errors"; errors: Record<string, string> }
  | { type: "next" }
  | { type: "back" }
  | { type: "reset" }
  | { type: "hydrate"; state: BookingState };

const initialState: BookingState = {
  step: 0,
  data: {
    sender: {},
    receiver: {},
    package: {},
    service: "",
    acceptedTerms: false,
    reference: ""
  },
  errors: {}
};

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address1: z.string().min(4, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(2, "Postal code is required"),
  phone: z.string().min(6, "Phone is required")
});

const packageSchema = z.object({
  weight: z.string().min(1, "Weight is required"),
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  type: z.string().min(1, "Package type is required"),
  value: z.string().min(1, "Declared value is required"),
  description: z.string().min(3, "Description is required")
});

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "field": {
      if (action.section === "acceptedTerms") {
        return { ...state, data: { ...state.data, acceptedTerms: Boolean(action.value) } };
      }

      if (action.section === "service" || action.section === "reference") {
        return { ...state, data: { ...state.data, [action.section]: String(action.value) } };
      }

      return {
        ...state,
        data: {
          ...state.data,
          [action.section]: {
            ...state.data[action.section],
            [action.name]: String(action.value)
          }
        }
      };
    }
    case "service":
      return { ...state, data: { ...state.data, service: action.value }, errors: {} };
    case "errors":
      return { ...state, errors: action.errors };
    case "next":
      return { ...state, step: Math.min(state.step + 1, bookingSteps.length - 1), errors: {} };
    case "back":
      return { ...state, step: Math.max(state.step - 1, 0), errors: {} };
    case "reset":
      return initialState;
    case "hydrate":
      return action.state;
    default:
      return state;
  }
}

function zodErrors(error: z.ZodError) {
  return Object.fromEntries(error.issues.map((issue) => [String(issue.path[0]), issue.message]));
}

export function useBookingForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = sessionStorage.getItem("fx-booking");
    if (stored) {
      try {
        dispatch({ type: "hydrate", state: JSON.parse(stored) as BookingState });
      } catch {
        sessionStorage.removeItem("fx-booking");
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("fx-booking", JSON.stringify(state));
  }, [state]);

  function validateCurrentStep() {
    if (state.step === 0) {
      const result = contactSchema.safeParse(state.data.sender);
      if (!result.success) dispatch({ type: "errors", errors: zodErrors(result.error) });
      return result.success;
    }
    if (state.step === 1) {
      const result = contactSchema.safeParse(state.data.receiver);
      if (!result.success) dispatch({ type: "errors", errors: zodErrors(result.error) });
      return result.success;
    }
    if (state.step === 2) {
      const result = packageSchema.safeParse(state.data.package);
      if (!result.success) dispatch({ type: "errors", errors: zodErrors(result.error) });
      return result.success;
    }
    if (state.step === 3 && !state.data.service) {
      dispatch({ type: "errors", errors: { service: "Select a service" } });
      return false;
    }
    if (state.step === 4 && !state.data.acceptedTerms) {
      dispatch({ type: "errors", errors: { acceptedTerms: "Accept the terms to confirm" } });
      return false;
    }
    return true;
  }

  function next() {
    if (!validateCurrentStep()) return;
    dispatch({ type: "next" });
  }

  return { state, dispatch, next, validateCurrentStep };
}
