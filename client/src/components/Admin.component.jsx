import { Link } from 'react-router-dom';
import { EventDisplay } from './pageElements';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../util/queries';


const Admin = () => {
  const { loading, error, data } = useQuery(QUERY_EVENTS);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{backgroundColor: "var(--alviesBlue)", width: "100%"}}>
      {data?.findAllEvents.map(event => (
        <Link key={event._id} to={`/admin/${event._id}`} style={{ textDecoration: "none"}}>
          <EventDisplay eventData={event}  />
        </Link>
      ))}
    </div>
  );
};
  
  export default Admin;