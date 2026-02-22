import { useEffect, useRef, useCallback } from 'react';

export function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useStaggerReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = container.querySelectorAll('[data-stagger="item"]');
          items.forEach((item, i) => {
            setTimeout(() => {
              (item as HTMLElement).classList.add('pop-in');
            }, i * 120);
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useTypewriter(phrases: string[], typeSpeed = 80, eraseSpeed = 50, holdTime = 1100, nextDelay = 300) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    let timeout: ReturnType<typeof setTimeout>;

    function typeLoop() {
      const current = phrases[phraseIndex];

      if (!isErasing) {
        el!.innerHTML = current.substring(0, charIndex + 1) + '<span class="typewriter-cursor">|</span>';
        charIndex++;
        if (charIndex < current.length) {
          timeout = setTimeout(typeLoop, typeSpeed);
        } else {
          isErasing = true;
          timeout = setTimeout(typeLoop, holdTime);
        }
      } else {
        el!.innerHTML = current.substring(0, charIndex) + '<span class="typewriter-cursor">|</span>';
        charIndex--;
        if (charIndex >= 0) {
          timeout = setTimeout(typeLoop, eraseSpeed);
        } else {
          isErasing = false;
          charIndex = 0;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeout = setTimeout(typeLoop, nextDelay);
        }
      }
    }

    timeout = setTimeout(typeLoop, 1000);

    return () => clearTimeout(timeout);
  }, [phrases, typeSpeed, eraseSpeed, holdTime, nextDelay]);

  return ref;
}

export function useAiGlow() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--aiGlow', '0');
      return;
    }

    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let scrollVelocity = 0;
    let smoothedGlow = 0;
    let rafId: number | null = null;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    function updateGlow() {
      smoothedGlow += (scrollVelocity - smoothedGlow) * 0.15;
      smoothedGlow = Math.max(0, Math.min(1, smoothedGlow));
      document.documentElement.style.setProperty('--aiGlow', String(smoothedGlow));

      if (smoothedGlow > 0.01 || scrollVelocity > 0) {
        rafId = requestAnimationFrame(updateGlow);
      } else {
        rafId = null;
      }
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaTime = currentTime - lastScrollTime;

      if (deltaTime > 0) {
        const rawVelocity = deltaY / deltaTime;
        scrollVelocity = Math.min(rawVelocity / 5, 1.0);
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;

      if (!rafId) {
        rafId = requestAnimationFrame(updateGlow);
      }

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollVelocity = 0;
      }, 150);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.documentElement.style.setProperty('--aiGlow', '0');

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
}

export function useParallax(selector: string, factor = 0.15, maxPx = 8) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const el = document.querySelector(selector) as HTMLElement;
      if (!el) return;
      const scrolled = window.scrollY;
      const offset = Math.min(scrolled * factor, maxPx);
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selector, factor, maxPx]);
}

export function usePhoneParallax() {
  const cleanupRef = useRef<(() => void) | null>(null);

  const initParallax = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth <= 768) return;

    const phoneMockup = document.querySelector('.hero-phone') as HTMLElement;
    if (!phoneMockup) return;

    let ticking = false;
    let isHovering = false;

    const updateParallax = (e: MouseEvent) => {
      if (!isHovering || ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const rect = phoneMockup.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / window.innerWidth;
        const deltaY = (e.clientY - centerY) / window.innerHeight;
        const moveX = Math.max(-6, Math.min(6, deltaX * 6));
        const moveY = Math.max(-6, Math.min(6, deltaY * 6));
        phoneMockup.style.transform = `translate(${moveX}px, ${moveY}px)`;
        ticking = false;
      });
    };

    const onEnter = () => { isHovering = true; };
    const onLeave = () => {
      isHovering = false;
      phoneMockup.style.transform = 'translate(0, 0)';
    };

    phoneMockup.addEventListener('mouseenter', onEnter);
    phoneMockup.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousemove', updateParallax);

    cleanupRef.current = () => {
      phoneMockup.removeEventListener('mouseenter', onEnter);
      phoneMockup.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousemove', updateParallax);
    };
  }, []);

  useEffect(() => {
    initParallax();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const phoneMockup = document.querySelector('.hero-phone') as HTMLElement;
        if (phoneMockup) phoneMockup.style.transform = 'translate(0, 0)';
        initParallax();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [initParallax]);
}

export function useHapticFeedback() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    function triggerHaptic(e: Event) {
      const target = (e as Event & { currentTarget: HTMLElement }).currentTarget;
      if (target) {
        target.classList.add('tap-flash');
        setTimeout(() => {
          target.classList.remove('tap-flash');
        }, 150);
      }
      if ('vibrate' in navigator) {
        try { navigator.vibrate(10); } catch { /* noop */ }
      }
    }

    const selectors = '.price-btn, .btn-primary, .btn-secondary, .nav-cta';
    const buttons = document.querySelectorAll(selectors);
    buttons.forEach((btn) => btn.addEventListener('click', triggerHaptic));

    // Touch feedback on price buttons
    const priceBtns = document.querySelectorAll('.price-btn');
    const touchStart = (e: Event) => {
      (e.currentTarget as HTMLElement).style.transform = 'scale(0.97)';
    };
    const touchEnd = (e: Event) => {
      (e.currentTarget as HTMLElement).style.transform = '';
    };
    priceBtns.forEach((btn) => {
      btn.addEventListener('touchstart', touchStart, { passive: true });
      btn.addEventListener('touchend', touchEnd);
    });

    return () => {
      buttons.forEach((btn) => btn.removeEventListener('click', triggerHaptic));
      priceBtns.forEach((btn) => {
        btn.removeEventListener('touchstart', touchStart);
        btn.removeEventListener('touchend', touchEnd);
      });
    };
  }, []);
}
