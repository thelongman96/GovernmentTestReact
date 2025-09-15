import { useTranslation } from 'react-i18next';
import LinkWrapper from './LinkWrapper';
import useSupportFooter from './hooks/useSupportFooter';
import './styles/supportFooter.scss';

const SupportFooter = () => {
  const { t } = useTranslation();
  const { supportEmail, supportLabel } = useSupportFooter();

  return (
    <div className="supportFooter__container">
      <p>
        {t('auth.login.reachOutTo1')}&nbsp;
        <LinkWrapper
          text={supportLabel}
          linkHref={supportEmail}
          underline={false}
          classes={['supportFooter__link']}
        />
      </p>
    </div>
  );
};

export default SupportFooter;
