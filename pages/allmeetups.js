'use client'

import MeetupList from "./components/meetups/MeetupList.js";
import {useState, useEffect} from "react";

export default function AllMeetupsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadedMeetups] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            "http://localhost:3000/api/meetups"
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // Assuming the "_id" should be used as the key
                const meetups = {};
                data.forEach((meetup) => {
                    const key = meetup._id; // Use the _id from the data
                    meetups[key] = {
                        address: meetup.address,
                        description: meetup.description,
                        image: meetup.image,
                        title: meetup.title
                    };
                });
                setIsLoading(false);
                setLoadedMeetups(meetups);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading</p>
            </section>
        );
    } else {
        return (
            <section>
                <h1>All Meetups</h1>
                <MeetupList meetups={Object.values(loadedMeetups)}/>
            </section>
        )
    }
}
