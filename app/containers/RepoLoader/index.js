import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import { getRepoList, getSelectedRepo } from './selectors';
import { getUserName, getPassword } from 'containers/AuthorizationBar/selectors';
import ListOfRepos from 'components/ListOfRepos';
let api = require("../../api/restUtilities.js");


class RepoLoader extends Component {

  componentWillReceiveProps(nextProps) {
    const { username, password } = nextProps;
    console.log(username);
    if (username !== this.props.username) {
      api.fetchListYourRepositories(username, password)
        .then(res =>{
          if(res.status !== 200) {
            throw Error('Bad validation');
          }
          return res.json();
        })
        .then(res => {
          const { loadRepoListAction } = this.props;
          loadRepoListAction(res);
      }).catch(error => console.log(error));
    }
  }
  render() {
    const { repoList, selectRepoAction } = this.props;
    return (
      <ListOfRepos
        repoList={repoList}
        selectRepoAction={selectRepoAction}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const mapStateToProps = createStructuredSelector({
  username: getUserName(),
  password: getPassword(),
  repoList: getRepoList(),
  selectedRepo:getSelectedRepo(),
});

RepoLoader.defaultProps = {
  repoList: [],
  selectedRepo: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoLoader);