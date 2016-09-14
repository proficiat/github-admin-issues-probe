import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';

import CommunicationComment from 'material-ui/svg-icons/communication/comment';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';

const {Grid, Row, Col} = require('react-flexbox-grid');

const {arrayOf, shape, object, bool, string, func} = PropTypes;
const propTypes = {
    currentIssue: object.isRequired,
    labelsList: arrayOf(shape({
        name: string.isRequired,
        color: string.isRequired,
    })).isRequired,
    permission: bool.isRequired,
    onRemoveOrAddLabelFromAnIssue: func.isRequired,
};

const defaultProps = {
    currentIssue: {},
    labelsList: [],
};

class IssueHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueMultiple: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        const { labelsList, currentIssue } = nextProps;
        if (Object.keys(labelsList).length >= 0 &&
            Object.keys(currentIssue.labels).length >= 0) {
            let array = labelsList.map((label, index) => {
                let result;
                currentIssue.labels.forEach(labelInIssue => {
                    if (label.name === labelInIssue.name) {
                        result = index;
                    }
                });
                return result;
            });
            this.setState({valueMultiple: array});
        }
    }


    render() {
        const { currentIssue, labelsList, permission } = this.props;
        const styles = {
            button: {
                backgroundColor: currentIssue.state === 'open' ? '#17a88c' : '#e74c3c',
                color: 'white'
            }
        }

        return (
            <div style={{padding: '0px 16px 16px 16px'}}>
                <Row>
                    <Col sm={11}>
                        <h2>{currentIssue.title.toUpperCase()}</h2>
                    </Col>
                    <Col sm={1}>
                        <IconMenu
                            value={this.state.valueMultiple}
                            iconButtonElement={
                                <IconButton tooltip="labels">
                                    <ContentFilter />
                                </IconButton>
                            }
                            onChange={this.handleChangeMultiple}
                            multiple={true}
                            onItemTouchTap={this.handleOnItemTouchTap}
                            style={{marginTop: '.77em'}}
                        >
                            {labelsList.map((label, index) => {
                                return (
                                    <MenuItem
                                        leftIcon={
                                            _.includes(this.state.valueMultiple, index) ?
                                            <ToggleCheckBox /> :
                                            <ToggleCheckBoxOutlineBlank />
                                        }
                                        primaryText={label.name}
                                        value={index}
                                        key={index}
                                        disabled={!permission}
                                    />
                                );
                            })}
                        </IconMenu>
                    </Col>
                </Row>
                <FlatButton
                    label={currentIssue.state}
                    icon={<AlertErrorOutline />}
                    style={styles.button}
                    disabled={true}
                    primary={true}
                />
                {currentIssue.comments > 0 &&
                    <FlatButton
                        label={currentIssue.comments}
                        icon={<CommunicationComment />}
                        disabled={true}
                        primary={true}
                    />
                }
            </div>

        );
    }

    handleOnItemTouchTap = (e, child) => {
        const { onRemoveOrAddLabelFromAnIssue, currentIssue } = this.props;
        const name = child.props.primaryText;
        const number = child.key;
        onRemoveOrAddLabelFromAnIssue(currentIssue.number, name);
    }

    handleChangeMultiple = (event, value) => {
        this.setState({
            valueMultiple: value,
        });
    };
}

IssueHeader.propTypes = propTypes;
IssueHeader.defaultProps = defaultProps;

export default IssueHeader;
