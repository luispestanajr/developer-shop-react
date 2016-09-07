import React, { Component } from 'react';
import GitHubMembers from './githubmembers';
import Config from '../config/config';

class MemberList extends Component {

    constructor() {
        super();

        this.state = {
            hasResults: false,
            members: []
        };
    }

    componentWillMount() {

        this._fetchMembers();
    }

    render() {

        return (
                <div className="row">
                    <div className="col-md-12">
                        <h3>GitHub's member list</h3>
                        <div className="row">
                            <div className="col-md-12 table-responsive">
                                {this.state.hasResults ? <GitHubMembers list={this.state.members} addCartItem={this._addCartItem.bind(this)} /> : <h3>No members found</h3>}
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    _addCartItem(member){

        if(typeof this.props.addCartItem === "function")
            this.props.addCartItem(member);
    }

    _fetchMembers() {

        jQuery.ajax({
            method: 'GET',
            url: `${Config._urlGitHub}/orgs/vtex/members?client_id=${Config._clientId}&client_secret=${Config._clientSecretKey}`,
            success: (members) => {

                for(let i = 0; i < members.length; i++){

                    this._getMemberDetail(members[i]);
                }

                this.setState({hasResults: members.length > 0});
            }
        });
    }

    _getMemberDetail(member){

        jQuery.ajax({
            method: 'GET',
            url: `${Config._urlGitHub}/users/${member.login}?client_id=${Config._clientId}&client_secret=${Config._clientSecretKey}`,
            success: (memberDetail) => {


                this.setState( { members: this.state.members.concat({
                                                                        id: member.id
                                                                        ,login: memberDetail.login
                                                                        ,name: memberDetail.name
                                                                        ,company: memberDetail.company
                                                                        ,blog: memberDetail.blog
                                                                        ,location: memberDetail.location
                                                                        ,email: memberDetail.email
                                                                        ,avatar_url: memberDetail.avatar_url
                                                                        ,price: this._calcMemberPrice(memberDetail.followers, memberDetail.public_repos)
                                                                        ,hours: 1
                                                                    }) } );
            }
        });
    }

    _calcMemberPrice(numFollowers, numRepos) {

        var priceFollowers = numFollowers * 0.10;
        var priceRepos = numRepos * 1.50;

        return (priceFollowers + priceRepos).toFixed(2);
    }
}

export default MemberList;
