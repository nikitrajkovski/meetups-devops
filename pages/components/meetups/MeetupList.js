'use client'

import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

export default function MeetupList(props) {
    console.log(props)
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <li key={meetup.id}>
          <MeetupItem
            id={meetup.id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
            desc={meetup.desc}
          />
        </li>
      ))}
    </ul>
  );
}
