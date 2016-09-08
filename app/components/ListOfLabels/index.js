import React, { Component, PropTypes } from 'react';
import LabelListItem from 'components/LabelListItem';
import styles from './styles.css';

export default class ListOfLabels extends Component {

    render() {
        const { labelsList, handleDeleteLabel, handleUpdateLabel } = this.props;
        const labelsNode = labelsList.map((label, index) => {
            return (
                <LabelListItem
                    label={label}
                    key={index}
                    id={index}
                    handleDeleteLabel={handleDeleteLabel}
                    handleUpdateLabel={handleUpdateLabel}
                />
            );
        });

        return (
            <ul className={styles['label-list']}>
                {labelsNode}
            </ul>
        );
    }
}

const { array, func} = PropTypes;
ListOfLabels.propTypes = {
    labelsList: array.isRequired,
    handleDeleteLabel: func.isRequired,
    handleUpdateLabel: func.isRequired,
};
