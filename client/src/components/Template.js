import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Template extends Component {

    render() {
        // Bringing in the logged in user!
        const { user } = this.props.auth;
        
        return (
            <p>Hi {user.name}! This is a template page for project components!</p>
        );
    }
}

// REDUX Stuff - to make sure you have access to the logged in user!!
Template.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Template);

// Update "Template" with the name of your component.