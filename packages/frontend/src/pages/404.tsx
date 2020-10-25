import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-md w-full items-center mx-auto">
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
          Page not found.
        </h2>
        <p className="my-4 text-gray-900">
          The page you're looking could not be found.
        </p>
        <Link className="underline" to="/">
          Go back home
        </Link>
      </div>
    </div>
  );
}
