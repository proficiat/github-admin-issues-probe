import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import styles from './styles.css';

const {Grid, Row, Col} = require('react-flexbox-grid');

const { string, arrayOf, number, object, func, bool} = PropTypes;
const propTypes = {
    username: string.isRequired,
    updateInProcess: bool.isRequired,
    repositoryList: arrayOf(object.isRequired).isRequired,
    repositoryOwnerData: object.isRequired,
    onChangeRepositoryOwner: func.isRequired,
    onSelectRepository: func.isRequired,
    issuesUpdatingList: arrayOf(number).isRequired,
};

class RepoSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // value of SelectField
            value: null,
            repositoryOwner: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        const { onChangeRepositoryOwner } = this.props;
        const { repositoryOwner } = this.state;
        if (repositoryOwner === '') {
            this.setState({ repositoryOwner: nextProps.username});
            onChangeRepositoryOwner(nextProps.username);
        }
    }

    render() {
        const { repositoryList, updateInProcess, repositoryOwnerData, issuesUpdatingList } = this.props;
        const listNodes = repositoryList.map((repoObj, index) => {
            return (
                <MenuItem
                    primaryText={repoObj.name}
                    value={repoObj.name}
                    key={index}
                    secondaryText = {
                        <span style={{color: repoObj.open_issues > 0 ? '#17a88c' : '#c0c0c0'}}>
                            {repoObj.open_issues}
                        </span>
                    }
                />
            );
        });
        const { repositoryOwner, value } = this.state;
        return (
                <Row className={styles['rowStyle']}>
                    <Col sm={2}>
                        {repositoryOwnerData &&
                            <Avatar
                                style={{marginTop: '1.4rem', marginLeft: '.5rem'}}
                                src={repositoryOwnerData.avatar_url} />
                        }
                    </Col>
                    <Col sm={10} style={{padding: 0}}>
                        <TextField
                            disabled={updateInProcess || issuesUpdatingList.length > 0}
                            value={repositoryOwner}
                            hintText="Select repository owner"
                            floatingLabelText="Select repository owner"
                            floatingLabelStyle={{color: '#3fb0ac'}}
                            underlineStyle={{borderColor: '#173e43'}}
                            underlineFocusStyle={{borderColor: '#3fb0ac' }}
                            fullWidth={true}
                            onChange={this.handleChangeTextField}
                            onKeyDown={this.handleEnterKeyDownTxtFld}
                        />
                    </Col>

                    <Col sm={10} smOffset={2} style={{padding: 0}}>
                        <SelectField
                            disabled={updateInProcess || issuesUpdatingList.length > 0}
                            value={value}
                            floatingLabelText="Select the repository"
                            floatingLabelStyle={{color: '#3fb0ac'}}
                            underlineStyle={{borderColor: '#173e43'}}

                            fullWidth={true}
                            onChange={this.handleChangeSelectField}
                         >
                            {listNodes}
                        </SelectField>
                    </Col>
                </Row>
        );
    }

    // Select repository from SelectField
    handleChangeSelectField = (event, index, value) => {
        const { onSelectRepository } = this.props;
        this.setState({value});
        onSelectRepository(value);
    };

    handleChangeTextField = (e) => {
        this.setState({
            repositoryOwner: e.target.value,
        });
    }

    handleEnterKeyDownTxtFld = (e) => {
        const { onChangeRepositoryOwner } = this.props;
        const { repositoryOwner } = this.state;
        // if pressed Enter
        if(e.keyCode == 13) {
            onChangeRepositoryOwner(repositoryOwner);
        }
    }
}


RepoSelector.propTypes = propTypes;

export default RepoSelector;
