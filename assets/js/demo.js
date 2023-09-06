/**
 * demo.js
 *
 * Licensed under the MIT license.
 * https://opensource.org/license/mit/
 * 
 * Copyright 2023, WANNABEDEV
 * https://wannabedev.io
 */

 const initSlider = () => {
  const slider = document.querySelector('.slider');
  imagesLoaded(slider, { background: true }, () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('is-loaded');

    const slideActive = document.querySelector('.slide.is-active');
    const mainNavLinkPrev = document.querySelector('.main-nav__link.prev');
    const mainNavLinkNext = document.querySelector('.main-nav__link.next');
    const docBody = document.querySelector('body');
    let counter = 0;

    let isTransitioning = false;

    const init = () => {
      gsap.set(slideActive, { autoAlpha: 1 });
      gsap.set(slideActive.querySelector('.slide__background'), { autoAlpha: 1, y: "0%" });
      gsap.set(slideActive.querySelector('.slide__content_left'), { autoAlpha: 1, y: "0%" });
      gsap.set(slideActive.querySelector('.slide__content_right'), { autoAlpha: 1, y: "0%" });
      gsap.set(docBody, { className: '-=is-loading' });

      mainNavLinkPrev.addEventListener('click', (event) => {
        if (!isTransitioning) {
          isTransitioning = true;
          
          event.preventDefault();
          navigateToPrevSlide();
        }
      });

      mainNavLinkNext.addEventListener('click', (event) => {
        if (!isTransitioning) {
          isTransitioning = true;
          
          event.preventDefault();
          navigateToNextSlide();
        }
      });
    };

    const navigateToPrevSlide = () => {
      const currentSlide = document.querySelector('.slide.is-active');
      const prevSlide = currentSlide.previousElementSibling;
      if (prevSlide) {
        if (!docBody.classList.contains('is-animating')) {
          counter = counter - 180;
        }
        scrollToSection(currentSlide, prevSlide);
      }
    };

    const navigateToNextSlide = () => {
      const currentSlide = document.querySelector('.slide.is-active');
      const nextSlide = currentSlide.nextElementSibling;
      if (nextSlide) {
        if (!docBody.classList.contains('is-animating')) {
          counter = counter + 180;
        }
        scrollToSection(currentSlide, nextSlide);
      }
    };

    const scrollToSection = (sectionFrom, sectionTo) => {
      const background = document.querySelector('.slides-background');
      const iphone = document.querySelector('.image');
      const iphoneBcg = sectionTo.dataset.bcg;
      const titleLeft = sectionTo.querySelector('.slide__title_left');
      const titleRight = sectionTo.querySelector('.slide__title_right');
      const contentLeft = sectionTo.querySelector('.slide__content_left');
      const contentLeftFrom = sectionFrom.querySelector('.slide__content_left');
      const contentRight = sectionTo.querySelector('.slide__content_right');
      const contentRightFrom = sectionFrom.querySelector('.slide__content_right');
      const masterTimeline = gsap.timeline({ paused: true, onComplete: () => {
        isTransitioning = false;
      }});
      const tlScrollDown = gsap.timeline();
      const tlScrollUp = gsap.timeline();

      tlScrollDown
        .set(docBody, { className: '+=is-animating' })
        .set(sectionTo, { autoAlpha: 1 })
        .to(sectionFrom, 1.2, { autoAlpha: 0, ease: 'power4.inOut' }, '0')
        .to(sectionTo, 1.2, { autoAlpha: 1, ease: 'power4.inOut' }, '0')
        .to(background, 1.2, { rotation: counter, transformStyle: "preserve-3d", ease: 'expo.inOut' }, '0')
        .to(iphone, 0.6, { autoAlpha: 0, ease: 'expo.inOut' }, 0.6)
        .set(iphone, { backgroundImage: `url(${iphoneBcg})` })
        .fromTo(iphone, 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'expo.inOut' }, '+=0.15')
        .fromTo(titleLeft, 0.35, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: 'power4.inOut' }, '-=0.35')
        .to(contentLeftFrom, 1.2, { autoAlpha: 0, y: '-100%', ease: 'expo.inOut', clearProps: 'y' }, '0')
        .fromTo(contentLeft, 1.2, { autoAlpha: 0, y: '100%' }, { autoAlpha: 1, y: '0%', ease: 'expo.inOut' }, '0')
        .fromTo(titleRight, 0.35, { autoAlpha: 0, y: -40 }, { autoAlpha: 1, y: 0, ease: 'power4.inOut' }, '-=0.35')
        .to(contentRightFrom, 1.2, { autoAlpha: 0, y: '100%', ease: 'expo.inOut', clearProps: 'y' }, '0')
        .fromTo(contentRight, 1.2, { autoAlpha: 0, y: '-100%' }, { autoAlpha: 1, y: '0%', ease: 'expo.inOut' }, '0')
        .set(docBody, { className: '-=is-animating' });
      
      tlScrollUp
        .set(docBody, { className: '+=is-animating' })
        .set(sectionTo, { autoAlpha: 1 })
        .to(sectionFrom, 1.2, { autoAlpha: 0, ease: 'power4.inOut' }, '0')
        .to(sectionTo, 1.2, { autoAlpha: 1, ease: 'power4.inOut' }, '0')
        .to(background, 1.2, { rotation: counter, transformStyle: "preserve-3d", ease: 'expo.inOut' }, '0')
        .to(iphone, 0.6, { autoAlpha: 0, ease: 'expo.inOut' }, 0.6)
        .set(iphone, { backgroundImage: `url(${iphoneBcg})` })
        .fromTo(iphone, 0.6, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'expo.inOut' }, '+=0.15')
        .fromTo(titleLeft, 0.35, { autoAlpha: 0, y: -40 }, { autoAlpha: 1, y: 0, ease: 'power4.inOut' }, '-=0.35')
        .to(contentLeftFrom, 1.2, { autoAlpha: 0, y: '100%', ease: 'expo.inOut', clearProps: 'y' }, '0')
        .fromTo(contentLeft, 1.2, { autoAlpha: 0, y: '-100%' }, { autoAlpha: 1, y: '0%', ease: 'expo.inOut' }, '0')
        .fromTo(titleRight, 0.35, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: 'power4.inOut' }, '-=0.35')
        .to(contentRightFrom, 1.2, { autoAlpha: 0, y: '-100%', ease: 'expo.inOut', clearProps: 'y' }, '0')
        .fromTo(contentRight, 1.2, { autoAlpha: 0, y: '100%' }, { autoAlpha: 1, y: '0%', ease: 'expo.inOut' }, '0')
        .set(docBody, { className: '-=is-animating' });

      if (sectionFrom.dataset.id < sectionTo.dataset.id) {
        masterTimeline.add(tlScrollUp);
      } else {
        masterTimeline.add(tlScrollDown);
      }

      // Play the animation
      masterTimeline.play();

      // Set active section
      setActiveSection(sectionFrom, sectionTo);

      // Update navigation
      updateNavigation();
    };

    const setActiveSection = (sectionFrom, sectionTo) => {
      sectionFrom.classList.remove('is-active');
      sectionTo.classList.add('is-active');
    };

    const updateNavigation = () => {
      const currentSlide = document.querySelector('.slide.is-active');
      mainNavLinkPrev.classList.toggle('disabled', !currentSlide.previousElementSibling);
      mainNavLinkNext.classList.toggle('disabled', !currentSlide.nextElementSibling);
    };

    init();
  });
};

initSlider();
