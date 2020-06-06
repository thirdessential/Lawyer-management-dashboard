import * as actionTypes from './ActionTypes';
import config from './../config';
import { getPersistedState } from './persist';

const initialState = {
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config,
    isFullScreen: false, // static can't change,
    //Auth 
    user:getPersistedState('user') || null,
    //Add Target Modal
    targetModal :false,
    timer : getPersistedState('timer') || 0 ,
    toaster: {
        msg:null,
        timeout:0
    }
};

let intervalId ;

const reducer = (state = initialState, action) => {
    let trigger = [];
    let open = [];

    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
            return {
                ...state,
                collapseMenu: !state.collapseMenu
            };
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.isOpen;
                const triggerIndex = (state.isTrigger).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return {
                ...state,
                isOpen: open,
                isTrigger: trigger
            };
        case actionTypes.NAV_CONTENT_LEAVE:
            return {
                ...state,
                isOpen: open,
                isTrigger: trigger,
            };
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.isOpen;
                trigger = state.isTrigger;

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger,
                };
            }
            return {...state};
        case actionTypes.FULL_SCREEN :
            return {
                ...state,
                isFullScreen: !state.isFullScreen
            };
        case actionTypes.FULL_SCREEN_EXIT:
            return {
                ...state,
                isFullScreen: false
            };
        case actionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layout: action.layout
            };
        case actionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                user:action.payload
            }
        case actionTypes.TOGGLE_ADD_TARGET_MODAL:
            return {
                    ...state,
                    targetModal:!state.targetModal
            }
        case actionTypes.UPDATE_TIMER:{
            return {
                ...state,
                timer:state.timer++
            }
        }
        case actionTypes.RESET_TIMER:{
            return {
                ...state,
                timer : 0
            }
        }
        case actionTypes.SET_TIMER:{
            return {
                ...state,
                timer : action.payload
            }
        }
        case actionTypes.TOGGLE_TOASTER:{
            return {
                ...state,
                toaster:{
                    msg:action.payload.msg,
                    timeout:action.payload.timeout
                }
            }
        }

        default:
            return state;
    }
};

export default reducer;