/**
 * Adjust Viewport
 */
import debounce from './debounce';

const adjustViewport = () => {
  const triggerWidth = 375;
  const viewport = document.querySelector('meta[name="viewport"]');
  const value = window.outerWidth < triggerWidth ? `width=${triggerWidth}, target-densitydpi=device-dpi` : 'width=device-width, initial-scale=1';
  viewport.setAttribute('content', value);
};
const debouncedAdjustViewport = debounce(adjustViewport);
window.addEventListener('resize', debouncedAdjustViewport, false);
adjustViewport();
