import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    console.log(ratingsArray);
    let total = [];

    let length = ratingsArray.length;

    //we need just the star
    ratingsArray.map((r) => total.push(r.star));

    let totalReduced = total.reduce((prev, star) => {
      console.log('star in reduce', star);
      return prev + star;
    }, 0);

    console.log('totalReduced', totalReduced);

    let highest = length * 5;

    console.log('highest', highest);

    let result = (totalReduced * 5) / highest;
    console.log('avg', result);

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="red"
            editing={false}
            rating={result}
          />
          ( {p.ratings.length})
        </span>
      </div>
    );
  }
};
