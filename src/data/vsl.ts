/**
 * Video sales letter shown on /[locale]/vsl.
 *
 * `src` accepts either a direct video file (e.g. "/vsl.mp4" in `public/`, or a
 * full .mp4/.webm URL) or an embed URL (YouTube "https://www.youtube.com/embed/ID",
 * Vimeo "https://player.vimeo.com/video/ID", Panda, etc.). Empty shows a placeholder.
 */
export const VSL = {
  src: "/vsl.mp4",
  /**
   * Seconds of video watched before the CTA button appears (for embeds, which
   * can't report playback time: seconds after the page opens).
   */
  ctaDelaySeconds: 15,
};

export function isVideoFile(src: string) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}
