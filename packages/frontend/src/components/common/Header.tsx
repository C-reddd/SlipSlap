import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useHasUser } from "../../store/userStore";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

const Header = () => {
  const history = useHistory();
  const hasUser = useHasUser();
  return !hasUser ? (
    <div className="bg-white ">
      <div className="container mx-auto">
        <nav className="flex items-center ">
          <div>
            <Link to="/">
              <Logo className="w-20 h-20" />
            </Link>
          </div>
          <div className="flex items-center justify-between ml-auto">
            <Button
              type="button"
              onClick={() => history.push("/auth/signin")}
              className="py-2 px-4 mx-2 text-blue-600 hover:underline rounded-full"
            >
              Login
            </Button>
            <Button
              onClick={() => history.push("/auth/signup")}
              className="py-2 px-4  text-xs md:text-base bg-blue-600  hover:bg-blue-700 rounded-full"
            >
              Sign up
            </Button>
          </div>
        </nav>
      </div>
    </div>
  ) : (
    <div className="bg-white ">
      <div className="container mx-auto">
        <nav className="flex items-center ">
          <div>
            <Link to="/">
              <Logo className="w-20 h-20" />
            </Link>
          </div>
          <div className="flex items-center justify-between ml-auto">
            <Button className="py-2 px-4  text-xs md:text-base bg-blue-600  hover:bg-blue-700 rounded-full">
              Log out
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
