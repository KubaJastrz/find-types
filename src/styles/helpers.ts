export const MEDIA_SIZES = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

function minWidth(px: number) {
  return `@media (min-width: ${px}px)`;
}

type MediaSizes = keyof typeof MEDIA_SIZES;

type MediaSizeMap = {
  [key in MediaSizes]: string;
};

interface Media extends MediaSizeMap {
  minWidth: typeof minWidth;
}

export const MEDIA: Media = (Object.keys(MEDIA_SIZES) as Array<MediaSizes>).reduce<
  Record<MediaSizes, string>
>((acc, mediaSize) => {
  acc[mediaSize] = minWidth(MEDIA_SIZES[mediaSize]);
  return acc;
}, {} as any) as any;

MEDIA.minWidth = minWidth;
