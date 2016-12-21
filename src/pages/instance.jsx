import React from 'react';
import { withRouter } from 'react-router';
import localStorage from 'local-storage-fallback';

import SessionStore from '../apps/Session/SessionStore';
import SessionActions from '../apps/Session/SessionActions';
import InstanceDialogActions from '../apps/Instances/InstanceDialogActions';
import GlobalConfigDialogActions from '../apps/GlobalConfig/GlobalConfigDialogActions';

import { Sidebar } from '../common/';
import HeaderInstancesDropdown from '../common/Header/HeaderInstancesDropdown';
import GlobalConfigDialog from '../apps/GlobalConfig/GlobalConfigDialog';
import DataObjectDialog from '../apps/DataObjects/DataObjectDialog';

const Instance = React.createClass({
  componentDidMount() {
    const { params } = this.props;

    if (params.instanceName) {
      localStorage.setItem('lastInstanceName', params.instanceName);
      SessionActions.fetchInstance(params.instanceName);
    }
  },

  render() {
    const { children } = this.props;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="row" style={{ display: 'flex', flex: 1 }}>
          <Sidebar>
            <HeaderInstancesDropdown />
            <div style={{ paddingTop: 56 }}>
              <Sidebar.List
                key="API Builder"
                subheader="API Builder"
              >
                <Sidebar.LinkListItem
                  key="Sockets Explorer"
                  routeName="sockets"
                  primaryText="Sockets Explorer"
                  iconClassName="synicon-hexagon-outline"
                  iconStyle={{ transform: 'rotate(30deg)' }}
                  data-e2e="left-sidebar-sockets"
                />
                <Sidebar.LinkListItem
                  key="Installed Sockets"
                  routeName="installed-sockets"
                  primaryText="Installed Sockets"
                  iconClassName="synicon-attachment"
                  data-e2e="left-sidebar-installed-sockets"
                />
              </Sidebar.List>
              <Sidebar.List
                key="Core Services"
                subheader="Core Services"
              >
                <Sidebar.LinkListItem
                  key="Users"
                  routeName="users"
                  data-e2e="left-sidebar-users"
                  iconClassName="synicon-account-multiple"
                  primaryText="Users & Groups"
                />
                <Sidebar.LinkListItem
                  key="Classes"
                  routeName="classes"
                  data-e2e="left-sidebar-classes"
                  iconClassName="synicon-layers"
                  primaryText="Data Classes"
                />
                <Sidebar.LinkListItem
                  key="Hosting"
                  routeName="hosting"
                  data-e2e="left-sidebar-hosting"
                  iconClassName="synicon-web"
                  primaryText="Hosting"
                />

                <Sidebar.LinkListItem
                  key="pushDevices"
                  routeName="all-push-notification-devices"
                  data-e2e="left-sidebar-all-push-notification-devices"
                  primaryText="Push Devices"
                  iconClassName="synicon-cellphone-iphone"
                  initiallyOpen={true}
                  autoGenerateNestedIndicator={false}
                />

                <Sidebar.LinkListItem
                  key="pushMessages"
                  routeName="all-push-notification-messages"
                  data-e2e="left-sidebar-all-push-notification-messages"
                  primaryText="Push Messages"
                  iconClassName="synicon-cellphone-iphone"
                  initiallyOpen={true}
                  autoGenerateNestedIndicator={false}
                />

              </Sidebar.List>
              <Sidebar.List
                key="Instance Settings"
                subheader="Instance Settings"
              >
                <Sidebar.ListItem
                  key="General Settings"
                  iconClassName="synicon-settings"
                  data-e2e="left-sidebar-synicon-settings"
                  primaryText="General Settings"
                  onTouchTap={() => InstanceDialogActions.showDialog(SessionStore.getInstance())}
                />
                <Sidebar.LinkListItem
                  key="backupAndRestore"
                  routeName="full-backups"
                  data-e2e="left-sidebar-full-backups"
                  iconClassName="synicon-backup-restore"
                  primaryText="Backup & Restore"
                />
                <Sidebar.LinkListItem
                  key="Administrators"
                  routeName="admins"
                  data-e2e="left-sidebar-admins"
                  iconClassName="synicon-account-star-variant"
                  primaryText="Administrators"
                />
                <Sidebar.ListItem
                  key="globalConfig"
                  iconClassName="synicon-earth"
                  data-e2e="left-sidebar-global-config"
                  primaryText="Global Config"
                  onTouchTap={GlobalConfigDialogActions.showDialog}
                />

              </Sidebar.List>
            </div>
          </Sidebar>
          <div
            className="col-flex-1"
            style={{ maxWidth: 'calc(100% - 256px)', display: 'flex', flexDirection: 'column' }}
          >
            {children}
          </div>
        </div>
        <GlobalConfigDialog />
        <DataObjectDialog />
      </div>
    );
  }
});

export default withRouter(Instance);
