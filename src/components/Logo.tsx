import LogoWhite from '@/assets/logo-white.svg';
import LogoDefault from '@/assets/logo.svg';

export const Logo = () => {
  return (
    <>
      <img src={LogoDefault} alt="Fatih Karatepe" className="block dark:hidden" />
      <img src={LogoWhite} alt="Fatih Karatepe" className="hidden dark:block" />
    </>
  );
};
