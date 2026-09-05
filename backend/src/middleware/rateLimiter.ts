import rateLimit from 'express-rate-limit';

// Standard rate limiter for contact form submissions (5 requests per 15 minutes per IP)
export const contactFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent from this IP. Please wait 15 minutes before trying again.'
  }
});

// General API rate limiter (120 requests per minute per IP)
export const generalApiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please slow down.'
  }
});
