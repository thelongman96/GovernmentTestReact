import colors from '@/config/colors';

export const CustomTextStyleOverrides = {
  width: '100%',
  input: {
    padding: '0 2.2rem',
    fontSize: '1.6rem',
    '::placeholder': {
      fontSize: '1.6rem',
    },
    height: '5.6rem',
    borderRadius: '3px',
    background: 'white 0% 0% no-repeat padding-box',
  },
  variants: [
    {
      props: { variant: 'primary' },
      style: {
        background: colors.unityPrimary,
        color: colors.white,
      },
    },
  ],
};
