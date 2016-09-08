import React, {Component, PropTypes} from 'react';
import ListLabelsHeader from 'components/ListLabelsHeader';
import ListOfLabels from 'components/ListOfLabels';

const { string, array, bool, func } = PropTypes;
const propTypes = {
    username: string.isRequired,
    labelsList: array.isRequired,
    handleDeleteLabel: func.isRequired,
    handleUpdateLabel: func.isRequired,

    updateInProcess: bool.isRequired,
    handleCreateLabel: func.isRequired,
};

class LabelTab extends Component {

    render() {
        const {
            username,
            labelsList,
            updateInProcess,
            handleCreateLabel,
            handleUpdateLabel,
            handleDeleteLabel,
        } = this.props;
        return (
            <div>
                <ListLabelsHeader
                    updateInProcess={updateInProcess}
                    handleCreateLabel={handleCreateLabel}
                />
                <ListOfLabels
                    username={username}
                    labelsList={labelsList}
                    handleUpdateLabel={handleUpdateLabel}
                    handleDeleteLabel={handleDeleteLabel}
                />
            </div>

        );
    }
}

LabelTab.propTypes = propTypes;

export default LabelTab;
