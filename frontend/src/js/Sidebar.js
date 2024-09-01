import React, { useState } from "react";

import SideNav, {
    Toggle,
    NavItem,
    NavIcon,
    NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import './Sidebar.css';

export default function Sidebar() {
    const [accounts, setAccounts] = useState(["example1@outlook.com", "example2@gmail.com", "long.email.example@outlook.com"]);
    const [folders, setFolders] = useState(["Folder 1", "Folder 2"]);

    const addAccount = (account) => {
        setAccounts([...accounts, account]);
    };

    const removeAccount = (account) => {
        setAccounts(accounts.filter(a => a !== account));
    };

    const addFolder = (folder) => {
        setFolders([...folders, folder]);
    };

    const removeFolder = (folder) => {
        setFolders(folders.filter(f => f !== folder));
    };

    return <SideNav className="sidebar-custom" onSelect={(selected) => { console.log(selected); }}>
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
                    <NavItem key={index} eventKey={`folders/${folder}`}>
                        <NavText style={{ fontSize: '1.4em', paddingLeft: '20px' }}>
                            {folder}
                        </NavText>
                    </NavItem>
                ))}
            </NavItem>
        </SideNav.Nav>
    </SideNav>
}