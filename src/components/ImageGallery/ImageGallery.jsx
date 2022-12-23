import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { fetchPixabayImages } from '../../utils';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

import { PICTURES_ON_PAGE } from '../../constants/constants';
import { notify } from '../../utils/notify';
import Slider from './Slider/Slider';

const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIdx, setModalImageIdx] = useState(0);

  useEffect(() => {
    if (!query) return;
    setImages([]);
    setCurrentQuery(query);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!currentQuery) return;
    setIsLoading(true);
    fetchPixabayImages(currentQuery, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          notify("Didn't find anything", {
            icon: '🤦',
          });
        }
        setImages(p => [...p, ...hits]);
        setTotalPages(Math.ceil(totalHits / PICTURES_ON_PAGE));
      })
      .catch(error =>
        notify(`Something went wrong! ${error.message}`, {
          icon: '😱',
        })
      )
      .finally(() => setIsLoading(false));
  }, [currentQuery, page]);

  useEffect(() => {
    if (images.length > PICTURES_ON_PAGE)
      window.scrollBy({
        top: window.innerHeight - 200,
        behavior: 'smooth',
      });
  }, [images]);

  const handleLoadMoreBtnClick = () => {
    setPage(p => p + 1);
  };

  const handleImageClick = imageID => {
    const modalIdx = images.findIndex(({ id }) => id === imageID);
    setModalImageIdx(modalIdx);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading && (
        <Dna
          height="300"
          width="300"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      )}
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            tags={tags}
            onImageClick={handleImageClick}
          />
        ))}
      </ul>
      {page < totalPages && <LoadMoreBtn onClick={handleLoadMoreBtnClick} disabled={isLoading} />}
      {showModal && (
        <Slider images={images} modalIdx={modalImageIdx} closeFunc={closeModal}></Slider>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
