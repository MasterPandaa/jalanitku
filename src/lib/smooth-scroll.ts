/**
 * Smooth Scroll Engine for JalanITku
 * Menggunakan requestAnimationFrame + easeInOutCubic untuk animasi luncuran
 * yang pasti terlihat, mulus 60fps/120fps, dan kebal dari bug/quirks browser.
 */

let activeRaf: number | null = null;

export function smoothScrollTo(
  target: HTMLElement | string | number,
  offset: number = 85,
  duration: number = 750
) {
  if (typeof window === "undefined") return;

  // Hentikan animasi sebelumnya jika ada yang sedang berjalan
  if (activeRaf !== null) {
    cancelAnimationFrame(activeRaf);
    activeRaf = null;
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop;
  let targetY = 0;

  if (typeof target === "number") {
    targetY = target;
  } else if (typeof target === "string") {
    const el = document.getElementById(target.replace("#", ""));
    if (!el) return;
    const rect = el.getBoundingClientRect();
    targetY = rect.top + startY - offset;
  } else if (target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect();
    targetY = rect.top + startY - offset;
  }

  // Batasi target dalam batas dokumen yang valid
  const maxScroll = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  ) - window.innerHeight;

  const finalTargetY = Math.max(0, Math.min(targetY, maxScroll));
  const distance = finalTargetY - startY;

  // Jika jarak sangat dekat (< 4px), langsung posisikan
  if (Math.abs(distance) < 4) {
    window.scrollTo(0, finalTargetY);
    return;
  }

  let startTime: number | null = null;

  // Easing easeInOutCubic: meluncur halus di awal, cepat di tengah, mendarat lembut di akhir
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Batalkan animasi jika pengguna menyentuh layar atau menggerakkan scroll wheel
  const cancelOnInteraction = () => {
    if (activeRaf !== null) {
      cancelAnimationFrame(activeRaf);
      activeRaf = null;
    }
    window.removeEventListener("wheel", cancelOnInteraction);
    window.removeEventListener("touchmove", cancelOnInteraction);
  };

  window.addEventListener("wheel", cancelOnInteraction, { passive: true });
  window.addEventListener("touchmove", cancelOnInteraction, { passive: true });

  // Nonaktifkan scroll-behavior CSS sementara agar tidak terjadi pertarungan frame
  const htmlEl = document.documentElement;
  const prevBehavior = htmlEl.style.scrollBehavior;
  htmlEl.style.scrollBehavior = "auto";

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, Math.round(startY + distance * ease));

    if (progress < 1) {
      activeRaf = requestAnimationFrame(step);
    } else {
      activeRaf = null;
      htmlEl.style.scrollBehavior = prevBehavior;
      window.removeEventListener("wheel", cancelOnInteraction);
      window.removeEventListener("touchmove", cancelOnInteraction);
    }
  };

  activeRaf = requestAnimationFrame(step);
}
