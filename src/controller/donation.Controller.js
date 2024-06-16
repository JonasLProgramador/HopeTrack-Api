import { DonationService } from "../services/donation.Service.js";
import { body, param, validationResult } from 'express-validator';

const instanceDonationService = new DonationService()

export const createDonation = [
  body('amount').isFloat().withMessage('amount must be a float number').notEmpty().withMessage('amount is required'),
  body('donation_date').isDate().withMessage('The data must be a valid data time'),
  body('payment_receipt_link').isURL().withMessage('The payment receipt link must be a valid link').notEmpty(),
  body('donator_id').isInt().notEmpty().withMessage('The id is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        amount,
        donation_date,
        payment_receipt_link,
        donator_id 
       } = req.body;
      const createdDonation = await instanceDonationService.create(
        amount,
        donation_date,
        payment_receipt_link,
        donator_id
    );
      res.status(201).json({ message: "Donator created successfully", createdDonation });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const showDonations = [
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return  res.status(400).json({errors:errors.array() });
        }
        try {
          const donations = await instanceDonationService.showAll();
          res.status(200).json(donations);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      } 
    ];

export const showDonation = [
  param('id').isInt().withMessage('ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const donation = await instanceDonationService.showById(id);
      res.status(200).json(donation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const updateDonation = [
  param('id').isInt().withMessage('ID must be an integer'),
  body('amount').optional().isFloat().withMessage('amount must be a float number').notEmpty().withMessage('amount is required'),
  body('donation_date').optional().isDate().withMessage('The data must be a valid data time'),
  body('payment_receipt_link').optional().isURL().withMessage('The payment receipt link must be a valid link'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { 
        amount,
        donation_date,
        payment_receipt_link
     } = req.body;
      const donation = await instanceDonationService.update(
        id,
        amount,
        donation_date,
        payment_receipt_link,
        );
      res.status(200).json(donation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

export const deleteDonation = [
  param('id').isInt().withMessage('ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      await instanceDonationService.delete(id);
      res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];
