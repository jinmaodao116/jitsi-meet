/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Toolbox } from '../../toolbox';

/**
 * Implements a React {@link Component} which represents the filmstrip on
 * Web/React.
 *
 * @extends Component
 */
class Filmstrip extends Component {
    static propTypes = {
        /**
         * Whether or not the remote videos should be visible. Will toggle
         * a class for hiding the videos.
         */
        _remoteVideosVisible: React.PropTypes.bool,

        /**
         * Whether or not the toolbox should be displayed within the filmstrip.
         */
        displayToolbox: React.PropTypes.bool
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        /**
         * Note: Appending of {@code RemoteVideo} views is handled through
         * VideoLayout. The views do not get blown away on render() because
         * ReactDOMComponent is only aware of the given JSX and not new appended
         * DOM. As such, when updateDOMProperties gets called, only attributes
         * will get updated without replacing the DOM. If the known DOM gets
         * modified, then the views will get blown away.
         */

        const filmstripClassNames = `filmstrip ${this.props._remoteVideosVisible
            ? '' : 'hide-videos'}`;

        return (
            <div className = { filmstripClassNames }>
                { this.props.displayToolbox ? <Toolbox /> : null }
                <div
                    className = 'filmstrip__videos'
                    id = 'remoteVideos'>
                    <div
                        className = 'filmstrip__videos'
                        id = 'filmstripLocalVideo'>
                        <span
                            className = 'videocontainer'
                            id = 'localVideoContainer'>
                            <div className = 'videocontainer__background' />
                            <span id = 'localVideoWrapper' />
                            <audio
                                autoPlay = { true }
                                id = 'localAudio'
                                muted = { true } />
                            <div className = 'videocontainer__toolbar' />
                            <div className = 'videocontainer__toptoolbar' />
                            <div className = 'videocontainer__hoverOverlay' />
                            <div className = 'displayNameContainer' />
                            <div className = 'avatar-container' />
                        </span>
                    </div>
                    <div
                        className = 'filmstrip__videos'
                        id = 'filmstripRemoteVideos'>
                        {/**
                          * This extra video container is needed for scrolling
                          * thumbnails in Firefox; otherwise, the flex
                          * thumbnails resize instead of causing overflow.
                          */}
                        <div
                            className = 'remote-videos-container'
                            id = 'filmstripRemoteVideosContainer' />
                    </div>
                    <audio
                        id = 'userJoined'
                        preload = 'auto'
                        src = 'sounds/joined.wav' />
                    <audio
                        id = 'userLeft'
                        preload = 'auto'
                        src = 'sounds/left.wav' />
                </div>
            </div>
        );
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code Filmstrip}'s props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _remoteVideosVisible: boolean
 * }}
 */
function _mapStateToProps(state) {
    const { remoteVideosVisible } = state['features/filmstrip'];
    const { disable1On1Mode } = state['features/base/config'];

    return {
        _remoteVideosVisible: Boolean(remoteVideosVisible || disable1On1Mode)
    };
}

export default connect(_mapStateToProps)(Filmstrip);
