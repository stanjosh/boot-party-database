import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { EventList, UsersList, PartnersList } from '../../pageElements';

const AdminPage = () => {
    return (
        <div style={{backgroundColor: "aliceblue"}}>
            <Tabs style={{display: "flex", alignItems: "center", borderRadius:"15px"}}>
            <Tab eventKey="events" title="Events">
                < EventList />
            </Tab>
            <Tab eventKey="users" title="Users">
                < UsersList />
            </Tab>
            <Tab eventKey="partners" title="Partners">
                < PartnersList />
            </Tab>

            </Tabs>
        </div>
    );
};

export default AdminPage;
