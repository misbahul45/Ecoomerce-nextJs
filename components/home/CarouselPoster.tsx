'use client';
import React from 'react';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import Image from 'next/image';

interface Props {
  images: string[];
}

const CarouselPoster = ({ images }: Props) => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(images.length);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      const selected = api.selectedScrollSnap();
      if (selected === 0) {
        // If we're at the first cloned slide (last real one), jump to the last real slide
        setTimeout(() => api.scrollTo(count - 2), 0);
      } else if (selected === count - 1) {
        // If we're at the last cloned slide (first real one), jump to the first real slide
        setTimeout(() => api.scrollTo(1), 0);
      } else {
        setCurrent(selected);
      }
    };

    api.on('select', handleSelect);

    const interval = setInterval(() => {
      handleNext(); // Scroll automatically every 10 seconds
    }, 10000);

    return () => {
      api.off('select', handleSelect);
      clearInterval(interval);
    };
  }, [api, count]);

  // Cloning slides for infinite scrolling
  const clonedImages = [images[images.length - 1], ...images, images[0]];

  const handlePrevious = () => {
    if (api) {
      if (current === 0) {
        // Jump to the last real slide without animation
        api.scrollTo(count - 2);
      } else {
        api.scrollPrev();
      }
    }
  };

  const handleNext = () => {
    if (api) {
      if (current === count - 1) {
        // Jump to the first real slide without animation
        api.scrollTo(1);
      } else {
        api.scrollNext();
      }
    }
  };

  return (
    <Carousel setApi={setApi} className="w-full relative">
      <CarouselContent>
        {clonedImages.map((image, index) => (
          <CarouselItem key={index} className="w-full lg:h-[75vh] md:h-[50vh] h-[40vh]">
            <Image
              src={image}
              alt={`Poster ${index + 1}`}
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-xl shadow-xl shadow-slate-800/20"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
            aria-label="Previous slide"
            onClick={handlePrevious}
          />
          <CarouselNext
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
            aria-label="Next slide"
            onClick={handleNext}
          />
        </>
      )}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 mb-2">
        {[...Array(count - 2)].map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i + 1)}
            className={`w-6 h-1 rounded-full ${current === i + 1 ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </Carousel>
  );
};

export default CarouselPoster;
