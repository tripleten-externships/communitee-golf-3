import logo from "../../assets/communitee-logo.png";
import exit from "../../assets/exit.png";
import signout from "../../assets/sign-out.png";
import { useAuth } from "../../hooks/useAuth";

interface HeaderProps {
  handleExitClick: () => void;
  handleSignoutClick: () => void;
  isLoggedIn: boolean;
}

function Header({
  handleExitClick,
  handleSignoutClick,
  isLoggedIn,
}: HeaderProps) {
  const { handleLogoClick } = useAuth();
  return (
    <header className="w-[336px] flex space-x-[48px] my-5 mx-5">
      <button
        className="button__signout"
        onClick={(e) => {
          e.preventDefault();
          handleSignoutClick();
        }}
        disabled={!isLoggedIn}
      >
        <img
          src={signout}
          alt="Sign Out"
          className={`${isLoggedIn ? "visible" : "invisible"}`}
        />
      </button>
      <img
        src={logo}
        alt="Communitee Golf Logo"
        className="w-[152px] h-[20px] cursor-pointer"
        onClick={handleLogoClick}
      />
      <button
        className="button__exit"
        onClick={(e) => {
          e.preventDefault();
          handleExitClick();
        }}
      >
        <img src={exit} alt="exit" className="" />
      </button>
    </header>
  );
}

export default Header;
