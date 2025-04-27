import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({
  percentage,
  starSize = 24,
  starColor = '#facc15',      // Tailwind's text-yellow-400 hex color
  emptyStarColor = '#d1d5db'   // Tailwind's text-gray-300 hex color
}) => {
  const totalStars = 5;
  const starPercentage = 100 / totalStars; // 20% per star
  const fullStars = Math.floor(percentage / starPercentage);
  const partialStar = (percentage % starPercentage) / starPercentage;

  return (
    <div
      style={{
        display: 'flex',
        gap: '4px', // Tailwind gap-1 ≈ 4px
      }}
    >
      {Array.from({ length: totalStars }).map((_, i) => {
        const isFull = i < fullStars;
        const isPartial = i === fullStars && partialStar > 0;

        return (
          <div
            key={i}
            style={{
              position: 'relative',
              width: starSize,
              height: starSize,
            }}
          >
            {/* Empty Star */}
            <FaStar
              style={{
                width: starSize,
                height: starSize,
                color: emptyStarColor,
              }}
            />
            {/* Filled or Partial Star */}
            {(isFull || isPartial) && (
              <FaStar
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: starSize,
                  height: starSize,
                  color: starColor,
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
