import { useEffect, useState } from 'react';
import { SUPPORT_EMAIL } from '@/config/constants';

const useSupportFooter = () => {
  const [supportEmail, setSupportEmail] = useState(
    `mailto:${SUPPORT_EMAIL}`,
  );
  const [supportLabel, setSupportLabel] = useState(SUPPORT_EMAIL);

  // TODO : Add logic to set values from tenant settings
  useEffect(() => {
    setSupportEmail(`mailto:${SUPPORT_EMAIL}`);
    setSupportLabel(SUPPORT_EMAIL);
  }, []);

  return {
    supportEmail,
    supportLabel,
  };
};

export default useSupportFooter;
