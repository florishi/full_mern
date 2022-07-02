import express from "express";
const router = express.Router();
import {createTour, getTours, getTour, getToursByUser, deleteTour, updateTour, getToursBySearch, getToursByTag, getRelatedTours, likeTour} from "../controllers/tour.js";
import auth from '../middleware/auth.js';

router.get('/search', getToursBySearch);
router.get('/tag/:tag', getToursByTag);
router.post('/relatedTours', getRelatedTours);
router.get('/', getTours);
router.get('/:id', getTour);


router.post('/',auth, createTour);
router.delete('/:id',auth, deleteTour);
router.patch('/:id',auth, updateTour);
router.get('/userTours/:id',auth, getToursByUser);
router.patch('/like/:id',auth, likeTour);




export default router;