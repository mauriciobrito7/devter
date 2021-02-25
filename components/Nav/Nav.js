import React from "react";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";
import Link from "next/link";
import Create from "components/Icons/Create";
import { colors } from "../../styles/theme";

export const Nav = () => {
  return (
    <>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        {/* <Link href="/compose/tweet">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link> */}
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
      <style jsx>{`
        nav {
          background: #fff;
          bottom: -2px;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  );
};
