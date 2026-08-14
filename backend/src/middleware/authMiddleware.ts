import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "client" | "admin";
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "fallback_secret") as {
      id: string;
      role: "client" | "admin";
    };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
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