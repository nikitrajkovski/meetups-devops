import NewMeetupForm from "./components/meetups/NewMeetupForm";
import { useRouter } from 'next/navigation'

export default function NewMeetupPage() {
  const router = useRouter()

  function addMeetupHandler(meetupData) {
    fetch(
      "http://localhost:3000/api/meetups",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
        router.push('/')
    });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}
