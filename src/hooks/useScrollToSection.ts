/**
 * Custom hook for smooth scrolling to a section by ID
 * @param offset - Offset in pixels to account for sticky headers (default: 80)
 * @returns A function that scrolls to the specified section
 */
export const useScrollToSection = (offset: number = 80) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return scrollToSection;
};
