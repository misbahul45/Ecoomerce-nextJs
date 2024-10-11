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
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', handleSelect);

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => {
      api.off('select', handleSelect);
      clearInterval(interval);
    };
  }, [api]);

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  const handleNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  return (
    <Carousel setApi={setApi} className="w-full relative animate-1-pulse">
      <CarouselContent>
        {images.map((image, index) => (
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
        {[...Array(count)].map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`w-6 h-1 rounded-full ${
              current === i ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
};

export default CarouselPoster;
