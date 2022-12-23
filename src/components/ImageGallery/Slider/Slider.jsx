import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Dna } from 'react-loader-spinner';

const modalRoot = document.querySelector('#modalRoot');

const Slider = ({ images, modalIdx, closeFunc }) => {
  const [modalImageIdx, setModalImageIdx] = useState(modalIdx);
  const [imageForModal, setImageForModal] = useState(images[modalIdx].largeImageURL);
  const [altForModal, setAltForModal] = useState(images[modalIdx].tags);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        closeFunc();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeFunc]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeFunc();
    }
  };

  const showNextSlide = (target, type) => {
    const typeAction = {
      next: 1,
      previous: -1,
    };
    target.parentNode.classList.remove('loaded');
    const nextModalIdx = modalImageIdx + typeAction[type];
    const nextModalImage = images[nextModalIdx];
    setModalImageIdx(nextModalIdx);
    setImageForModal(nextModalImage.largeImageURL);
    setAltForModal(nextModalImage.tags);
    setLoading(true);
  };

  const onImageLoaded = target => {
    setLoading(false);
    target.parentNode.classList.add('loaded');
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img
          className="modalImg"
          src={imageForModal}
          alt={altForModal}
          onLoad={({ currentTarget }) => onImageLoaded(currentTarget)}
        />
        <p className="textForModal">{altForModal}</p>

        <button
          type="button"
          className="slideBtn prevSlide"
          onClick={({ currentTarget }) => {
            showNextSlide(currentTarget, 'previous');
          }}
          disabled={!(modalImageIdx > 0) || loading}
        ></button>

        <button
          type="button"
          className="slideBtn nextSlide"
          onClick={({ currentTarget }) => {
            showNextSlide(currentTarget, 'next');
          }}
          disabled={!(modalImageIdx < images.length - 1) || loading}
        ></button>

        <Dna
          height="300"
          width="300"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      </div>
    </div>,
    modalRoot
  );
};

export default Slider;

Slider.propTypes = {
  images: PropTypes.array.isRequired,
  modalIdx: PropTypes.number.isRequired,
  closeFunc: PropTypes.func.isRequired,
};
