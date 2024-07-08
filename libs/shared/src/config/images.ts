const prefix = 'http://localhost:3001/';

export const IMAGES: { readonly [key: string]: string } = {
  NO_IMAGE: 'public/assets/images/no_image.png',
  NO_USER: 'public/assets/images/no_user.png',
} as const;

export const getImage = (image: string) => {
  return `${prefix}${image}`;
};
