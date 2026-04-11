import { useRef, useState, useTransition, FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useHoneypot } from "./use-honeypot";

export type FormState = {
  success: boolean;
  errors: Record<string, string[]>;
  message?: string;
};

const initialState: FormState = {
  success: false,
  errors: {},
};

interface UseFormActionOptions<T extends z.ZodSchema> {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  schema: T;
  onSuccess?: () => void;
}

export function useFormAction<T extends z.ZodSchema>({
  action,
  schema,
  onSuccess,
}: UseFormActionOptions<T>) {
  const [state, setState] = useState<FormState>(initialState);
  const [clientErrors, setClientErrors] = useState<Record<string, string[]>>(
    {}
  );
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const honeypot = useHoneypot();

  const validateClientForm = (formData: FormData): boolean => {
    const rawData: Record<string, string> = {};

    // Exclude honeypot fields
    formData.forEach((value, key) => {
      if (!key.startsWith("_")) {
        rawData[key] = value.toString();
      }
    });

    const result = schema.safeParse(rawData);

    if (!result.success) {
      const errors: Record<string, string[]> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0]?.toString() || "general";
        if (!errors[field]) errors[field] = [];
        errors[field].push(issue.message);
      });

      setClientErrors(errors);

      const firstError = Object.values(errors)[0]?.[0];
      if (firstError) {
        toast.error(firstError, {
          duration: 4000,
          position: "bottom-left",
        });
      }

      return false;
    }

    setClientErrors({});
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // verificar honeypot antes de proceder
    if (honeypot.botSubmitted(e)) {
      return;
    }

    const formData = new FormData(e.currentTarget);

    if (!validateClientForm(formData)) {
      return;
    }

    startTransition(async () => {
      const result = await action(state, formData);
      setState(result);

      if (result.success && result.message) {
        toast.success(result.message, {
          duration: 5000,
          position: "bottom-right",
        });
        formRef.current?.reset();
        onSuccess?.();
      }

      if (!result.success && Object.keys(result.errors).length > 0) {
        const firstError = Object.values(result.errors)[0]?.[0];
        if (firstError) {
          toast.error(firstError, {
            duration: 4000,
            position: "bottom-right",
          });
        }
      }
    });
  };

  const allErrors = { ...clientErrors, ...state.errors };

  const hasError = (field: string): boolean => !!allErrors[field];

  const getError = (field: string): string | undefined => allErrors[field]?.[0];

  const clearFieldError = (field: string) => {
    if (clientErrors[field]) {
      setClientErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFieldChange = (field: string) => {
    clearFieldError(field);
    honeypot.notifyChange();
  };

  return {
    state,
    handleSubmit,
    isPending,
    formRef,
    hasError,
    getError,
    clearFieldError,
    handleFieldChange,
    HoneypotFields: honeypot.FormFields,
  };
}
