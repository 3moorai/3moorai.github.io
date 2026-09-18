interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

export function checkRateLimit(key: string): {
  success: boolean;
  remaining: number;
  resetMinutes: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record || now > record.resetAt) {
    loginAttempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return {
      success: true,
      remaining: MAX_ATTEMPTS - 1,
      resetMinutes: 15,
    };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const minutesLeft = Math.ceil((record.resetAt - now) / (60 * 1000));
    return {
      success: false,
      remaining: 0,
      resetMinutes: minutesLeft,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: MAX_ATTEMPTS - record.count,
    resetMinutes: Math.ceil((record.resetAt - now) / (60 * 1000)),
  };
}

export function resetRateLimit(key: string): void {
  loginAttempts.delete(key);
}
