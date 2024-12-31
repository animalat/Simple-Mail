import React, { useEffect, useState } from "react";
import SideNav, {
    Toggle,
    NavItem,
    NavIcon,
    NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css';
import getGroups from "../../services/GroupService";

const Sidebar = ({ emailAddress, groupId, onGroupClick }) => {
    // Store accounts and folders in state
    const [accounts, setAccounts] = useState(["example1@outlook.com", "example2@gmail.com", "long.email.example@outlook.com"]);

    const [folders, setFolders] = useState([]);
    useEffect(() => {
        getGroups(emailAddress).then((data) => setFolders(data));
    }, [emailAddress]);

    return (
        <SideNav 
            className="sidebar-custom"
            onToggle={() => {}}
        >
            <SideNav.Toggle />
            <SideNav.Nav>
                <NavItem eventKey="accounts" expanded={true}>
                    <NavIcon>
                        <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText style={{ fontSize: '1.4em' }}>
                        Accounts
                    </NavText>

                    {accounts.map((account, index) => (
                        <NavItem key={index} eventKey={`accounts/${account}`}>
                            <NavText style={{ fontSize: '1.4em', paddingLeft: '20px' }}>
                                {account}
                            </NavText>
                        </NavItem>
                    ))}
                </NavItem>
                
                <NavItem eventKey="folders" expanded={true}>
                    <NavIcon>
                        <i className="fas fa-folder" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText style={{ fontSize: '1.4em' }}>
                        Folders
                    </NavText>

                    {folders.map((folder, index) => (
                        <NavItem 
                            className={`folder-item ${groupId == folder.group_id ? 'selected' : ''}`}
                            key={index} 
                            eventKey={`folders/${folder.name}`}
                            onSelect={ () => { onGroupClick(folder.group_id) }}
                        >
                            <NavText style={{ fontSize: '1.4em', paddingLeft: '20px' }}>
                                {folder.name}
                            </NavText>
                        </NavItem>
                    ))}
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};

export default Sidebar;