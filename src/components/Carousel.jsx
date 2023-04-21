import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

const items = [
  "https://picsum.photos/800/500?random=1",
  "https://picsum.photos/800/500?random=2",
  "https://picsum.photos/800/500?random=3",
  "https://picsum.photos/800/500?random=4",
  "https://picsum.photos/800/500?random=5",
];

const Carousel = () => {
  // Define three state variables using the useState hook
  const [currentSlide, setCurrentSlide] = useState(0); // the index of the currently active slide
  const [loaded, setLoaded] = useState(false); // whether or not the slider has loaded
  const [sliderRef, instanceRef] = useKeenSlider({
    // the initial slide to display
    initial: 0,
    // a callback that runs when the slide changes
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    // a callback that runs when the slider is created
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="p-5 flex flex-col gap-4">
        <div className="container">
          <h1 className="text-white font-bold text-4xl">Hamburg Images</h1>
        </div>
        <div className="relative overflow-hidden w-1/2">
          <div ref={sliderRef} className="keen-slider flex h-[400px]">
            {items.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item}
                  className="keen-slider__slide object-cover"
                  alt="From Picsum"
                />
              );
            })}
          </div>
          {/* Render the navigation buttons once the slider has loaded */}
          {loaded && instanceRef.current && (
            <>
              {/* A button to move the slider to the previous slide */}
              <SliderNavigationButton
                direction="left"
                onClick={(e) => {
                  e.stopPropagation() || instanceRef?.current?.prev();
                }}
                // Disable the button if the current slide is the first slide
                disabled={currentSlide === 0}
              />
              {/* A button to move the slider to the next slide */}
              <SliderNavigationButton
                direction="right"
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                // Disable the button if the current slide is the last slide
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

const SliderNavigationButton = ({ disabled, direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 absolute top-1/2 -translate-y-1/2 flex justify-center items-center bg-white rounded-3xl ${
        direction === "left" ? "left-[15px]" : "right-[15px]"
      } ${disabled ? "hidden" : "opacity-50 hover:opacity-100"} `}
    >
      {direction === "left" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      )}
      {direction === "right" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );
};

export default Carousel;
