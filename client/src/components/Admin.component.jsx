
import { EventDisplay } from './pageElements';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../util/queries';


const Admin = () => {
  const { loading, error, data } = useQuery(QUERY_EVENTS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  console.log(data)
  return (
    <div style={{backgroundColor: "var(--alviesBlue)", width: "100%"}}>
      {data?.findAllEvents.map(event => (
        <EventDisplay eventData={event} key={event._id} />
      ))}
    </div>
  );
};
  
  export default Admin;