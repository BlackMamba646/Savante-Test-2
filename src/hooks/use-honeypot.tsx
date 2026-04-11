import { FormEvent, useRef } from "react";

const FORM_HONEYPOT_FIELDS = ["_website", "_address"];

export const useHoneypot = () => {
  const TIMEOUT_MS = 400;

  const changedValueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  enum TimeoutState {
    NotStarted,
    Running,
    Ended,
  }
  const timeoutState = useRef<TimeoutState>(TimeoutState.NotStarted);

  /**
   * Returns whether it detected a bot or not
   */
  const botSubmitted = (formEvent: FormEvent<HTMLFormElement>): boolean => {
    // Check if the form was filled in too fast
    const filledTooFast = timeoutState.current === TimeoutState.Running;
    if (filledTooFast) return true;

    // Check if honeypot fields were filled
    const formData = new FormData(formEvent.currentTarget);
    for (const field of FORM_HONEYPOT_FIELDS) {
      const value = formData.get(field);
      /* console.log({value}); */

      if (value?.toString().trim()) {
        return true;
      }
    }

    // Not a bot
    return false;
  };

  const notifyChange = () => {
    if (changedValueTimeoutRef.current || timeoutState.current) return;

    timeoutState.current = TimeoutState.Running;
    changedValueTimeoutRef.current = setTimeout(() => {
      changedValueTimeoutRef.current = null;
      timeoutState.current = TimeoutState.Ended;
    }, TIMEOUT_MS);
  };

  const FormFields = () => {
    const className =
      "absolute left-[-999999999px] top-0 max-h-0 max-w-0 overflow-clip pointer-events-none";

    return FORM_HONEYPOT_FIELDS.map((fieldName) => (
      <input
        className={className}
        placeholder={fieldName}
        type="text"
        name={fieldName}
        tabIndex={-1}
        autoComplete="off"
        key={fieldName}
      />
    ));
  };

  return { botSubmitted, notifyChange, FormFields };
};
