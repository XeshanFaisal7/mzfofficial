export type PortfolioLenis = import("lenis").default | null;

export function createScrollNav(lenis: PortfolioLenis) {
  return (hash: string) => {
    const el = document.querySelector(hash);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.1 });
    } else {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
}
