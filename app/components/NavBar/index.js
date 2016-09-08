import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';


const customContentStyle = {
    width: '340px',
    maxWidth: 'none',
    textAlign: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch'
};

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: !this.props.signStatus,
            errorMessage: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: !nextProps.signStatus,
            errorMessage: '',
        });
    }

    render() {
        const styles = {
            title: {
                cursor: 'pointer'
            },
            errorMessage: {
                color: '#e74c3c'
            },
        };

        const actions = [
            <FlatButton
                label="Sign in"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSignIn}
            />,
        ];
        const { userData } = this.props;
        return (
            <div>
                <AppBar
                    showMenuIconButton={true}
                    title={
                        <span style={styles.title}>
                            {(Object.keys(userData).length !== 0) ?
                                userData.login : "Issues Probe Application"}
                        </span>
                    }
                    zDepth={2}
                    iconElementRight={
                        <FlatButton
                            label="Sign out"
                            onClick={this.handleSignOut}
                        />
                    }
                    iconElementLeft={
                        <Avatar src={userData.avatar_url}/>
                    }
                >
                </AppBar>

                <Dialog
                    title="Sign in to GitHub"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    contentStyle={customContentStyle}
                    onRequestClose={this.handleClose}
                >
                    <h4 style={styles.errorMessage}>
                        {this.state.errorMessage}
                    </h4>
                    <TextField
                        hintText="username"
                        floatingLabelText="Enter your username"
                        ref={me => this.usernameField = me}
                    />
                    <br/>
                    <TextField
                        hintText="Password"
                        floatingLabelText="Enter your password"
                        type="password"
                        ref={me => this.passwordField = me}
                    />
                </Dialog>
            </div>
        );
    }

    handleSignOut = () => {
        const { onSignOut } = this.props;
        onSignOut();
    }

    handleSignIn = () => {
        const { onSignIn } = this.props;
        const { errorMessage, open } = this.state;
        const username = this.usernameField.getValue();
        const password = this.passwordField.getValue();

        onSignIn(username, password)
            .catch (err => this.setState({errorMessage: err.message}));
    }
}

const { bool, func } = PropTypes;
NavBar.propTypes = {
    signStatus: bool.isRequired,
    onSignIn: func.isRequired,
    onSignOut: func.isRequired,
}
