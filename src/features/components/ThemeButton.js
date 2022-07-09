import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../PrimaryStyles.js';
import { toggleTheme } from '../../store/themeSlice.js';

const ThemeButton = ( {onToggleThemePressed, children} ) => {
    return (
        <Button onClick = {onToggleThemePressed}>{children}</Button>
    );
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onToggleThemePressed: () => dispatch(toggleTheme()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeButton);