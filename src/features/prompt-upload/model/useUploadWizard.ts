import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UploadFormData {
  // Step 1: Basic info
  aiModel: string;
  promptType: "IMAGE" | "TEXT" | "VIDEO" | "";
  categoryId: string;

  // Step 2: Prompt content
  title: string;
  description: string;
  promptText: string;
  testPrompt: string;

  // Step 3: Example outputs
  exampleImages: string[];

  // Step 4: Pricing
  price: number;
  discount: number;
  isFree: boolean;
  isSelect: boolean;

  // Step 5: Verification
  verificationLink: string;
  agreedToTerms: boolean;
}

interface UploadWizardState {
  currentStep: number;
  formData: UploadFormData;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateForm: (data: Partial<UploadFormData>) => void;
  reset: () => void;
}

const initialFormData: UploadFormData = {
  aiModel: "",
  promptType: "",
  categoryId: "",
  title: "",
  description: "",
  promptText: "",
  testPrompt: "",
  exampleImages: [],
  price: 0,
  discount: 0,
  isFree: false,
  isSelect: false,
  verificationLink: "",
  agreedToTerms: false,
};

export const useUploadWizard = create<UploadWizardState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: { ...initialFormData },
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
      updateForm: (data) =>
        set((s) => ({ formData: { ...s.formData, ...data } })),
      reset: () => set({ currentStep: 1, formData: { ...initialFormData } }),
    }),
    { name: "upload-wizard" }
  )
);
