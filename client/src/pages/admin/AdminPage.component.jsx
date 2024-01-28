import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { EventsList, UsersList, PartnersList } from '../../components/containers';

const AdminPage = () => {
    return (
        <div style={{backgroundColor: "aliceblue", height: "90vh"}}>
            <Tabs style={{display: "flex", alignItems: "center", borderRadius:"15px"}} unmountOnExit >
            <Tab eventKey="events" title="Events">
                < EventsList />
            </Tab>
            <Tab eventKey="users" title="Users" unmountOnExit >
                < UsersList />
            </Tab>
            <Tab eventKey="partners" title="Partners" unmountOnExit>
                < PartnersList />
            </Tab>

            </Tabs>
        </div>
    );
};

export default AdminPage;
