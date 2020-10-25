import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../ui/Button";
const Hero = () => {
  const history = useHistory();
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold underline">
        Slip<span className="text-blue-600">Slap</span>
      </h1>
      <h2 className="text-4xl">Getting bored of tradition agile?</h2>
      <p className="text-gray-600 text-2xl mb-4">
        Teach, learn, and gamify industry leading agile practices with SlipSlap!
      </p>
      <Button
        className="bg-blue-600 p-4 m-auto rounded-full"
        onClick={() => history.push("/auth/signup")}
      >
        Try now for free
      </Button>
    </div>
  );
};

export default Hero;
