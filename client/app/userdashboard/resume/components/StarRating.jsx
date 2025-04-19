import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ percentage, starSize = 24, starColor = 'text-yellow-400', emptyStarColor = 'text-gray-300' }) => {
  const totalStars = 5;
  const starPercentage = 100 / totalStars; // 20% per star
  const fullStars = Math.floor(percentage / starPercentage);
  const partialStar = (percentage % starPercentage) / starPercentage;

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalStars }).map((_, i) => {
        const isFull = i < fullStars;
        const isPartial = i === fullStars && partialStar > 0;

        return (
          <div key={i} className="relative" style={{ width: starSize, height: starSize }}>
            {/* Empty Star */}
            <FaStar
              className={`${emptyStarColor}`}
              style={{ width: starSize, height: starSize }}
            />
            {/* Filled or Partial Star */}
            {(isFull || isPartial) && (
              <FaStar
                className={`${starColor} absolute top-0 left-0`}
                style={{
                  width: starSize,
                  height: starSize,
                  clipPath: isPartial
                    ? `inset(0 ${100 - partialStar * 100}% 0 0)`
                    : 'none',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
