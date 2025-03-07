// creditCardUtils.ts

/**
 * Type for credit card networks/brands
 */
export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'dinersclub' | 'unionpay' | 'unknown';

/**
 * Interface for card length requirements
 */
export interface CardLength {
  min: number;
  max: number;
}

/**
 * Identifies credit card type based on card number
 * @param cardNumber - The credit card number (can include spaces or dashes)
 * @returns The card type or "unknown"
 */
export const identifyCardType = (cardNumber: string): CardType => {
  // Remove any spaces, dashes or non-numeric characters
  const cleanedNumber: string = cardNumber.replace(/\D/g, '');

  // Early return if number is too short to identify
  if (cleanedNumber.length < 2) return 'unknown';

  // Check card type based on IIN/BIN patterns

  // Visa: Starts with 4
  if (/^4/.test(cleanedNumber)) {
    return 'visa';
  }

  // Mastercard: Starts with 51-55 or 2221-2720
  if (/^5[1-5]/.test(cleanedNumber) || /^(222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(cleanedNumber)) {
    return 'mastercard';
  }

  // American Express: Starts with 34 or 37
  if (/^3[47]/.test(cleanedNumber)) {
    return 'amex';
  }

  // Discover: Starts with 6011, 622126-622925, 644-649, or 65
  if (/^(6011|65|64[4-9]|622(12[6-9]|1[3-9]|[2-8]|9[0-1]|92[0-5]))/.test(cleanedNumber)) {
    return 'discover';
  }

  // JCB: Starts with 35
  if (/^35/.test(cleanedNumber)) {
    return 'jcb';
  }

  // Diners Club: Starts with 36, 38, or 39
  if (/^3(0[0-5]|[68-9])/.test(cleanedNumber)) {
    return 'dinersclub';
  }

  // UnionPay: Starts with 62
  if (/^62/.test(cleanedNumber)) {
    return 'unionpay';
  }

  // Default case
  return 'unknown';
};

/**
 * Validates credit card number using Luhn algorithm (mod 10)
 * @param cardNumber - The credit card number to validate
 * @returns True if the card number passes the Luhn check
 */
export const validateCardNumber = (cardNumber: string): boolean => {
  const cleanedNumber: string = cardNumber.replace(/\D/g, '');

  if (!cleanedNumber || !/^\d+$/.test(cleanedNumber)) return false;

  // Luhn algorithm implementation
  let sum: number = 0;
  let shouldDouble: boolean = false;

  // Loop through values starting from the rightmost digit
  for (let i: number = cleanedNumber.length - 1; i >= 0; i--) {
    let digit: number = parseInt(cleanedNumber.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return (sum % 10) === 0;
};

/**
 * Formats a credit card number with proper spacing based on card type
 * @param cardNumber - The raw card number
 * @param cardType - The type of card (visa, amex, etc.)
 * @returns Formatted card number
 */
export const formatCardNumber = (cardNumber: string, cardType: CardType): string => {
  const cleanedNumber: string = cardNumber.replace(/\D/g, '');

  // Different card types have different grouping patterns
  switch (cardType) {
    case 'amex':
      // AMEX: XXXX XXXXXX XXXXX (4-6-5)
      return cleanedNumber.replace(/^(\d{4})(\d{6})(\d{0,5})/, '$1 $2 $3').trim();

    case 'dinersclub':
      // Diners Club: XXXX XXXXXX XXXX (4-6-4)
      return cleanedNumber.replace(/^(\d{4})(\d{6})(\d{0,4})/, '$1 $2 $3').trim();

    default:
      // Most cards: XXXX XXXX XXXX XXXX (4-4-4-4)
      return cleanedNumber.replace(/^(\d{4})(\d{4})(\d{4})(\d{0,4})/, '$1 $2 $3 $4').trim();
  }
};

/**
 * Gets expected card length based on card type
 * @param cardType - The type of card
 * @returns Min and max length allowed
 */
export const getCardLengthByType = (cardType: CardType): CardLength => {
  switch (cardType) {
    case 'amex':
      return { min: 15, max: 15 };
    case 'dinersclub':
      return { min: 14, max: 14 };
    case 'visa':
    case 'mastercard':
    case 'discover':
    case 'jcb':
    case 'unionpay':
      return { min: 16, max: 16 };
    default:
      return { min: 13, max: 19 };
  }
};
