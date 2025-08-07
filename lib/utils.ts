import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `CC-${timestamp}-${randomStr}`.toUpperCase();
}

export function generateShareUrl(designId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";
  return `${baseUrl}/share/${designId}`;
}

export function generateEditUrl(designId: string, token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";
  return `${baseUrl}/customize?edit=${designId}&token=${token}`;
}

export function calculatePricing(items: any): {
  basePrice: number;
  customizationFee: number;
  total: number;
} {
  let basePrice = 0;
  let customizationFee = 0;

  // Base prices for items (in cents)
  const prices = {
    golfBalls: 2999,
    tees: 999,
    divotTool: 1999,
    ballMarker: 1499,
    towel: 2499,
  };

  // Calculate base price
  Object.entries(items).forEach(([key, item]: [string, any]) => {
    if (item.included) {
      basePrice += prices[key as keyof typeof prices] || 0;
    }
  });

  // Add customization fees
  if (items.golfBalls.included && items.golfBalls.customization.text) {
    customizationFee += 1000; // $10 for ball customization
  }
  if (items.divotTool.included && items.divotTool.engraving) {
    customizationFee += 500; // $5 for engraving
  }
  if (items.towel.included && items.towel.embroideryText) {
    customizationFee += 800; // $8 for embroidery
  }

  return {
    basePrice,
    customizationFee,
    total: basePrice + customizationFee,
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}
