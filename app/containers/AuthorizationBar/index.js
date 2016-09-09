import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getUserName, getUserData, getUserSignStatus } from './selectors';
import { getStatusOfUpdating } from 'containers/RepoDataLoader/selectors';
import NavBar from 'components/NavBar';


class AuthorizationBar extends Component {

    render() {
        const { userData, signStatus, updateInProcess } = this.props;
        return (
            <NavBar
                userData={userData}
                signStatus={signStatus}
                updateInProcess={updateInProcess}
                onSignIn={this.handleSignIn}
                onSignOut={this.handleSignOut}
            />
        );
    }

    handleSignIn = (username, password) => {
        const { onSignInAction } = this.props;
        return onSignInAction(username, password);

    }

    handleSignOut = () => {
        const { signOutAction } = this.props;
        signOutAction();
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
    username: getUserName(),
    userData: getUserData(),
    signStatus: getUserSignStatus(),
    updateInProcess: getStatusOfUpdating(),
});

AuthorizationBar.defaultProps = {
    userData: {},
    username: '',
    signStatus: false
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationBar);
