import type { NextFunction, Request, Response } from "express";

// import admin from '../config/firebase';

export const verifyToken = async (req: Request & { user?: any }, res: Response, next: NextFunction): Promise<void> => {
  // const authHeader = req.headers.authorization;
  //
  // if (!authHeader || !authHeader.startsWith('Bearer ')) {
  //   res.status(403).json({ error: 'No token provided or incorrect format' });
  //   return;
  // }
  //
  // const idToken = authHeader.split(' ')[1];

  // try {
  // const decodedToken = await admin.auth().verifyIdToken(idToken);
  // req.user = decodedToken; // Attach the decoded token to the request
  next();
  // } catch (error) {
  //   console.error('Error verifying token:', error);
  //   res.status(403).json({ error: 'Unauthorized' });
  // }
};
