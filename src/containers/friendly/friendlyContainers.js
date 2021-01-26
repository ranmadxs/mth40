import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Container} from '@material-ui/core';

const FriendlyContainer = (props) => {
    const {
    } = props;


    return (
        <Container maxWidth="lg">
          Hola desde el container del component
        </Container>
    );
};

FriendlyContainer.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendlyContainer);