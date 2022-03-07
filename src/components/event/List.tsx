import { useState, useEffect } from "react";
import moment from "moment";

import Item from "./Item";

import { events } from "../../data/events";

interface IEvent {
  title: string;
  description: string;
  time: string;
}

function List() {
  const [upcomingEvents, setUpcomingEvents] = useState<IEvent[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const sortedEventsList = events.map(event => {
    return { ...event, time: moment(event.time, ["h:mm A"]).format("HH:mm") };
  }).sort((a, b) => a.time.localeCompare(b.time))

  useEffect(() => {
    const interval = setInterval(
      () => {
        setUpcomingEvents(upcomingEvents => [sortedEventsList[currentItemIndex], ...upcomingEvents.slice(0, 4)]);
        setCurrentItemIndex((currentItemIndex + 1) % events.length);
      }, 5000);

    return () => clearInterval(interval);
  }, [currentItemIndex]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>Upcoming events and carnevals in Macedonia</div>
        <div className={styles.mobileTimeline}></div>
        <div className={styles.desktopTimeline}></div>
        <div className={styles.eventsContainer}>
          {upcomingEvents.map((event, idx) => {
            return (
              <div key={idx} className={styles.eventItem}>
                <Item
                  title={event.title}
                  description={event.description}
                  time={event.time}
                  isEven={idx % 2 === 0}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: "max-w-3xl min-w-sm relative md:mx-auto",
  header: "text-1xl sm:text-3xl font-bold text-blue-900 pb-3",
  eventsContainer: "items-center justify-center m-auto",
  mobileTimeline: "absolute w-1 h-screen bg-pink-200 sm:bg-transparent ml-1",
  desktopTimeline: "absolute w-1 h-screen sm:bg-gray-200 left-1/2",
  eventItem: "first:animate-bounce sm:odd:float-left sm:clear-both sm:even:float-right ml-2 mr-2",
};

export default List;
