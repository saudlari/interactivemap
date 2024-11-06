import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Importa los módulos desde 'swiper/modules'
import { Navigation, Pagination } from 'swiper/modules';

interface ImageCarouselProps {
  imageFiles: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageFiles }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [photoIndex, setPhotoIndex] = React.useState(0);

  const slides = imageFiles.map((file) => ({
    src: file,
  }));

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Swiper
        modules={[Navigation, Pagination]} // Habilita los módulos necesarios para Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        navigation // Activa la navegación con flechas
        pagination={{ clickable: true }} // Activa la paginación
        className="rounded-lg overflow-hidden"
      >
        {imageFiles.map((file, index) => (
          <SwiperSlide key={index}>
            <img
              src={file}
              alt={`Slide ${index}`}
              className="w-full h-64 object-cover cursor-pointer"
              onClick={() => openLightbox(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={slides}
      />
    </div>
  );
};

export default ImageCarousel;
