
import { body, param, validationResult } from 'express-validator';
import { CharityService } from '../services/charity.Service.js';

const instanceCharityService = new CharityService();

export const createCharity = [
  body('name').isString().withMessage('Name must be a valid String!')
  .notEmpty()
  .withMessage('name is required')
  .exists()
  .withMessage('The name already in use')
  .isLength({min:20,max:30})
  .withMessage('Name must be between 20 and 30 characters')
  ,
  body('identification').isString()
  .withMessage('Identification must be a valid string!')
  .notEmpty()
  .withMessage('Identification is Required!')
  .isLength({min:14})
  .withMessage('identification must be have 14 characters'),

  body('description')
  .isString()
  .withMessage('The description must be a valid description time')
  .notEmpty()
  .withMessage('The description is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        name, description, identification
       } = req.body;
      const createdCharity = await instanceCharityService.create(
        name, description, identification
    );
      res.status(201).json({ message: "Charity created successfully", createdCharity });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const showCharities = [
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return  res.status(400).json({errors:errors.array() });
        }
        try {
          const charities = await instanceCharityService.showAll();
          res.status(200).json(charities);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      } 
    ];

export const showCharity = [
  param('id').isInt().withMessage('ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const donation = await instanceCharityService.showById(id);
      res.status(200).json(donation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const updateCharity = [
  param('id').isInt().withMessage('ID must be an integer'),
  body('name').isString().withMessage('Name must be a valid String!')
  .notEmpty()
  .withMessage('name is required')
  .exists()
  .withMessage('The name already in use')
  .isLength({min:20,max:30})
  .withMessage('Name must be between 20 and 30 characters')
  ,
  body('identification').isString()
  .withMessage('Identification must be a valid string!')
  .notEmpty()
  .withMessage('Identification is Required!')
  .isLength({min:14})
  .withMessage('identification must be have 14 characters'),

  body('description')
  .isString()
  .withMessage('The description must be a valid description time'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const {   name, description, identification} = req.body;
      const Charity = await instanceCharityService.update(
        id, name, description, identification
        );
      res.status(200).json(Charity);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const deleteCharity = [
  param('id').isInt().withMessage('ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      await instanceCharityService.delete(id);
      res.status(200).json({ message: 'Charity deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];
