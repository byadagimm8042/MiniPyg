// Form submission utility for Google Sheets

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export interface PilotCommitmentData {
  name: string;
  email: string;
  ageBand: string;
  frequency: string;
  commit: boolean;
  feedback: boolean;
  timestamp?: string;
}

export interface CheckoutData {
  name: string;
  email: string;
  plan: string;
  price: number;
  commit: boolean;
  timestamp?: string;
}

export const submitToGoogleSheets = async (
  formType: 'pilot' | 'checkout',
  data: PilotCommitmentData | CheckoutData
): Promise<{ success: boolean; error?: string }> => {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('Google Script URL not configured. Data will only be logged to console.');
    console.log(`${formType.toUpperCase()}_SUBMISSION:`, data);
    return { success: true };
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        data: {
          ...data,
          timestamp: new Date().toISOString(),
        },
      }),
    });

    // With no-cors, we can't read the response, but we assume success
    return { success: true };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, error: 'Failed to submit form data' };
  }
};
