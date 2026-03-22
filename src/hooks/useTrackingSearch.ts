"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function useTrackingSearch(initialValue = "") {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized = value.trim().toUpperCase();

    if (!normalized) {
      return;
    }

    setIsSubmitting(true);
    router.push(`/track/${normalized}`);
  }

  return {
    value,
    setValue,
    isSubmitting,
    onSubmit
  };
}

