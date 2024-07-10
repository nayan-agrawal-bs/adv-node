import NO_IMAGE from '../assets/images/no-image.png';
import NO_USER from '../assets/images/no-user.png';

const prefix = '';

export const IMAGES: { readonly [key: string]: string } = {
  NO_IMAGE,
  NO_USER,
} as const;

export const getImage = (image: string) => {
  return `${prefix}${image}`;
};
