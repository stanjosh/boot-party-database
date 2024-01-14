import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { EventList, UsersList } from '../../pageElements';

const AdminPage = () => {
    return (
        <div>
            <Tabs>
            <Tab eventKey="events" title="Events">
                < EventList />
            </Tab>
            <Tab eventKey="users" title="Users">
                < UsersList />
            </Tab>
            <Tab eventKey="partners" title="Partners">
                <h1> Partners </h1>
            </Tab>

                </Tabs>
        </div>
    );
};

export default AdminPage;
