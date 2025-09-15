import colors from '@/config/colours';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
  }
}

export const CustomButtonStyleOverrides = {
  height: '5.7rem',
  padding: '0.7rem 0',
  marginTop: '1.5rem',
  fontWeight: '900',
  fontSize: '1.6rem',
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        background: colors.buttonPrimary,
        color: colors.white,
        textTransform: 'none',
      },
    },
  ],
};
