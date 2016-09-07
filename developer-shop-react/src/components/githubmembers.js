import React, {Component} from 'react';
import './githubmembers.css';

class GitHubMembers extends Component {

    constructor() {
        super();

        this.state = {};
    }

    componentDidUpdate() {

        jQuery(this.refs.tooltip).tooltip();
    }

    render() {

        return (
                <div>
                    <table className="table table-hover table-bordered table-striped table-condensed tableMembers">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Avatar</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.list.map((member, i) => (
                                    <tr key={member.id}>
                                        <td className="right width100">{member.id}</td>
                                        <td>{member.name}</td>
                                        <td style={{width: "60px"}}><img src={member.avatar_url} alt={member.login} width="60px" /></td>
                                        <td className="right width100">$ {member.price}</td>
                                        <td className="action">
                                            <button ref="tooltip" className="btn btn-primary"
                                                    data-toggle="tooltip"
                                                    title="Click to Add this item to Cart"
                                                    onClick={() => this._addToCart(member)}>Add to Cart</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
        );
    }

    _addToCart(member){

        if(typeof this.props.addCartItem === "function")
            this.props.addCartItem(member);
    }
}

export default GitHubMembers;