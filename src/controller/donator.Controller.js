import { DonatorService } from "../services/donator.Service.js";
import { body, param, validationResult } from 'express-validator';

const instanceUserService = new DonatorService();

export const createDonator = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email must be a valid email address'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email } = req.body;
      const createdDonator = await instanceUserService.create(name, email);
      res.status(201).json({ message: "Donator created successfully", createdDonator });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const showDonators = async (req, res) => {
  try {
    const donators = await instanceUserService.showAll();
    res.status(200).json(donators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showDonator = [
  param('id').isInt().withMessage('ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const donator = await instanceUserService.showById(id);
      res.status(200).json(donator);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const updateDonator = [
  param('id').isInt().withMessage('ID must be an integer'),
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Email must be a valid email address'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const donator = await instanceUserService.update(id, name, email);
      res.status(200).json(donator);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const deleteDonator = [
  param('id').isInt().withMessage('ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      await instanceUserService.delete(id);
      res.status(200).json({ message: 'Donator deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];
