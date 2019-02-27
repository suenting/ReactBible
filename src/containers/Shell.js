import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Book from '../components/Book'
import Navigation from '../components/Navigation'

class Shell extends React.Component {
    state = {
        drawer: false,
    };

    toggleDrawer = () => {
        this.setState({ drawer: !this.state.drawer });
    };

    render() {
        const { actions, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: this.state.drawer,
                            [classes[`appBarShift-left`]]: this.state.drawer,
                        })}
                    >
                        <Toolbar disableGutters={!this.state.drawer}>
                            <MenuIcon className={classes.menuButton} onClick={this.toggleDrawer} />
                            <Typography variant="title" color="inherit" noWrap>
                                React Bible
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.fixed}
                        variant="persistent"
                        anchor="left"
                        open={this.state.drawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                    <div className={classes.drawerHeader}>
                    <ChevronLeftIcon className={classNames(classes.menuButton)} onClick={this.toggleDrawer} />                  
                    </div>
                    <Navigation actions={actions} />
                    </Drawer>
                    <main
                        className={classNames(classes.content, 
                            classes[`content-left`], {
                            [classes.contentShift]: this.state.drawer,
                            [classes[`contentShift-left`]]: this.state.drawer,
                        })}
                    >
                    <div className={classes.drawerHeader}></div>
                    <Book actions={actions} />
                    </main>
                </div>
            </div>
        );
    }
}

Shell.propTypes = {
    actions: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const drawerWidth = 300;

const styles = theme => ({
    sectionTitle: {
        padding: '1em 1em 0em 1em'
    },
    fixed:{
        position: 'fixed',
        width: '0px'
    },
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'fixed',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: drawerWidth,
    },
    plain:{
        textDecoration:"none"
    }
});

export default withStyles(styles, { withTheme: true })(Shell);