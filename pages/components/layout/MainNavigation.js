'use client'

import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import Link from "next/link";
// import FavoritesContext from "../../store/favorites-context";

export default function MainNavigation() {
//   const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>World Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/allmeetups">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">New Meetup</Link>
          </li>
          {/* <li>
            <Link to="/favorites">
              Favorite Meetups
              <span className={classes.badge}>{favoritesCtx.totalFavorites}</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
