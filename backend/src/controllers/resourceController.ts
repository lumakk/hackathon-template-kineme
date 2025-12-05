import { Request, Response } from 'express';

// In-memory mock DB for Hackathon speed
const resources: any[] = [
  { id: 1, name: "Sample Resource" }
];

export const getResources = (req: Request, res: Response) => {
  res.json(resources);
};

export const createResource = (req: Request, res: Response) => {
  const newResource = { id: Date.now(), ...req.body };
  resources.push(newResource);
  res.status(201).json(newResource);
};
