'use client';

import { useState } from 'react';

export default function ProductGallery({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="product-gallery-container">
      <style>{`
        .product-gallery-container {
          display: flex;
          gap: 1.5rem;
          width: 100%;
        }
        .thumb-column {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          width: 90px;
          flex-shrink: 0;
        }
        .thumb-item {
          width: 100%;
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: 2px;
          overflow: hidden;
          transition: all 0.2s ease;
          aspect-ratio: 2/3;
        }
        .thumb-item.active {
          border-color: #000;
        }
        .thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .thumb-item:hover img, .thumb-item.active img {
          opacity: 1;
        }
        .main-image-wrapper {
          flex: 1;
          aspect-ratio: 2/3;
          background: #fcfcfc;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        .main-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0.8; }
          to { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .product-gallery-container {
            flex-direction: column-reverse;
          }
          .thumb-column {
            flex-direction: row;
            width: 100%;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          .thumb-item {
            width: 70px;
            flex-shrink: 0;
          }
        }
      `}</style>
      
      {/* Thumbnails column */}
      <div className="thumb-column">
        {images.map((img, idx) => (
          <div 
            key={idx}
            className={`thumb-item ${activeIndex === idx ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(idx)}
            onClick={() => setActiveIndex(idx)}
          >
            <img src={img} alt={`thumbnail ${idx}`} />
          </div>
        ))}
      </div>

      {/* Main image container */}
      <div className="main-image-wrapper">
        <img 
          key={activeIndex} /* Key forces remount/animation on change */
          src={images[activeIndex]} 
          alt="Imagen principal del producto" 
        />
      </div>
    </div>
  );
}
