import React, { useState, useEffect } from 'react';
import RatingsAndReviews from './RatingsAndReviews';
import Review from './Reviews';
import {
  findRatingAverage,
  findRecommendPercent,
  getRatingPercentages,
} from './Rating-Helpers';

function ReviewMain(props) {
  const [ratingAverage, setRatingAverage] = useState(null);
  const [recommendPercentage, setRecommendPercentage] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [ratingsPercentages, setRatingPercentages] = useState(null);
  const [productID, setProductID] = useState(null);
  const [productCharacteristics, setProductCharacteristics] = useState(null);

  // -------------- fetch data from reviews endpoint ---------------------
  useEffect(() => {
    fetch('http://3.21.164.220/reviews?product_id=3')
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setReviewCount(result.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // -------------- fetch data from reviews meta endpoint ---------------------
  useEffect(() => {
    fetch('http://3.21.164.220/reviews/meta?product_id=3')
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setRatingAverage(findRatingAverage(result.ratings));
        setRecommendPercentage(findRecommendPercent(result.recommended));
        setRatingPercentages(getRatingPercentages(result.ratings));
        setProductCharacteristics(result.characteristics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="review-main-container">
      <RatingsAndReviews
        ratingAverage={ratingAverage}
        recommendPercentage={recommendPercentage}
        ratingsPercentages={ratingsPercentages}
        productCharacteristics={productCharacteristics}
      />
      <Review reviewCount={reviewCount} />
    </div>
  );
}

export default ReviewMain;