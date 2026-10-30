import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "fallback_secret";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "client" | "admin";
  };
}

// Protect routes - Verifies Bearer token from header (or fallback cookie)
export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  let token: string | undefined;

  // 1. Check Authorization header first (Hostinger-safe approach)
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } 
  // 2. Fallback to cookie if available
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: "client" | "admin";
    };
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

// Admin only middleware shortcut
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, message: "Forbidden: Admin access required" });
  }
};

// Generic role-based authorization middleware
export const authorize = (...roles: ("client" | "admin")[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to roles [${roles.join(", ")}]`,
      });
      return;
    }
    next();
  };
};
