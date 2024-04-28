import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <Link href={"/"}>
        <h1>Shop routing</h1>
      </Link>
    </header>
  );
};

export default Header;
