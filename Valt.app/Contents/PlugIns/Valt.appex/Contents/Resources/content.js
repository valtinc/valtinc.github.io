/**
 * valt v1.0.4.
 * Copyright (c) 2017 Valt Inc. All rights reserved.
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BrowserName;
(function (BrowserName) {
    BrowserName["CHROME"] = "chrome";
    BrowserName["SAFARI"] = "safari";
    BrowserName["FIREFOX"] = "firefox";
})(BrowserName = exports.BrowserName || (exports.BrowserName = {}));
var BrowserPopup;
(function (BrowserPopup) {
    BrowserPopup[BrowserPopup["VALT_APP_DISCONNECTED"] = 0] = "VALT_APP_DISCONNECTED";
    BrowserPopup[BrowserPopup["NONE"] = 1] = "NONE";
})(BrowserPopup = exports.BrowserPopup || (exports.BrowserPopup = {}));

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Events sent to and from the mini-app.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Command;
(function (Command) {
    Command["LOCK_CHECK"] = "valt_lock_check";
    Command["LOCK_STATE"] = "valt_lock_state";
    Command["CREDS_SEARCH"] = "credentials_search";
    Command["CREDS_STORE"] = "credentials_store";
    Command["CREDS_COMMIT"] = "credentials_commit";
    Command["CREDS_ABORT"] = "credentials_abort";
    Command["CREDS_SUGGEST"] = "credentials_suggest";
    Command["CREDS_REQUEST"] = "request_credential";
    Command["CREDS_PROVIDE"] = "provide_credential";
    Command["EXT_ICON_CLICKED"] = "ext_icon_clicked";
    Command["NAVIGATE"] = "navigate";
    Command["GENERATE_PASSWORD"] = "generate_password";
    Command["INGRESS_PASSWORD"] = "ingress_password";
})(Command = exports.Command || (exports.Command = {}));

var LockUpdateEvent = function LockUpdateEvent(session, locked) {
    _classCallCheck(this, LockUpdateEvent);

    this.command = Command.LOCK_STATE;
    this.session = session;
    this.locked = locked;
};

exports.LockUpdateEvent = LockUpdateEvent;

var LockCheckEvent = function LockCheckEvent(session) {
    _classCallCheck(this, LockCheckEvent);

    this.command = Command.LOCK_CHECK;
    this.session = session;
};

exports.LockCheckEvent = LockCheckEvent;

var SearchEvent = function SearchEvent(site, session) {
    _classCallCheck(this, SearchEvent);

    this.command = Command.CREDS_SEARCH;
    this.site = site;
    this.session = session;
};

exports.SearchEvent = SearchEvent;

var SuggestEvent = function SuggestEvent(site, credentials, session, logInWithUUID) {
    _classCallCheck(this, SuggestEvent);

    this.command = Command.CREDS_SUGGEST;
    this.site = site;
    this.credentials = credentials;
    this.logInWithUUID = logInWithUUID;
    this.session = session;
};

exports.SuggestEvent = SuggestEvent;

var RequestEvent = function RequestEvent(uuid, session) {
    _classCallCheck(this, RequestEvent);

    this.command = Command.CREDS_REQUEST;
    this.uuid = uuid;
    this.session = session;
};

exports.RequestEvent = RequestEvent;

var ProvideEvent = function ProvideEvent(credential, session) {
    _classCallCheck(this, ProvideEvent);

    this.command = Command.CREDS_PROVIDE;
    this.credential = credential;
    this.session = session;
};

exports.ProvideEvent = ProvideEvent;

var StoreEvent = function StoreEvent(site, credential) {
    _classCallCheck(this, StoreEvent);

    this.command = Command.CREDS_STORE;
    this.site = site;
    this.credential = credential;
};

exports.StoreEvent = StoreEvent;

var CommitEvent = function CommitEvent() {
    _classCallCheck(this, CommitEvent);

    this.command = Command.CREDS_COMMIT;
};

exports.CommitEvent = CommitEvent;

var AbortEvent = function AbortEvent() {
    _classCallCheck(this, AbortEvent);

    this.command = Command.CREDS_ABORT;
};

exports.AbortEvent = AbortEvent;

var GeneratePasswordEvent = function GeneratePasswordEvent(valtUnlocked, session) {
    _classCallCheck(this, GeneratePasswordEvent);

    this.command = Command.GENERATE_PASSWORD;
    this.session = session;
    this.valtUnlocked = valtUnlocked;
};

exports.GeneratePasswordEvent = GeneratePasswordEvent;

var IngressPasswordEvent = function IngressPasswordEvent(password, valtUnlocked, session) {
    _classCallCheck(this, IngressPasswordEvent);

    this.command = Command.INGRESS_PASSWORD;
    this.password = password;
    this.valtUnlocked = valtUnlocked;
    this.session = session;
};

exports.IngressPasswordEvent = IngressPasswordEvent;

var UserInvokeEvent = function UserInvokeEvent(coords) {
    _classCallCheck(this, UserInvokeEvent);

    this.command = Command.EXT_ICON_CLICKED;
    this.coordinates = coords;
};

exports.UserInvokeEvent = UserInvokeEvent;

var NavEvent = function NavEvent(site, credentials) {
    _classCallCheck(this, NavEvent);

    this.command = Command.NAVIGATE;
    this.site = site;
    this.credentials = credentials;
};

exports.NavEvent = NavEvent;

},{}],3:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
var guess_1 = require("./formheuristics/guess");
var util_1 = require("./util");
var heuristic_1 = require("./formheuristics/heuristic");
var templates_1 = require("./templates");
var site_handler_1 = require("./site_handlers/site_handler");
var DROPDOWN_KEY = 'valt-autofill-dropdown';
var initialDelay = 50;
var maxDelay = 4000;
/**
 * Error signifying no relevant credentials were found.
 * @class
 * @implements Error
 */

var NoCredentialsError = function () {
    function NoCredentialsError() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, NoCredentialsError);

        this.name = "NoCredentialsError";
        this.message = message;
    }

    _createClass(NoCredentialsError, [{
        key: "toString",
        value: function toString() {
            return this.name + ": " + this.message;
        }
    }]);

    return NoCredentialsError;
}();
/**
 * Handles autofilling pages. Remember to call init().
 * Note: runs as a content script in window context.
 */


var Formfill = function () {
    function Formfill(browser) {
        var _this = this;

        _classCallCheck(this, Formfill);

        // stores callbacks for incoming events/makes returning Promise from sendRequest and sendSearch possible
        this.callbackMap = {};
        this.hasFilled = false;
        this.autofillers = [];
        this.dropdownTargeters = [];
        /**
         * Try to run autofill on this frame. If we fail, reschedule to try again with exponential backoff.
         * @param {number} initialDelay The initial delay on failure.
         * @param {number} maxDelay The maximum delay on failure.
         * @param {number} factor The backoff factor. 2 by default.
         * @returns {() => void} Returns a function that tries to run autofill.
         */
        this.scheduleAutofill = function (initialDelay, maxDelay) {
            var factor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2.0;

            return function () {
                if (_this.hasFilled) return;
                util_1.DebugLogger.debug("running autofill for frame: " + document.defaultView.location.href);
                _this.doAutofill().catch(function (err) {
                    if (err instanceof NoCredentialsError) return;
                    var delay = Math.min(initialDelay * factor, maxDelay);
                    setTimeout(_this.scheduleAutofill(delay, maxDelay, factor), delay);
                });
            };
        };
        this.getDropdown = function () {
            var dropdown = document.getElementById(DROPDOWN_KEY);
            if (dropdown) return dropdown;
            return createDropdown();
        };
        /**
         * Handle an event coming in from the background script.
         * @param {IncomingEvent} evt The received event.
         */
        this.handleEvt = function (evt) {
            util_1.DebugLogger.debug("received event with command: " + evt.command);
            switch (evt.command) {
                case events_1.Command.LOCK_STATE:
                    var lockStateEvent = evt;
                    _this.valtLocked = lockStateEvent.locked;
                    break;
                case events_1.Command.CREDS_SUGGEST:
                case events_1.Command.CREDS_PROVIDE:
                case events_1.Command.INGRESS_PASSWORD:
                    var expectedEvent = evt;
                    if (expectedEvent.session && expectedEvent.session != '') {
                        var cb = _this.callbackMap[expectedEvent.session];
                        if (cb) {
                            cb(expectedEvent);
                            delete _this.callbackMap[expectedEvent.session];
                        }
                    }
                    break;
                default:
                    throw new Error("unhandled event type '" + evt.command + "'");
            }
        };
        this.commitPendingItem = function () {
            try {
                var parentDomain = parent.document.domain;
            } catch (e) {
                // NOTE(andrew) If we can't access the domain, we shouldn't be
                // looking for confirmation of successfully logging in...
                return;
            }
            // TODO(andrew) Add some rich structured heuristics to this to determine
            // if the loaded page is something other than a login page...
            var credentialInputs = _this.inputForms();
            // NOTE(andrew) If we don't find any login forms, assume that we can
            // commit the pending item.
            if (credentialInputs.length == 0) {
                _this.comm.send(new events_1.CommitEvent());
            } else {
                _this.comm.send(new events_1.AbortEvent());
            }
        };
        /**
         * Handle a submit event from the page we're on.
         * @param {Event} event The event received.
         */
        this.handleSubmit = function (event) {
            if (!event.isTrusted) return;
            if (_this.shouldIgnore(event)) return;
            var inputs = formInputs(event.target);
            var usernameField = inputs[0];
            var passwordFields = inputs[1];
            // We can make sense of forms with 1, 2, or 3 password fields.
            if (passwordFields.length < 1 || passwordFields.length > 3) return;
            var username = usernameField ? usernameField.value : null;
            var password1 = passwordFields[0].value;
            if (passwordFields.length === 1) {
                _this.updatePassword(username, password1);
                return;
            }
            // Two password fields can indicate a new password with confirmation,
            // or a change password form that requires the current password.
            var password2 = passwordFields[2].value;
            if (passwordFields.length == 2) {
                if (password1 == password2) {
                    _this.updatePassword(username, password1);
                } else {
                    _this.updatePassword(username, password2);
                }
                return;
            }
            // Three password fields typically indicate a change password form
            // with one field for the current password and two for the new
            // password and confirmation.
            var password3 = passwordFields[3].value;
            if (password1 == password2 && password2 == password3) {
                _this.updatePassword(username, password1);
            } else if (password2 == password3) {
                _this.updatePassword(username, password2);
            } else if (password1 == password3) {
                _this.updatePassword(username, password1);
            } else if (password1 == password2) {
                _this.updatePassword(username, password1);
            }
            // The remaining case of three different passwords has no obvious
            // interpretation, so we ignore it.
        };
        this.sendGeneratePassword = function () {
            return new Promise(function (resolve) {
                var randomSessionKey = Math.random().toString();
                _this.callbackMap[randomSessionKey] = function (evt) {
                    if (evt.valtUnlocked) {
                        resolve(evt);
                    } else {
                        Promise.reject(new Error('Valt currently locked'));
                    }
                };
                var generatePasswordEvent = new events_1.GeneratePasswordEvent(!_this.valtLocked, randomSessionKey);
                _this.comm.generatePassword(generatePasswordEvent);
            });
        };
        this.sendSearch = function () {
            return new Promise(function (resolve) {
                var randomSessionKey = Math.random().toString();
                _this.callbackMap[randomSessionKey] = function (evt) {
                    resolve(evt);
                };
                _this.comm.send(new events_1.SearchEvent(window.location.href, randomSessionKey));
            });
        };
        this.sendRequest = function (uuid) {
            return new Promise(function (resolve) {
                var randomSessionKey = Math.random().toString();
                _this.callbackMap[randomSessionKey] = function (evt) {
                    resolve(evt);
                };
                _this.comm.send(new events_1.RequestEvent(uuid, randomSessionKey));
            });
        };
        this.sendSearchAndRequest = function () {
            return _this.sendSearch().then(function (evt) {
                if (evt.logInWithUUID) {
                    return _this.sendRequest(evt.logInWithUUID);
                }
                if (evt.credentials.length > 0) {
                    return _this.sendRequest(evt.credentials[0].uuid);
                } else {
                    throw new NoCredentialsError('No credentials were returned');
                }
            });
        };
        /**
         * Handle a click event, checking to see if we should create a dropdown.
         * @param {FocusEvent} evt Click event to check.
         */
        this.handleClick = function (evt) {
            if (!evt.isTrusted) return;
            if (_this.shouldIgnore(evt)) return;
            var dropdownTargets = util_1.flatten(_this.dropdownTargeters.map(function (t) {
                return t.dropdownTargets(document);
            }));
            var pwTarget = util_1.flatten(_this.dropdownTargeters.map(function (t) {
                return t.passwordSuggestTargets(document);
            }));
            var input = evt.target;
            // TODO: resolve behavior when we think the input should have a dropdown and a generated password
            var loginBundles = dropdownTargets.filter(function (bundle) {
                return bundle.dropdownTargets.some(function (elt) {
                    return elt === input;
                });
            });
            var passwordBundles = pwTarget.filter(function (bundle) {
                return bundle.clickFields.indexOf(input) >= 0;
            });
            var fillLogin = function fillLogin(bundle) {
                _this.sendSearch().then(function (evt) {
                    _this.showDropdown(bundle, evt.credentials);
                });
            };
            var pwDropdown = function pwDropdown(passwordField, fillElts) {
                if (passwordField.type.toLowerCase() !== 'password') return;
                _this.showDropdown({
                    passwordField: passwordField,
                    focusedInput: passwordField
                }, []);
                var dropdown = _this.getDropdown();
                var icon_url = _this.browser.getResourceUrl('dropdown-icon.png');
                _this.sendGeneratePassword().then(function (ingressPasswordEvent) {
                    var pass = ingressPasswordEvent.password;
                    var button = util_1.template(templates_1.default, 'suggest_password', {
                        img_src: icon_url,
                        password: pass
                    }).firstChild;
                    button.addEventListener('click', function () {
                        fillElts.forEach(function (elt) {
                            return fillInput(elt, pass);
                        });
                        _this.resetDropdown(dropdown);
                    });
                    dropdown.appendChild(button);
                }).catch(function (err) {
                    util_1.DebugLogger.log("Unable to generate password: " + err);
                });
            };
            if (loginBundles.length > 0) {
                var bndl = loginBundles[0];
                fillLogin({
                    usernameField: bndl.usernameField,
                    passwordField: bndl.passwordField,
                    focusedInput: input
                });
                return;
            }
            if (passwordBundles.length > 0) {
                pwDropdown(input, passwordBundles[0].fillFields);
                return;
            }
            if (!input || !/input/i.test(input.tagName)) return;
            if (!/text|email|password/i.test(input.type)) return;
            var fInputs = formInputs(input.form);
            var usernameField = fInputs[0];
            var passwordFields = fInputs[1];
            var passwordField = passwordFields[0];
            // Only show dropdown under the username field or any password field.
            if (input !== usernameField && input.type.toLowerCase() !== 'password') return;
            var bundle = {
                focusedInput: input,
                passwordField: passwordField,
                usernameField: usernameField
            };
            var result = guess_1.guessFormType(input.form);
            if (result === heuristic_1.FormResult.Login) {
                fillLogin(bundle);
            } else if (result === heuristic_1.FormResult.Signup) {
                pwDropdown(input, passwordFields);
            } else {
                return;
            }
        };
        /**
         * Automatically detect forms on the page and send a request to start filling them.
         */
        this.doAutofill = function () {
            // if we have autofillers registered for this site, run them before anything else.
            if (_this.autofillers.length > 0) {
                return _this.sendSearchAndRequest().then(function (evt) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = _this.autofillers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var i = _step.value;

                            switch (i.doFill(document, evt.credential.username || null, evt.credential.password)) {
                                case site_handler_1.FillResult.Success:
                                    return;
                                case site_handler_1.FillResult.Failed:
                                    continue;
                                case site_handler_1.FillResult.Aborted:
                                    throw new Error('Autofill failed');
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    throw new Error('All registered autofills failed.');
                });
            }
            var elts = _this.inputForms();
            if (elts.length == 0) {
                return Promise.reject(new Error('No fillable forms found'));
            }
            var inputs = elts[0];
            var passwordFields = inputs[1];
            // Only attempt to fill valid forms.
            if (passwordFields.length < 1) {
                return Promise.reject(new Error('Couldn\'t find any valid forms'));
            }
            var passwordField = passwordFields[0];
            var usernameField = inputs[0];
            var bundle = {
                passwordField: passwordField,
                usernameField: usernameField,
                focusedInput: passwordField
            };
            return _this.sendSearchAndRequest().then(function (evt) {
                bundle.usernameField && evt.credential.username && fillInput(bundle.usernameField, evt.credential.username);
                fillInput(bundle.passwordField, evt.credential.password);
            });
        };
        this.inputForms = function () {
            // if we don't have any successful autofillers, just try to detect and fill based on heuristics.
            var forms = Array.from(document.getElementsByTagName('form'));
            // TODO: more thorough filtering.
            return forms.filter(function (form) {
                return _this.isVisible(form);
            }).map(function (form) {
                return [form, guess_1.guessFormType(form)];
            }).filter(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    form = _ref2[0],
                    result = _ref2[1];

                return result == heuristic_1.FormResult.Login;
            }).map(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    form = _ref4[0],
                    result = _ref4[1];

                return formInputs(form);
            });
        };
        // NOTE(andrew) Based on https://stackoverflow.com/a/15203639
        this.isVisible = function (form) {
            if (form.hidden) {
                return false;
            }
            var rect = form.getBoundingClientRect();
            var vWidth = window.innerWidth || document.documentElement.clientWidth;
            var vHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
                return false;
            }
            // Return true if any of its four corners are visible
            return form.contains(document.elementFromPoint(rect.left, rect.top)) || form.contains(document.elementFromPoint(rect.right, rect.top)) || form.contains(document.elementFromPoint(rect.right, rect.bottom)) || form.contains(document.elementFromPoint(rect.left, rect.bottom));
        };
        /**
         * Show the dropdown.
         * @param {FillBundle} bundle The bundle to show the dropdown with.
         * @param {PartialCredential[]} items The items to use to populate the dropdown.
         */
        this.showDropdown = function (bundle, items) {
            var dropdown = _this.getDropdown();
            _this.populateDropdown(dropdown, bundle, items);
            // Position the dropdown
            var pos = bundle.focusedInput.getBoundingClientRect();
            //noinspection JSSuspiciousNameCombination
            dropdown.style.top = Math.round(pos.top + pos.height) + "px";
            dropdown.style.left = Math.round(pos.left) + "px";
            document.body.appendChild(dropdown); // not sure why this is necessary--the element should already be in the DOM
            dropdown.style.display = 'initial';
            // TODO: improve accessibility
            document.addEventListener('mousedown', function (evt) {
                if (/valt-autofill-/.test(evt.target.className)) return;
                _this.resetDropdown(dropdown);
            }, { once: true });
        };
        this.populateDropdown = function (dropdown, bundle, items) {
            _this.resetDropdown(dropdown);
            _this.buildDropdown(dropdown, bundle, items);
        };
        /**
         * Build a DOM tree for a dropdown with the given elements.
         * @param {HTMLDivElement} dropdown Dropdown to fill.
         * @param {FillBundle} bundle Input/form bundle.
         * @param {PartialCredential[]} items Items to populate the dropdown with.
         */
        this.buildDropdown = function (dropdown, bundle, items) {
            var icon_url = _this.browser.getResourceUrl('dropdown-icon.png');
            items.forEach(function (item) {
                var button = util_1.template(templates_1.default, 'dropdown_item', {
                    img_src: icon_url,
                    title: item.username || item.title
                }).firstChild;
                // TODO: improve accessibility
                button.addEventListener('click', function () {
                    _this.sendRequest(item.uuid).then(function (evt) {
                        bundle.usernameField && evt.credential.username && fillInput(bundle.usernameField, evt.credential.username);
                        fillInput(bundle.passwordField, evt.credential.password);
                    }).then(function () {
                        return _this.resetDropdown(dropdown);
                    });
                }, {
                    once: true
                });
                dropdown.appendChild(button);
            });
        };
        /**
         * Clear out the dropdown.
         * @param {HTMLDivElement} dropdown Dropdown to clear.
         */
        this.resetDropdown = function (dropdown) {
            dropdown.style.display = 'none';
            dropdown.innerHTML = '';
        };
        this.browser = browser;
        this.comm = browser.comm;
        this.window = window;
        this.valtLocked = true;
    }
    /**
     * Set up all the machinery to autofill, capture passwords, and talk to the mini-app.
     */


    _createClass(Formfill, [{
        key: "init",
        value: function init() {
            var _this2 = this;

            if (window !== this.window) return;
            // Don't run in cross-domain iframes:
            try {
                // Cross-domain iframes can't access the top-level document.domain.
                var _ = window.top.document.domain;
            } catch (err) {
                if (err.name == "SecurityError") {
                    return;
                }
            }
            util_1.DebugLogger.log("starting formfill for build: " + util_1.BUILD);
            this.autofillers = site_handler_1.Fillers.filter(function (f) {
                return f.priority(document) != site_handler_1.Priority.IGNORE;
            }).sort(function (a, b) {
                return Math.sign(a.priority(document) - b.priority(document));
            });
            this.scheduleAutofill(initialDelay, maxDelay)();
            this.comm.registerForEvents(this.handleEvt);
            this.dropdownTargeters = site_handler_1.Targeters.filter(function (t) {
                return t.priority(document) != site_handler_1.Priority.IGNORE;
            }).sort(function (a, b) {
                return Math.sign(a.priority(document) - b.priority(document));
            });
            window.addEventListener('submit', this.handleSubmit);
            document.addEventListener('click', this.handleClick, true);
            this.commitPendingItem();
            site_handler_1.preregisterCaptures(document).forEach(function (promise) {
                return promise.then(function (res) {
                    switch (res) {
                        case site_handler_1.CaptureFailReason.Aborted:
                            util_1.DebugLogger.log('preregistered capture was aborted!');
                            break;
                        case site_handler_1.CaptureFailReason.Failed:
                            util_1.DebugLogger.log('preregistered capture failed.');
                            break;
                        default:
                            _this2.updatePassword(res.username || null, res.password, res.title);
                    }
                }).catch(function (err) {
                    util_1.DebugLogger.error("preregistered capture failed because: " + err);
                });
            });
        }
    }, {
        key: "updatePassword",
        value: function updatePassword(username, password) {
            var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.title;

            var createCreds = {
                title: title,
                password: password,
                username: username || undefined
            };
            this.comm.send(new events_1.StoreEvent(window.location.toString(), createCreds));
        }
    }, {
        key: "shouldIgnore",
        value: function shouldIgnore(evt) {
            return evt.target.ownerDocument.defaultView !== this.window;
        }
    }]);

    return Formfill;
}();

exports.Formfill = Formfill;
function createDropdown() {
    var dropdown = document.createElement('div');
    dropdown.id = DROPDOWN_KEY;
    dropdown.style.display = 'none';
    dropdown.style.position = 'absolute';
    document.body.insertBefore(dropdown, document.body.firstChild);
    return dropdown;
}
/**
 * Fill an input element with the given data. Creates events similar to those a human user would (focus, input, blur).
 * @param {HTMLInputElement} elt The element to fill.
 * @param {string} data The string to fill the element with.
 */
function fillInput(elt, data) {
    elt.focus();
    elt.value = data;
    elt.defaultValue = data;
    elt.dispatchEvent(new Event('input', {
        'bubbles': true,
        'cancelable': true
    }));
    elt.blur();
}
exports.fillInput = fillInput;
/**
 * @param form Form to find inputs in.
 * @returns {[HTMLInputElement, HTMLInputElement[]]} Username, then password fields.
 */
function formInputs(form) {
    if (!form) return [null, []];
    var elts = form.getElementsByTagName('input');
    var formInputs = Array.prototype.slice.call(elts);
    var passwords = formInputs.filter(function (input) {
        return (/password/i.test(input.type)
        );
    });
    // Work backwards from the first password field to find the username field.
    var usernameField = null;
    for (var i = formInputs.indexOf(passwords[0]); i >= 0; i--) {
        if (/text|email/i.test(formInputs[i].type)) {
            usernameField = formInputs[i];
            break;
        }
    }
    return [usernameField, passwords];
}

},{"./events":2,"./formheuristics/guess":4,"./formheuristics/heuristic":5,"./site_handlers/site_handler":17,"./templates":19,"./util":20}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var heuristic_1 = require("./heuristic");
var regexheuristic_1 = require("./regexheuristic");
var util_1 = require("../util");
var misc_heuristics_1 = require("./misc_heuristics");
var heuristics = [new misc_heuristics_1.FieldCountHeuristic(), new regexheuristic_1.SignupFormHeuristic(), new regexheuristic_1.LoginFormHeuristic(), new regexheuristic_1.TextLabelHeuristic(), new regexheuristic_1.PasswordLabelHeuristic(), new misc_heuristics_1.LastGuessHeuristic()];
/**
 * Guess whether a form is for login or sign up.
 * @param {HTMLFormElement} form The form to evaluate.
 * @returns {FormResult} The guessed type of the form. Returns FormResult.Unknown if the type could not be determined.
 */
function guessFormType(form) {
    var bundle = new heuristic_1.FormBundle(form);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = heuristics[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var heuristic = _step.value;

            var result = heuristic.evaluate(bundle);
            if (result != heuristic_1.FormResult.Ignore) {
                util_1.DebugLogger.log("determined form '" + (form.id || form.name || form || 'unknown') + "' to be of type " + heuristic_1.FormResult[result] + " as a result of: " + heuristic.description);
                return result;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    util_1.unreachable();
    return heuristic_1.FormResult.Unknown;
}
exports.guessFormType = guessFormType;

},{"../util":20,"./heuristic":5,"./misc_heuristics":6,"./regexheuristic":7}],5:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Result of evaluating a form.
 */
var FormResult;
(function (FormResult) {
    FormResult[FormResult["Login"] = 0] = "Login";
    FormResult[FormResult["Signup"] = 1] = "Signup";
    /** Type couldn't be determined. */
    FormResult[FormResult["Unknown"] = 2] = "Unknown";
    /** Result should be ignored and another heuristic should be tried. */
    FormResult[FormResult["Ignore"] = 3] = "Ignore";
})(FormResult = exports.FormResult || (exports.FormResult = {}));
/**
 * A data class that captures relevant information from a {@link HTMLFormElement} for extraction.
 * @class
 */

var FormBundle =
/**
 * @param {HTMLFormElement} form The form to extract from.
 */
function FormBundle(form) {
    _classCallCheck(this, FormBundle);

    this.form = form;
    this.inputs = Array.from(form.elements).filter(function (elt) {
        return elt.tagName.toLowerCase() == 'input';
    }).map(function (elt) {
        return elt;
    });
    this.passwordInputs = this.inputs.filter(function (elt) {
        return elt.type.toLowerCase() == 'password';
    });
    this.textInputs = this.inputs.filter(function (elt) {
        return elt.type.toLowerCase() == 'text' || elt.type.toLowerCase() == 'email';
    });
};

exports.FormBundle = FormBundle;
/**
 * Get the label for an input element in the given form.
 * @param {HTMLFormElement} form The form within which to check for labels for the given input.
 * @param {HTMLInputElement} input An input element to search for labels for.
 * @returns {string|null) The title of the first label found matching the input's name, or null if no label was found.
 */
function labelFor(form, input) {
    var ret = Array.from(form.getElementsByTagName('label')).find(function (label) {
        return label.htmlFor == input.name;
    });
    return ret == null ? null : ret.title;
}
exports.labelFor = labelFor;

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var heuristic_1 = require("./heuristic");
/**
 * A {@link FormHeuristic} that makes a preliminary guess based on field count.
 */

var FieldCountHeuristic = function () {
    function FieldCountHeuristic() {
        _classCallCheck(this, FieldCountHeuristic);

        this.description = 'text/password field count';
    }

    _createClass(FieldCountHeuristic, [{
        key: "evaluate",
        value: function evaluate(formBundle) {
            if (formBundle.passwordInputs.length > 1) return heuristic_1.FormResult.Signup;
            if (formBundle.passwordInputs.length == 0 || formBundle.textInputs.length == 0) return heuristic_1.FormResult.Unknown;
            return heuristic_1.FormResult.Ignore;
        }
    }]);

    return FieldCountHeuristic;
}();

exports.FieldCountHeuristic = FieldCountHeuristic;
/**
 * A {@link FormHeuristic} that always guesses. Intended to be used last.
 */

var LastGuessHeuristic = function () {
    function LastGuessHeuristic() {
        _classCallCheck(this, LastGuessHeuristic);

        this.description = 'last check -- count text fields';
    }

    _createClass(LastGuessHeuristic, [{
        key: "evaluate",
        value: function evaluate(formBundle) {
            return formBundle.textInputs.length == 1 ? heuristic_1.FormResult.Login : heuristic_1.FormResult.Signup;
        }
    }]);

    return LastGuessHeuristic;
}();

exports.LastGuessHeuristic = LastGuessHeuristic;

},{"./heuristic":5}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var heuristic_1 = require("./heuristic");
/**
 * A {@link FormHeuristic} that evaluates based on the result of a regex matching part of a form.
 * @class
 * @implements FormHeuristic
 */

var RegexHeuristic = function () {
    function RegexHeuristic() {
        _classCallCheck(this, RegexHeuristic);
    }

    _createClass(RegexHeuristic, [{
        key: "evaluate",
        value: function evaluate(formBundle) {
            var strings = this.formBundleExtractor(formBundle);
            return this.regexes.some(function (regex) {
                return strings.some(function (string) {
                    return regex.test(string);
                });
            }) ? this.matchResult : heuristic_1.FormResult.Ignore;
        }
    }, {
        key: "description",
        get: function get() {
            return "regex check: " + this.regexDescription;
        }
    }]);

    return RegexHeuristic;
}();

var SignupFormHeuristic = function (_RegexHeuristic) {
    _inherits(SignupFormHeuristic, _RegexHeuristic);

    function SignupFormHeuristic() {
        _classCallCheck(this, SignupFormHeuristic);

        var _this = _possibleConstructorReturn(this, (SignupFormHeuristic.__proto__ || Object.getPrototypeOf(SignupFormHeuristic)).apply(this, arguments));

        _this.regexes = [/sign(?:\s|[_-])?up/i, /register/i, /registration/i];
        _this.formBundleExtractor = function (bundle) {
            return [bundle.form.id];
        };
        _this.matchResult = heuristic_1.FormResult.Signup;
        _this.regexDescription = 'signup form id';
        return _this;
    }

    return SignupFormHeuristic;
}(RegexHeuristic);

exports.SignupFormHeuristic = SignupFormHeuristic;

var LoginFormHeuristic = function (_RegexHeuristic2) {
    _inherits(LoginFormHeuristic, _RegexHeuristic2);

    function LoginFormHeuristic() {
        _classCallCheck(this, LoginFormHeuristic);

        var _this2 = _possibleConstructorReturn(this, (LoginFormHeuristic.__proto__ || Object.getPrototypeOf(LoginFormHeuristic)).apply(this, arguments));

        _this2.regexes = [/(?:log|sign)(?:\s|[_-])?in/i];
        _this2.formBundleExtractor = function (bundle) {
            return [bundle.form.id];
        };
        _this2.matchResult = heuristic_1.FormResult.Login;
        _this2.regexDescription = 'login form id';
        return _this2;
    }

    return LoginFormHeuristic;
}(RegexHeuristic);

exports.LoginFormHeuristic = LoginFormHeuristic;

var TextLabelHeuristic = function (_RegexHeuristic3) {
    _inherits(TextLabelHeuristic, _RegexHeuristic3);

    function TextLabelHeuristic() {
        _classCallCheck(this, TextLabelHeuristic);

        var _this3 = _possibleConstructorReturn(this, (TextLabelHeuristic.__proto__ || Object.getPrototypeOf(TextLabelHeuristic)).apply(this, arguments));

        _this3.regexes = [/(?:first|last)\s?name/i, /address/i, /credit\s?card/i, /\bcvc\b/i, /\bbirthday\b/i, /\bdate\sof\sbirth\b/i];
        _this3.formBundleExtractor = function (bundle) {
            return bundle.textInputs.map(function (input) {
                return heuristic_1.labelFor(bundle.form, input);
            }).filter(function (str) {
                return str != null;
            });
        };
        _this3.matchResult = heuristic_1.FormResult.Signup;
        _this3.regexDescription = 'text field labels';
        return _this3;
    }

    return TextLabelHeuristic;
}(RegexHeuristic);

exports.TextLabelHeuristic = TextLabelHeuristic;

var PasswordLabelHeuristic = function (_RegexHeuristic4) {
    _inherits(PasswordLabelHeuristic, _RegexHeuristic4);

    function PasswordLabelHeuristic() {
        _classCallCheck(this, PasswordLabelHeuristic);

        var _this4 = _possibleConstructorReturn(this, (PasswordLabelHeuristic.__proto__ || Object.getPrototypeOf(PasswordLabelHeuristic)).apply(this, arguments));

        _this4.regexes = [/\bssn\b/i, /\bnew\spassword\b/i, /\bold\spassword\b/i, /\bconfirm\spassword\b/i, /\brepeat\spassword\b/i, /\bpassword\sagain\b/i];
        _this4.formBundleExtractor = function (bundle) {
            return bundle.passwordInputs.map(function (input) {
                return heuristic_1.labelFor(bundle.form, input);
            }).filter(function (str) {
                return str != null;
            });
        };
        _this4.matchResult = heuristic_1.FormResult.Signup;
        _this4.regexDescription = 'password field labels';
        return _this4;
    }

    return PasswordLabelHeuristic;
}(RegexHeuristic);

exports.PasswordLabelHeuristic = PasswordLabelHeuristic;

},{"./heuristic":5}],8:[function(require,module,exports){
(function (global){
"use strict";
/*!

 handlebars v3.0.0

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = factory();
    } else {
        root.Handlebars = factory();
    }
})(undefined, function () {
    // handlebars/utils.js
    var __module2__ = function () {
        "use strict";

        var __exports__ = {};
        /*jshint -W004 */
        var escape = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        };
        var badChars = /[&<>"'`]/g;
        var possible = /[&<>"'`]/;
        function escapeChar(chr) {
            return escape[chr];
        }
        function extend(obj /* , ...source */) {
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                        obj[key] = arguments[i][key];
                    }
                }
            }
            return obj;
        }
        __exports__.extend = extend;
        var toString = Object.prototype.toString;
        __exports__.toString = toString;
        // Sourced from lodash
        // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
        var isFunction = function isFunction(value) {
            return typeof value === 'function';
        };
        // fallback for older versions of Chrome and Safari
        /* istanbul ignore next */
        if (isFunction(/x/)) {
            isFunction = function isFunction(value) {
                return typeof value === 'function' && toString.call(value) === '[object Function]';
            };
        }
        var isFunction;
        __exports__.isFunction = isFunction;
        /* istanbul ignore next */
        var isArray = Array.isArray || function (value) {
            return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toString.call(value) === '[object Array]' : false;
        };
        __exports__.isArray = isArray;
        // Older IE versions do not directly support indexOf so we must implement our own, sadly.
        function indexOf(array, value) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        }
        __exports__.indexOf = indexOf;
        function escapeExpression(string) {
            // don't escape SafeStrings, since they're already safe
            if (string && string.toHTML) {
                return string.toHTML();
            } else if (string == null) {
                return "";
            } else if (!string) {
                return string + '';
            }
            // Force a string conversion as this will be done by the append regardless and
            // the regex test will do this transparently behind the scenes, causing issues if
            // an object's to string has escaped characters in it.
            string = "" + string;
            if (!possible.test(string)) {
                return string;
            }
            return string.replace(badChars, escapeChar);
        }
        __exports__.escapeExpression = escapeExpression;
        function isEmpty(value) {
            if (!value && value !== 0) {
                return true;
            } else if (isArray(value) && value.length === 0) {
                return true;
            } else {
                return false;
            }
        }
        __exports__.isEmpty = isEmpty;
        function blockParams(params, ids) {
            params.path = ids;
            return params;
        }
        __exports__.blockParams = blockParams;
        function appendContextPath(contextPath, id) {
            return (contextPath ? contextPath + '.' : '') + id;
        }
        __exports__.appendContextPath = appendContextPath;
        return __exports__;
    }();
    // handlebars/exception.js
    var __module3__ = function () {
        "use strict";

        var __exports__;
        var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
        function Exception(message, node) {
            var loc = node && node.loc,
                line,
                column;
            if (loc) {
                line = loc.start.line;
                column = loc.start.column;
                message += ' - ' + line + ':' + column;
            }
            var tmp = Error.prototype.constructor.call(this, message);
            // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
            for (var idx = 0; idx < errorProps.length; idx++) {
                this[errorProps[idx]] = tmp[errorProps[idx]];
            }
            if (loc) {
                this.lineNumber = line;
                this.column = column;
            }
        }
        Exception.prototype = new Error();
        __exports__ = Exception;
        return __exports__;
    }();
    // handlebars/base.js
    var __module1__ = function (__dependency1__, __dependency2__) {
        "use strict";

        var __exports__ = {};
        var Utils = __dependency1__;
        var Exception = __dependency2__;
        var VERSION = "3.0.0";
        __exports__.VERSION = VERSION;
        var COMPILER_REVISION = 6;
        __exports__.COMPILER_REVISION = COMPILER_REVISION;
        var REVISION_CHANGES = {
            1: '<= 1.0.rc.2',
            2: '== 1.0.0-rc.3',
            3: '== 1.0.0-rc.4',
            4: '== 1.x.x',
            5: '== 2.0.0-alpha.x',
            6: '>= 2.0.0-beta.1'
        };
        __exports__.REVISION_CHANGES = REVISION_CHANGES;
        var isArray = Utils.isArray,
            isFunction = Utils.isFunction,
            toString = Utils.toString,
            objectType = '[object Object]';
        function HandlebarsEnvironment(helpers, partials) {
            this.helpers = helpers || {};
            this.partials = partials || {};
            registerDefaultHelpers(this);
        }
        __exports__.HandlebarsEnvironment = HandlebarsEnvironment;
        HandlebarsEnvironment.prototype = {
            constructor: HandlebarsEnvironment,
            logger: logger,
            log: log,
            registerHelper: function registerHelper(name, fn) {
                if (toString.call(name) === objectType) {
                    if (fn) {
                        throw new Exception('Arg not supported with multiple helpers');
                    }
                    Utils.extend(this.helpers, name);
                } else {
                    this.helpers[name] = fn;
                }
            },
            unregisterHelper: function unregisterHelper(name) {
                delete this.helpers[name];
            },
            registerPartial: function registerPartial(name, partial) {
                if (toString.call(name) === objectType) {
                    Utils.extend(this.partials, name);
                } else {
                    if (typeof partial === 'undefined') {
                        throw new Exception('Attempting to register a partial as undefined');
                    }
                    this.partials[name] = partial;
                }
            },
            unregisterPartial: function unregisterPartial(name) {
                delete this.partials[name];
            }
        };
        function registerDefaultHelpers(instance) {
            instance.registerHelper('helperMissing', function () {
                if (arguments.length === 1) {
                    // A missing field in a  constuct.
                    return undefined;
                } else {
                    // Someone is actually trying to call something, blow up.
                    throw new Exception("Missing helper: '" + arguments[arguments.length - 1].name + "'");
                }
            });
            instance.registerHelper('blockHelperMissing', function (context, options) {
                var inverse = options.inverse,
                    fn = options.fn;
                if (context === true) {
                    return fn(this);
                } else if (context === false || context == null) {
                    return inverse(this);
                } else if (isArray(context)) {
                    if (context.length > 0) {
                        if (options.ids) {
                            options.ids = [options.name];
                        }
                        return instance.helpers.each(context, options);
                    } else {
                        return inverse(this);
                    }
                } else {
                    if (options.data && options.ids) {
                        var data = createFrame(options.data);
                        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
                        options = { data: data };
                    }
                    return fn(context, options);
                }
            });
            instance.registerHelper('each', function (context, options) {
                if (!options) {
                    throw new Exception('Must pass iterator to #each');
                }
                var fn = options.fn,
                    inverse = options.inverse;
                var i = 0,
                    ret = "",
                    data;
                var contextPath;
                if (options.data && options.ids) {
                    contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
                }
                if (isFunction(context)) {
                    context = context.call(this);
                }
                if (options.data) {
                    data = createFrame(options.data);
                }
                function execIteration(key, i, last) {
                    if (data) {
                        data.key = key;
                        data.index = i;
                        data.first = i === 0;
                        data.last = !!last;
                        if (contextPath) {
                            data.contextPath = contextPath + key;
                        }
                    }
                    ret = ret + fn(context[key], {
                        data: data,
                        blockParams: Utils.blockParams([context[key], key], [contextPath + key, null])
                    });
                }
                if (context && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object') {
                    if (isArray(context)) {
                        for (var j = context.length; i < j; i++) {
                            execIteration(i, i, i === context.length - 1);
                        }
                    } else {
                        var priorKey;
                        for (var key in context) {
                            if (context.hasOwnProperty(key)) {
                                // We're running the iterations one step out of sync so we can detect
                                // the last iteration without have to scan the object twice and create
                                // an itermediate keys array. 
                                if (priorKey) {
                                    execIteration(priorKey, i - 1);
                                }
                                priorKey = key;
                                i++;
                            }
                        }
                        if (priorKey) {
                            execIteration(priorKey, i - 1, true);
                        }
                    }
                }
                if (i === 0) {
                    ret = inverse(this);
                }
                return ret;
            });
            instance.registerHelper('if', function (conditional, options) {
                if (isFunction(conditional)) {
                    conditional = conditional.call(this);
                }
                // Default behavior is to render the positive path if the value is truthy and not empty.
                // The `includeZero` option may be set to treat the condtional as purely not empty based on the
                // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
                if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
                    return options.inverse(this);
                } else {
                    return options.fn(this);
                }
            });
            instance.registerHelper('unless', function (conditional, options) {
                return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
            });
            instance.registerHelper('with', function (context, options) {
                if (isFunction(context)) {
                    context = context.call(this);
                }
                var fn = options.fn;
                if (!Utils.isEmpty(context)) {
                    if (options.data && options.ids) {
                        var data = createFrame(options.data);
                        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
                        options = { data: data };
                    }
                    return fn(context, options);
                } else {
                    return options.inverse(this);
                }
            });
            instance.registerHelper('log', function (message, options) {
                var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
                instance.log(level, message);
            });
            instance.registerHelper('lookup', function (obj, field) {
                return obj && obj[field];
            });
        }
        var logger = {
            methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },
            // State enum
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 1,
            // Can be overridden in the host environment
            log: function log(level, message) {
                if (typeof console !== 'undefined' && logger.level <= level) {
                    var method = logger.methodMap[level];
                    (console[method] || console.log).call(console, message);
                }
            }
        };
        __exports__.logger = logger;
        var log = logger.log;
        __exports__.log = log;
        var createFrame = function createFrame(object) {
            var frame = Utils.extend({}, object);
            frame._parent = object;
            return frame;
        };
        __exports__.createFrame = createFrame;
        return __exports__;
    }(__module2__, __module3__);
    // handlebars/safe-string.js
    var __module4__ = function () {
        "use strict";

        var __exports__;
        // Build out our basic SafeString type
        function SafeString(string) {
            this.string = string;
        }
        SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
            return "" + this.string;
        };
        __exports__ = SafeString;
        return __exports__;
    }();
    // handlebars/runtime.js
    var __module5__ = function (__dependency1__, __dependency2__, __dependency3__) {
        "use strict";

        var __exports__ = {};
        var Utils = __dependency1__;
        var Exception = __dependency2__;
        var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
        var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;
        var createFrame = __dependency3__.createFrame;
        function checkRevision(compilerInfo) {
            var compilerRevision = compilerInfo && compilerInfo[0] || 1,
                currentRevision = COMPILER_REVISION;
            if (compilerRevision !== currentRevision) {
                if (compilerRevision < currentRevision) {
                    var runtimeVersions = REVISION_CHANGES[currentRevision],
                        compilerVersions = REVISION_CHANGES[compilerRevision];
                    throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
                } else {
                    // Use the embedded version info since the runtime doesn't know about this revision yet
                    throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + compilerInfo[1] + ").");
                }
            }
        }
        __exports__.checkRevision = checkRevision; // TODO: Remove this line and break up compilePartial
        function template(templateSpec, env) {
            /* istanbul ignore next */
            if (!env) {
                throw new Exception("No environment passed to template");
            }
            if (!templateSpec || !templateSpec.main) {
                throw new Exception('Unknown template object: ' + (typeof templateSpec === 'undefined' ? 'undefined' : _typeof(templateSpec)));
            }
            // Note: Using env.VM references rather than local var references throughout this section to allow
            // for external users to override these as psuedo-supported APIs.
            env.VM.checkRevision(templateSpec.compiler);
            var invokePartialWrapper = function invokePartialWrapper(partial, context, options) {
                if (options.hash) {
                    context = Utils.extend({}, context, options.hash);
                }
                partial = env.VM.resolvePartial.call(this, partial, context, options);
                var result = env.VM.invokePartial.call(this, partial, context, options);
                if (result == null && env.compile) {
                    options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
                    result = options.partials[options.name](context, options);
                }
                if (result != null) {
                    if (options.indent) {
                        var lines = result.split('\n');
                        for (var i = 0, l = lines.length; i < l; i++) {
                            if (!lines[i] && i + 1 === l) {
                                break;
                            }
                            lines[i] = options.indent + lines[i];
                        }
                        result = lines.join('\n');
                    }
                    return result;
                } else {
                    throw new Exception("The partial " + options.name + " could not be compiled when running in runtime-only mode");
                }
            };
            // Just add water
            var container = {
                strict: function strict(obj, name) {
                    if (!(name in obj)) {
                        throw new Exception('"' + name + '" not defined in ' + obj);
                    }
                    return obj[name];
                },
                lookup: function lookup(depths, name) {
                    var len = depths.length;
                    for (var i = 0; i < len; i++) {
                        if (depths[i] && depths[i][name] != null) {
                            return depths[i][name];
                        }
                    }
                },
                lambda: function lambda(current, context) {
                    return typeof current === 'function' ? current.call(context) : current;
                },
                escapeExpression: Utils.escapeExpression,
                invokePartial: invokePartialWrapper,
                fn: function fn(i) {
                    return templateSpec[i];
                },
                programs: [],
                program: function program(i, data, declaredBlockParams, blockParams, depths) {
                    var programWrapper = this.programs[i],
                        fn = this.fn(i);
                    if (data || depths || blockParams || declaredBlockParams) {
                        programWrapper = _program(this, i, fn, data, declaredBlockParams, blockParams, depths);
                    } else if (!programWrapper) {
                        programWrapper = this.programs[i] = _program(this, i, fn);
                    }
                    return programWrapper;
                },
                data: function data(_data, depth) {
                    while (_data && depth--) {
                        _data = _data._parent;
                    }
                    return _data;
                },
                merge: function merge(param, common) {
                    var ret = param || common;
                    if (param && common && param !== common) {
                        ret = Utils.extend({}, common, param);
                    }
                    return ret;
                },
                noop: env.VM.noop,
                compilerInfo: templateSpec.compiler
            };
            var ret = function ret(context, options) {
                options = options || {};
                var data = options.data;
                ret._setup(options);
                if (!options.partial && templateSpec.useData) {
                    data = initData(context, data);
                }
                var depths,
                    blockParams = templateSpec.useBlockParams ? [] : undefined;
                if (templateSpec.useDepths) {
                    depths = options.depths ? [context].concat(options.depths) : [context];
                }
                return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
            };
            ret.isTop = true;
            ret._setup = function (options) {
                if (!options.partial) {
                    container.helpers = container.merge(options.helpers, env.helpers);
                    if (templateSpec.usePartial) {
                        container.partials = container.merge(options.partials, env.partials);
                    }
                } else {
                    container.helpers = options.helpers;
                    container.partials = options.partials;
                }
            };
            ret._child = function (i, data, blockParams, depths) {
                if (templateSpec.useBlockParams && !blockParams) {
                    throw new Exception('must pass block params');
                }
                if (templateSpec.useDepths && !depths) {
                    throw new Exception('must pass parent depths');
                }
                return _program(container, i, templateSpec[i], data, 0, blockParams, depths);
            };
            return ret;
        }
        __exports__.template = template;
        function _program(container, i, fn, data, declaredBlockParams, blockParams, depths) {
            var prog = function prog(context, options) {
                options = options || {};
                return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
            };
            prog.program = i;
            prog.depth = depths ? depths.length : 0;
            prog.blockParams = declaredBlockParams || 0;
            return prog;
        }
        __exports__.program = _program;
        function resolvePartial(partial, context, options) {
            if (!partial) {
                partial = options.partials[options.name];
            } else if (!partial.call && !options.name) {
                // This is a dynamic partial that returned a string
                options.name = partial;
                partial = options.partials[partial];
            }
            return partial;
        }
        __exports__.resolvePartial = resolvePartial;
        function invokePartial(partial, context, options) {
            options.partial = true;
            if (partial === undefined) {
                throw new Exception("The partial " + options.name + " could not be found");
            } else if (partial instanceof Function) {
                return partial(context, options);
            }
        }
        __exports__.invokePartial = invokePartial;
        function noop() {
            return "";
        }
        __exports__.noop = noop;
        function initData(context, data) {
            if (!data || !('root' in data)) {
                data = data ? createFrame(data) : {};
                data.root = context;
            }
            return data;
        }
        return __exports__;
    }(__module2__, __module3__, __module1__);
    // handlebars.runtime.js
    var __module0__ = function (__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
        "use strict";

        var __exports__;
        /*globals Handlebars: true */
        var base = __dependency1__;
        // Each of these augment the Handlebars object. No need to setup here.
        // (This is done to easily share code between commonjs and browse envs)
        var SafeString = __dependency2__;
        var Exception = __dependency3__;
        var Utils = __dependency4__;
        var runtime = __dependency5__;
        // For compatibility and usage outside of module systems, make the Handlebars object a namespace
        var create = function create() {
            var hb = new base.HandlebarsEnvironment();
            Utils.extend(hb, base);
            hb.SafeString = SafeString;
            hb.Exception = Exception;
            hb.Utils = Utils;
            hb.escapeExpression = Utils.escapeExpression;
            hb.VM = runtime;
            hb.template = function (spec) {
                return runtime.template(spec, hb);
            };
            return hb;
        };
        var Handlebars = create();
        Handlebars.create = create;
        /*jshint -W040 */
        /* istanbul ignore next */
        var root = typeof global !== 'undefined' ? global : window,
            $Handlebars = root.Handlebars;
        /* istanbul ignore next */
        Handlebars.noConflict = function () {
            if (root.Handlebars === Handlebars) {
                root.Handlebars = $Handlebars;
            }
        };
        Handlebars['default'] = Handlebars;
        __exports__ = Handlebars;
        return __exports__;
    }(__module1__, __module4__, __module3__, __module2__, __module5__);
    return __module0__;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var formfill_1 = require("../../formfill");
var safari_content_1 = require("../../safari/safari_content");
function attach() {
    new formfill_1.Formfill(safari_content_1.SafariContent).init();
}
switch (document.readyState) {
    case 'complete':
    case 'interactive':
        attach();
        break;
    case 'loading':
        document.addEventListener('DOMContentLoaded', attach);
}

},{"../../formfill":3,"../../safari/safari_content":10}],10:[function(require,module,exports){
"use strict";
/**
 * This is the content script side interface to the safari API.
 */

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var browser_interface_1 = require("../browser_interface");

var SafariCommon = function SafariCommon() {
    _classCallCheck(this, SafariCommon);

    this.name = browser_interface_1.BrowserName.SAFARI;
    this.getResourceUrl = function (path) {
        return safari.extension.baseURI + path;
    };
};

exports.SafariCommon = SafariCommon;
// this is the content-script-side messaging logic
var SafariMessenger = {
    send: function send(evt) {
        safari.extension.dispatchMessage(evt.command, evt);
    },
    registerForEvents: function registerForEvents(fn) {
        safari.self.addEventListener('message', function (evt) {
            fn(evt.message);
        });
    },
    generatePassword: function generatePassword(evt) {
        // NOTE(andrew) We are doing this only until the Chrome extension is
        // transitioned to Chrome Native Messaging, at which point Formfill can
        // simply use send directly and this method can be extricated.
        this.send(evt);
    }
};

var SafariCt = function (_SafariCommon) {
    _inherits(SafariCt, _SafariCommon);

    function SafariCt() {
        _classCallCheck(this, SafariCt);

        var _this = _possibleConstructorReturn(this, (SafariCt.__proto__ || Object.getPrototypeOf(SafariCt)).apply(this, arguments));

        _this.comm = SafariMessenger;
        return _this;
    }

    return SafariCt;
}(SafariCommon);

exports.SafariContent = new SafariCt();

},{"../browser_interface":1}],11:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * American Express site captures.
 */
var site_handler_1 = require("./site_handler");
/**
 * Site-specific capture for the American Express homepage.
 */

var AmexHomeCapture = function () {
    function AmexHomeCapture() {
        _classCallCheck(this, AmexHomeCapture);

        this.name = 'American Express Home';
    }

    _createClass(AmexHomeCapture, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && AmexHomeCapture.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doCapturePreregister",
        value: function doCapturePreregister(d) {
            return new Promise(function (resolve) {
                return d.defaultView.addEventListener('click', function (evt) {
                    if (evt.target.id === AmexHomeCapture.btnId) resolve();
                }, true);
            }).then(function () {
                var usernameField = d.getElementById(AmexHomeCapture.usernameId);
                var passwordField = d.getElementById(AmexHomeCapture.passwordId);
                if (!usernameField || !passwordField) return site_handler_1.CaptureFailReason.Failed;
                if (usernameField.tagName.toLowerCase() !== 'input' || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.CaptureFailReason.Aborted;
                if (!usernameField.validity.valid || !passwordField.validity.valid) return site_handler_1.CaptureFailReason.Aborted;
                return {
                    password: passwordField.value,
                    username: usernameField.value,
                    title: 'American Express'
                };
            }).catch(function () {
                return site_handler_1.CaptureFailReason.Failed;
            });
        }
    }]);

    return AmexHomeCapture;
}();
/** Username field id. */


AmexHomeCapture.usernameId = 'Username';
/** Password field id. */
AmexHomeCapture.passwordId = 'Password';
/** Login button id. */
AmexHomeCapture.btnId = 'loginLink';
/** Regex to match the amex homepage. */
AmexHomeCapture.regex = /https:\/\/www\.americanexpress\.com\/?[^/]*/i;
exports.AmexHomeCapture = AmexHomeCapture;
/**
 * Site-specific capture for the American Express homepage (reachable if homepage login fails).
 */

var AmexSignInCapture = function () {
    function AmexSignInCapture() {
        _classCallCheck(this, AmexSignInCapture);

        this.name = 'American Express Sign In';
    }

    _createClass(AmexSignInCapture, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && AmexSignInCapture.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doCapturePreregister",
        value: function doCapturePreregister(d) {
            return new Promise(function (resolve) {
                return d.defaultView.addEventListener('click', function (evt) {
                    if (evt.target.id === AmexSignInCapture.btnId) resolve();
                }, true);
            }).then(function () {
                var usernameField = d.getElementById(AmexSignInCapture.usernameId);
                var passwordField = d.getElementById(AmexSignInCapture.passwordId);
                if (!usernameField || !passwordField) return site_handler_1.CaptureFailReason.Failed;
                if (usernameField.tagName.toLowerCase() !== 'input' || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.CaptureFailReason.Aborted;
                if (!usernameField.validity.valid || !passwordField.validity.valid) return site_handler_1.CaptureFailReason.Aborted;
                return {
                    password: passwordField.value,
                    username: usernameField.value,
                    title: 'American Express'
                };
            }).catch(function () {
                return site_handler_1.CaptureFailReason.Failed;
            });
        }
    }]);

    return AmexSignInCapture;
}();
/** Username field id. */


AmexSignInCapture.usernameId = 'lilo_userName';
/** Password field id. */
AmexSignInCapture.passwordId = 'lilo_password';
/** Login button id. */
AmexSignInCapture.btnId = 'lilo_formSubmit';
/** Regex to match the amex sign in page. */
AmexSignInCapture.regex = /https:\/\/online\.americanexpress\.com\/myca\/logon\/us\/action\/LogLogonHandler\/?[^/]*/i;
exports.AmexSignInCapture = AmexSignInCapture;

},{"./site_handler":17}],12:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Bank of America site captures.
 */
var site_handler_1 = require("./site_handler");
var formfill_1 = require("../formfill");
/**
 * Site-specific capture for the Bank of America homepage.
 */

var BofAHomeCapture = function () {
    function BofAHomeCapture() {
        _classCallCheck(this, BofAHomeCapture);

        this.name = 'Bank of America Home';
    }

    _createClass(BofAHomeCapture, [{
        key: "priority",
        value: function priority(d) {
            if (d.defaultView !== d.defaultView.top) return site_handler_1.Priority.IGNORE;
            return BofAHomeCapture.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doCapturePreregister",
        value: function doCapturePreregister(d) {
            // capture on beforeunload because we know everything is in place at this point. was having intermittent issues
            // with click events on the button depending on order of execution.
            return new Promise(function (resolve) {
                return d.defaultView.addEventListener('click', function (evt) {
                    if (evt.target.id === BofAHomeCapture.btnId) resolve();
                });
            }).then(function () {
                var usernameField = d.getElementById(BofAHomeCapture.usernameId);
                if (!usernameField) return site_handler_1.CaptureFailReason.Failed;
                if (usernameField.tagName.toLowerCase() !== 'input' || usernameField.type !== 'text') return site_handler_1.CaptureFailReason.Aborted;
                var userParent = usernameField.parentElement;
                if (!userParent) return site_handler_1.CaptureFailReason.Failed;
                var userSib = userParent.nextElementSibling;
                if (!userSib) return site_handler_1.CaptureFailReason.Failed;
                var passCandidates = Array.from(userSib.getElementsByTagName('input')).filter(function (elt) {
                    return elt.type === 'text';
                });
                if (passCandidates.length !== 1) return site_handler_1.CaptureFailReason.Failed;
                var passwordField = passCandidates[0];
                if (!usernameField.validity.valid || !passwordField.validity.valid) return site_handler_1.CaptureFailReason.Aborted;
                // bank of america does some sort of polyfill overriding on the `value` attribute when accessed as a
                // property. this seems to be able to get around it.
                var username = usernameField.getAttribute('value');
                var password = passwordField.getAttribute('value');
                if (!username || !password) return site_handler_1.CaptureFailReason.Failed;
                if (BofAHomeCapture.obfRegex.test(username) || BofAHomeCapture.obfRegex.test(password)) return site_handler_1.CaptureFailReason.Failed;
                return {
                    password: password,
                    username: username,
                    title: 'Bank of America'
                };
            }).catch(function () {
                return site_handler_1.CaptureFailReason.Failed;
            });
        }
    }]);

    return BofAHomeCapture;
}();
/** Username field id. */


BofAHomeCapture.usernameId = 'onlineId1';
/** Regex to match the BofA homepage. */
BofAHomeCapture.regex = /^https:\/\/www\.bankofamerica\.com\/?(?:[?#][^/]*)?/i;
/** Matches a string of all asterisks. */
BofAHomeCapture.obfRegex = /^\**$/i;
/** Login button id. */
BofAHomeCapture.btnId = 'hp-sign-in-btn';
exports.BofAHomeCapture = BofAHomeCapture;
/** Functionality common to the sign in handlers */
var SignIn = {
    /** Match the BofA sign in page. */
    regex: /^https:\/\/secure\.bankofamerica\.com\/login\/sign-in\/signOnV2Screen\.go\/?(?:[?#][^/]*)?/i,
    /** Username field id. */
    usernameId: 'enterID-input',
    /** Password field id. */
    passwordId: 'tlpvt-passcode-input',
    priority: function priority(d) {
        if (d.defaultView !== d.defaultView.top) return site_handler_1.Priority.IGNORE;
        return SignIn.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
    }
};
/**
 * Site-specific autofill for the Bank of America sign-in page (reachable if homepage login fails).
 */

var BofASignInFill = function () {
    function BofASignInFill() {
        _classCallCheck(this, BofASignInFill);

        this.priority = SignIn.priority;
    }

    _createClass(BofASignInFill, [{
        key: "doFill",
        value: function doFill(d, username, password) {
            if (!username) return site_handler_1.FillResult.Failed;
            var usernameField = d.getElementById(SignIn.usernameId);
            if (!usernameField || usernameField.tagName.toLowerCase() !== 'input') return site_handler_1.FillResult.Failed;
            formfill_1.fillInput(usernameField, username);
            var passwordField = d.getElementById(SignIn.passwordId);
            if (!passwordField || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.FillResult.Failed;
            formfill_1.fillInput(passwordField, password);
            passwordField.removeAttribute('disabled');
            return site_handler_1.FillResult.Success;
        }
    }]);

    return BofASignInFill;
}();

exports.BofASignInFill = BofASignInFill;
/**
 * Site-specific dropdown targeting for the Bank of America sign-in page (reachable if homepage login fails).
 */

var BofADropdownTargeter = function () {
    function BofADropdownTargeter() {
        _classCallCheck(this, BofADropdownTargeter);

        this.priority = SignIn.priority;
    }

    _createClass(BofADropdownTargeter, [{
        key: "dropdownTargets",
        value: function dropdownTargets(d) {
            var usernameField = d.getElementById(SignIn.usernameId);
            var passwordField = d.getElementById(SignIn.passwordId);
            if (!usernameField || !passwordField) return [];
            return [{
                usernameField: usernameField,
                passwordField: passwordField,
                dropdownTargets: [usernameField, passwordField]
            }];
        }
    }, {
        key: "passwordSuggestTargets",
        value: function passwordSuggestTargets(d) {
            return [];
        }
    }]);

    return BofADropdownTargeter;
}();

exports.BofADropdownTargeter = BofADropdownTargeter;
/**
 * Site-specific capture for the Bank of America sign-in page (reachable if homepage login fails).
 * Field values differ from {@link SignIn} because this page has a hidden form that we need to capture from.
 */

var BofASignInCapture = function () {
    function BofASignInCapture() {
        _classCallCheck(this, BofASignInCapture);

        this.name = "Bank of America Sign-in Page";
        this.priority = SignIn.priority;
    }

    _createClass(BofASignInCapture, [{
        key: "doCapturePreregister",
        value: function doCapturePreregister(d) {
            return new Promise(function (resolve, reject) {
                var matchingElts = Array.from(d.getElementsByName(BofASignInCapture.buttonName));
                if (matchingElts.length !== 1) reject(new Error("wrong number of matching buttons: " + matchingElts.length));
                var btn = matchingElts[0];
                btn.addEventListener('click', resolve, { once: true, capture: true });
            }).then(function () {
                var usernameField = d.getElementById(BofASignInCapture.usernameId);
                var passwordField = d.getElementById(BofASignInCapture.passwordId);
                if (!usernameField || !passwordField) return site_handler_1.CaptureFailReason.Failed;
                if (usernameField.tagName.toLowerCase() !== 'input' || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.CaptureFailReason.Aborted;
                if (!usernameField.validity.valid || !passwordField.validity.valid) return site_handler_1.CaptureFailReason.Aborted;
                return {
                    password: passwordField.value,
                    username: usernameField.value,
                    title: 'Bank of America'
                };
            }).catch(function () {
                return site_handler_1.CaptureFailReason.Failed;
            });
        }
    }]);

    return BofASignInCapture;
}();
/** Username field id. */


BofASignInCapture.usernameId = 'onlineIdVal';
/** Password field id. */
BofASignInCapture.passwordId = 'passcodeVal';
/** Login button id. */
BofASignInCapture.buttonName = 'enter-online-id-submit';
exports.BofASignInCapture = BofASignInCapture;

},{"../formfill":3,"./site_handler":17}],13:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Citi Bank site captures.
 */
var site_handler_1 = require("./site_handler");
var formfill_1 = require("../formfill");
/**
 * Site-specific autofill for the Citi Bank homepage.
 */

var CitiHomeFill = function () {
    function CitiHomeFill() {
        _classCallCheck(this, CitiHomeFill);
    }

    _createClass(CitiHomeFill, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && CitiHomeFill.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doFill",
        value: function doFill(d, username, password) {
            var usernameField = document.getElementById(CitiHomeFill.usernameId);
            var usernameMaskField = document.getElementById(CitiHomeFill.usernameMaskId);
            var passwordField = document.getElementById(CitiHomeFill.passwordId);
            var all = [usernameField, usernameMaskField, passwordField];
            if (all.some(function (elt) {
                return !elt;
            })) return site_handler_1.FillResult.Aborted;
            if (all.some(function (elt) {
                return elt.tagName.toLowerCase() !== 'input';
            })) return site_handler_1.FillResult.Aborted;
            if (username) {
                formfill_1.fillInput(usernameField, username);
                formfill_1.fillInput(usernameMaskField, username);
            }
            formfill_1.fillInput(passwordField, password);
            return site_handler_1.FillResult.Success;
        }
    }]);

    return CitiHomeFill;
}();
/** Username field id. */


CitiHomeFill.usernameId = 'username';
/** Masked (obfuscated) username field id. */
CitiHomeFill.usernameMaskId = 'usernameMasked';
/** Password field id. */
CitiHomeFill.passwordId = 'password';
/** Regex to match the Citi Bank home page. */
CitiHomeFill.regex = /https:\/\/online\.citi\.com\/US\/login\.do\/?(?:[?#][^/]*)?/i;
exports.CitiHomeFill = CitiHomeFill;
/**
 * Site-specific capture for the Citi Bank homepage.
 */

var CitiHomeCapture = function () {
    function CitiHomeCapture() {
        _classCallCheck(this, CitiHomeCapture);

        this.name = 'Citibank Home';
    }

    _createClass(CitiHomeCapture, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && CitiHomeCapture.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doCapturePreregister",
        value: function doCapturePreregister(d) {
            return new Promise(function (resolve) {
                return d.defaultView.addEventListener('click', function (evt) {
                    if (evt.target.id === CitiHomeCapture.btnId) resolve();
                }, true);
            }).then(function () {
                var usernameField = d.getElementById(CitiHomeCapture.usernameId);
                var passwordField = d.getElementById(CitiHomeCapture.passwordId);
                if (!usernameField || !passwordField) return site_handler_1.CaptureFailReason.Failed;
                if (usernameField.tagName.toLowerCase() !== 'input' || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.CaptureFailReason.Aborted;
                if (!usernameField.validity.valid || !passwordField.validity.valid) return site_handler_1.CaptureFailReason.Aborted;
                return {
                    password: passwordField.value,
                    username: usernameField.value,
                    title: 'Citibank'
                };
            }).catch(function () {
                return site_handler_1.CaptureFailReason.Failed;
            });
        }
    }]);

    return CitiHomeCapture;
}();
/** Username field id. */


CitiHomeCapture.usernameId = 'username';
/** Password field id. */
CitiHomeCapture.passwordId = 'password';
/** Regex to match the Citi Bank home page. */
CitiHomeCapture.regex = /https:\/\/online\.citi\.com\/US\/login\.do\/?(?:[?#][^/]*)?/i;
/** Login button id. */
CitiHomeCapture.btnId = 'signInBtn';
exports.CitiHomeCapture = CitiHomeCapture;
/**
 * Site-specific dropdown targeting for the Citi Bank homepage.
 */

var CitiHomeDropdownTargeter = function () {
    function CitiHomeDropdownTargeter() {
        _classCallCheck(this, CitiHomeDropdownTargeter);
    }

    _createClass(CitiHomeDropdownTargeter, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && CitiHomeDropdownTargeter.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "dropdownTargets",
        value: function dropdownTargets(d) {
            var usernameMaskField = d.getElementById(CitiHomeDropdownTargeter.usernameMaskId);
            var usernameField = d.getElementById(CitiHomeDropdownTargeter.usernameId);
            var passwordField = d.getElementById(CitiHomeDropdownTargeter.passwordId);
            if (!usernameField || !passwordField) return [];
            return [{
                usernameField: usernameField,
                passwordField: passwordField,
                dropdownTargets: [usernameMaskField, usernameField, passwordField]
            }];
        }
    }, {
        key: "passwordSuggestTargets",
        value: function passwordSuggestTargets(d) {
            return [];
        }
    }]);

    return CitiHomeDropdownTargeter;
}();
/** Username field id. */


CitiHomeDropdownTargeter.usernameId = 'username';
/** Masked (obfuscated) username field id. */
CitiHomeDropdownTargeter.usernameMaskId = 'usernameMasked';
/** Password field id. */
CitiHomeDropdownTargeter.passwordId = 'password';
/** Regex to match the Citi Bank home page. */
CitiHomeDropdownTargeter.regex = /https:\/\/online\.citi\.com\/US\/login\.do\/?(?:[?#][^/]*)?/i;
exports.CitiHomeDropdownTargeter = CitiHomeDropdownTargeter;
/**
 * Site-specific autofill for the Citi Bank sign in page.
 */

var CitiSignInFill = function () {
    function CitiSignInFill() {
        _classCallCheck(this, CitiSignInFill);
    }

    _createClass(CitiSignInFill, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && CitiSignInFill.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doFill",
        value: function doFill(d, username, password) {
            var usernameField = document.getElementById(CitiSignInFill.usernameId);
            var usernameMaskField = document.getElementById(CitiSignInFill.usernameMaskId);
            var passwordField = document.getElementById(CitiSignInFill.passwordId);
            var all = [usernameField, usernameMaskField, passwordField];
            if (all.some(function (elt) {
                return !elt;
            })) return site_handler_1.FillResult.Aborted;
            if (all.some(function (elt) {
                return elt.tagName.toLowerCase() !== 'input';
            })) return site_handler_1.FillResult.Aborted;
            if (username) {
                formfill_1.fillInput(usernameField, username);
                formfill_1.fillInput(usernameMaskField, username);
            }
            formfill_1.fillInput(passwordField, password);
            return site_handler_1.FillResult.Success;
        }
    }]);

    return CitiSignInFill;
}();
/** Username field id. */


CitiSignInFill.usernameId = 'username';
/** Masked (obfuscated) username field id. */
CitiSignInFill.usernameMaskId = 'usernameMasked';
/** Password field id. */
CitiSignInFill.passwordId = 'password';
/** Regex to match the Citi Bank sign-in page. */
CitiSignInFill.regex = /https:\/\/online\.citi\.com\/US\/JSO\/signon\/uname\/Next\.do\/?(?:[?#][^/]*)?/i;
exports.CitiSignInFill = CitiSignInFill;
/**
 * Site-specific capture for the Citi Bank sign in page.
 */

var CitiSignInCapture = function () {
    function CitiSignInCapture() {
        _classCallCheck(this, CitiSignInCapture);

        this.name = 'Citibank Sign In';
    }

    _createClass(CitiSignInCapture, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && CitiSignInCapture.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doCapturePreregister",
        value: function doCapturePreregister(d) {
            return new Promise(function (resolve) {
                return d.defaultView.addEventListener('click', function (evt) {
                    if (evt.target.id === CitiSignInCapture.btnId) resolve();
                }, true);
            }).then(function () {
                var usernameField = d.getElementById(CitiSignInCapture.usernameId);
                var passwordField = d.getElementById(CitiSignInCapture.passwordId);
                if (!usernameField || !passwordField) return site_handler_1.CaptureFailReason.Failed;
                if (usernameField.tagName.toLowerCase() !== 'input' || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.CaptureFailReason.Aborted;
                if (!usernameField.validity.valid || !passwordField.validity.valid) return site_handler_1.CaptureFailReason.Aborted;
                return {
                    password: passwordField.value,
                    username: usernameField.value,
                    title: 'Citibank'
                };
            }).catch(function () {
                return site_handler_1.CaptureFailReason.Failed;
            });
        }
    }]);

    return CitiSignInCapture;
}();
/** Username field id. */


CitiSignInCapture.usernameId = 'username';
/** Password field id. */
CitiSignInCapture.passwordId = 'password';
/** Regex to match the Citi Bank sign-in page. */
CitiSignInCapture.regex = /https:\/\/online\.citi\.com\/US\/JSO\/signon\/uname\/Next\.do\/?(?:[?#][^/]*)?/i;
/** Login button id. */
CitiSignInCapture.btnId = 'signon';
exports.CitiSignInCapture = CitiSignInCapture;
/**
 * Site-specific dropdown targeting for the Citi Bank sign in page.
 */

var CitiSignInDropdownTargeter = function () {
    function CitiSignInDropdownTargeter() {
        _classCallCheck(this, CitiSignInDropdownTargeter);
    }

    _createClass(CitiSignInDropdownTargeter, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && CitiSignInDropdownTargeter.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "dropdownTargets",
        value: function dropdownTargets(d) {
            var usernameMaskField = d.getElementById(CitiSignInDropdownTargeter.usernameMaskId);
            var usernameField = d.getElementById(CitiSignInDropdownTargeter.usernameId);
            var passwordField = d.getElementById(CitiSignInDropdownTargeter.passwordId);
            if (!usernameField || !passwordField) return [];
            return [{
                usernameField: usernameField,
                passwordField: passwordField,
                dropdownTargets: [usernameField, passwordField, usernameMaskField]
            }];
        }
    }, {
        key: "passwordSuggestTargets",
        value: function passwordSuggestTargets(d) {
            return [];
        }
    }]);

    return CitiSignInDropdownTargeter;
}();
/** Username field id. */


CitiSignInDropdownTargeter.usernameId = 'username';
/** Masked (obfuscated) username field id. */
CitiSignInDropdownTargeter.usernameMaskId = 'usernameMasked';
/** Password field id. */
CitiSignInDropdownTargeter.passwordId = 'password';
/** Regex to match the Citi Bank sign-in page. */
CitiSignInDropdownTargeter.regex = /https:\/\/online\.citi\.com\/US\/JSO\/signon\/uname\/Next\.do\/?(?:[?#][^/]*)?/i;
exports.CitiSignInDropdownTargeter = CitiSignInDropdownTargeter;

},{"../formfill":3,"./site_handler":17}],14:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var site_handler_1 = require("./site_handler");
var formfill_1 = require("../formfill");
/** Match the iTunes Connect sign in iframe */
var regex = /^https:\/\/idmsa\.apple\.com\/appleauth\/auth\/signin\/?(?:[?#][^/]*)?/i;

var ITunesConnectFill = function () {
    function ITunesConnectFill() {
        _classCallCheck(this, ITunesConnectFill);
    }

    _createClass(ITunesConnectFill, [{
        key: "priority",
        value: function priority(d) {
            return regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doFill",
        value: function doFill(d, username, password) {
            if (!username) return site_handler_1.FillResult.Failed;
            var usernameField = d.getElementById(ITunesConnectFill.usernameId);
            if (!usernameField || usernameField.tagName.toLowerCase() !== 'input') return site_handler_1.FillResult.Failed;
            formfill_1.fillInput(usernameField, username);
            var passwordField = d.getElementById(ITunesConnectFill.passwordId);
            if (!passwordField || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.FillResult.Failed;
            formfill_1.fillInput(passwordField, password);
            return site_handler_1.FillResult.Success;
        }
    }]);

    return ITunesConnectFill;
}();
/** Username field id. */


ITunesConnectFill.usernameId = 'appleId';
/** Password field id. */
ITunesConnectFill.passwordId = 'pwd';
exports.ITunesConnectFill = ITunesConnectFill;
/* Note: slow-loading auth iframe makes auto capture difficult for this site, so it's disabled for now. Currently, the
    preregister only happens once, even though the button will most likely not exist. */

var ITunesConnectCapture = function () {
    function ITunesConnectCapture() {
        _classCallCheck(this, ITunesConnectCapture);

        this.name = 'iTunes Connect';
    }

    _createClass(ITunesConnectCapture, [{
        key: "priority",
        value: function priority(d) {
            return regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doCapturePreregister",
        value: function doCapturePreregister(d) {
            return new Promise(function (resolve, reject) {
                var btn = d.getElementById(ITunesConnectCapture.btnId);
                btn.addEventListener('click', resolve, { once: true, capture: true });
            }).then(function () {
                var usernameField = d.getElementById(ITunesConnectCapture.usernameId);
                var passwordField = d.getElementById(ITunesConnectCapture.passwordId);
                if (!usernameField || !passwordField) return site_handler_1.CaptureFailReason.Failed;
                if (usernameField.tagName.toLowerCase() !== 'input' || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.CaptureFailReason.Aborted;
                if (!usernameField.validity.valid || !passwordField.validity.valid) return site_handler_1.CaptureFailReason.Aborted;
                return {
                    password: passwordField.value,
                    username: usernameField.value,
                    title: 'Apple'
                };
            }).catch(function () {
                return site_handler_1.CaptureFailReason.Failed;
            });
        }
    }]);

    return ITunesConnectCapture;
}();
/** Login button id. */


ITunesConnectCapture.btnId = 'sign-in';
/** Username field id. */
ITunesConnectCapture.usernameId = 'appleId';
/** Password field id. */
ITunesConnectCapture.passwordId = 'pwd';
exports.ITunesConnectCapture = ITunesConnectCapture;

var ITunesConnectTargeter = function () {
    function ITunesConnectTargeter() {
        _classCallCheck(this, ITunesConnectTargeter);
    }

    _createClass(ITunesConnectTargeter, [{
        key: "priority",
        value: function priority(d) {
            return regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "dropdownTargets",
        value: function dropdownTargets(d) {
            var username = d.getElementById(ITunesConnectTargeter.usernameId);
            var password = d.getElementById(ITunesConnectTargeter.passwordId);
            if (!username || !password) return [];
            return [{
                usernameField: username,
                passwordField: password,
                dropdownTargets: [username, password]
            }];
        }
    }, {
        key: "passwordSuggestTargets",
        value: function passwordSuggestTargets(d) {
            return [];
        }
    }]);

    return ITunesConnectTargeter;
}();
/** Username field id. */


ITunesConnectTargeter.usernameId = 'appleId';
/** Password field id. */
ITunesConnectTargeter.passwordId = 'pwd';
exports.ITunesConnectTargeter = ITunesConnectTargeter;

},{"../formfill":3,"./site_handler":17}],15:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var site_handler_1 = require("./site_handler");
var formfill_1 = require("../formfill");
var regex = /^https:\/\/account\.newyorker\.com\/?(?:[?#][^/]*)?/i;

var NewYorkerAutofill = function () {
    function NewYorkerAutofill() {
        _classCallCheck(this, NewYorkerAutofill);
    }

    _createClass(NewYorkerAutofill, [{
        key: "priority",
        value: function priority(d) {
            return regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doFill",
        value: function doFill(d, username, password) {
            if (!username) return site_handler_1.FillResult.Failed;
            var usernameField = d.getElementById(NewYorkerAutofill.usernameId);
            if (!usernameField || usernameField.tagName.toLowerCase() !== 'input') return site_handler_1.FillResult.Failed;
            formfill_1.fillInput(usernameField, username);
            var passwordField = d.getElementById(NewYorkerAutofill.passwordId);
            if (!passwordField || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.FillResult.Failed;
            formfill_1.fillInput(passwordField, password);
            return site_handler_1.FillResult.Success;
        }
    }]);

    return NewYorkerAutofill;
}();
/** Username field id. */


NewYorkerAutofill.usernameId = 'username';
/** Password field id. */
NewYorkerAutofill.passwordId = 'userpass';
exports.NewYorkerAutofill = NewYorkerAutofill;

var NewYorkerTargeter = function () {
    function NewYorkerTargeter() {
        _classCallCheck(this, NewYorkerTargeter);
    }

    _createClass(NewYorkerTargeter, [{
        key: "priority",
        value: function priority(d) {
            return regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "dropdownTargets",
        value: function dropdownTargets(d) {
            var username = d.getElementById(NewYorkerTargeter.usernameId);
            var password = d.getElementById(NewYorkerTargeter.passwordId);
            if (!username || !password) return [];
            return [{
                usernameField: username,
                passwordField: password,
                dropdownTargets: [username, password]
            }];
        }
    }, {
        key: "passwordSuggestTargets",
        value: function passwordSuggestTargets(d) {
            return [];
        }
    }]);

    return NewYorkerTargeter;
}();
/** Username field id. */


NewYorkerTargeter.usernameId = 'username';
/** Password field id. */
NewYorkerTargeter.passwordId = 'userpass';
exports.NewYorkerTargeter = NewYorkerTargeter;

},{"../formfill":3,"./site_handler":17}],16:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var site_handler_1 = require("./site_handler");
/**
 * Site-specific capture for the New York Times homepage.
 */

var NewYorkTimesCapture = function () {
    function NewYorkTimesCapture() {
        _classCallCheck(this, NewYorkTimesCapture);

        this.name = 'New York Times sign-in';
    }

    _createClass(NewYorkTimesCapture, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && NewYorkTimesCapture.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "doCapturePreregister",
        value: function doCapturePreregister(d) {
            return new Promise(function (resolve) {
                return d.defaultView.addEventListener('click', function (evt) {
                    if (evt.target.id === NewYorkTimesCapture.btnId) resolve();
                }, true);
            }).then(function () {
                var usernameField = d.getElementById(NewYorkTimesCapture.usernameId);
                var passwordField = d.getElementById(NewYorkTimesCapture.passwordId);
                if (!usernameField || !passwordField) return site_handler_1.CaptureFailReason.Failed;
                if (usernameField.tagName.toLowerCase() !== 'input' || passwordField.tagName.toLowerCase() !== 'input') return site_handler_1.CaptureFailReason.Aborted;
                if (!usernameField.validity.valid || !passwordField.validity.valid) return site_handler_1.CaptureFailReason.Aborted;
                return {
                    password: passwordField.value,
                    username: usernameField.value,
                    title: 'New York Times'
                };
            }).catch(function () {
                return site_handler_1.CaptureFailReason.Failed;
            });
        }
    }]);

    return NewYorkTimesCapture;
}();
/** Match the NYT sign-in page. */


NewYorkTimesCapture.regex = /^https:\/\/myaccount.nytimes.com\/auth\/login\/?(?:[?#][^/]*)?/i;
/** Username field id. */
NewYorkTimesCapture.usernameId = 'username';
/** Password field id. */
NewYorkTimesCapture.passwordId = 'password';
/** Login button id. */
NewYorkTimesCapture.btnId = 'submitButton';
exports.NewYorkTimesCapture = NewYorkTimesCapture;

var NewYorkTimesTargeter = function () {
    function NewYorkTimesTargeter() {
        _classCallCheck(this, NewYorkTimesTargeter);
    }

    _createClass(NewYorkTimesTargeter, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && NewYorkTimesTargeter.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "dropdownTargets",
        value: function dropdownTargets(d) {
            return [];
        }
    }, {
        key: "passwordSuggestTargets",
        value: function passwordSuggestTargets(d) {
            if (!d.getElementById(NewYorkTimesTargeter.emailId)) return [];
            var passwordField = d.getElementById(NewYorkTimesTargeter.passwordId);
            if (!passwordField || passwordField.tagName.toLowerCase() !== 'input') return [];
            return [{
                clickFields: [passwordField],
                fillFields: [passwordField]
            }];
        }
    }]);

    return NewYorkTimesTargeter;
}();
/** Match the NYT sign-in page. */


NewYorkTimesTargeter.regex = /^https:\/\/myaccount.nytimes.com\/auth\/login\/?(?:[?#][^/]*)?/i;
/** Email field id. */
NewYorkTimesTargeter.emailId = 'email';
/** Password field id. */
NewYorkTimesTargeter.passwordId = 'password';
exports.NewYorkTimesTargeter = NewYorkTimesTargeter;

},{"./site_handler":17}],17:[function(require,module,exports){
"use strict";
/**
 * Types for site-specific capture, autofill, and dropdown targeting.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var bank_of_america_1 = require("./bank_of_america");
var util_1 = require("../util");
var amex_1 = require("./amex");
var citi_1 = require("./citi");
var nyt_1 = require("./nyt");
var ycombinator_1 = require("./ycombinator");
var itunesconnect_1 = require("./itunesconnect");
var newyorker_1 = require("./newyorker");
/**
 * Handles autofill for a particular site. Meant to override default detection functionality if successful (or on Abort
 * result).
 */

var SiteAutofillHandler = function SiteAutofillHandler() {
    _classCallCheck(this, SiteAutofillHandler);
};

exports.SiteAutofillHandler = SiteAutofillHandler;
/**
 * Handles capture for a particular site.
 */

var SiteCaptureHandler = function SiteCaptureHandler() {
    _classCallCheck(this, SiteCaptureHandler);
};

exports.SiteCaptureHandler = SiteCaptureHandler;
/**
 * A class to handle dropdown placement as a supplement to the heuristic detection we're already doing.
 */

var SiteDropdownTargeter = function SiteDropdownTargeter() {
    _classCallCheck(this, SiteDropdownTargeter);
};

exports.SiteDropdownTargeter = SiteDropdownTargeter;
var Priority;
(function (Priority) {
    Priority[Priority["HIGH"] = 3] = "HIGH";
    Priority[Priority["NORMAL"] = 2] = "NORMAL";
    Priority[Priority["LOW"] = 1] = "LOW";
    Priority[Priority["IGNORE"] = 0] = "IGNORE";
})(Priority = exports.Priority || (exports.Priority = {}));
var CaptureFailReason;
(function (CaptureFailReason) {
    CaptureFailReason[CaptureFailReason["Aborted"] = 0] = "Aborted";
    CaptureFailReason[CaptureFailReason["Failed"] = 1] = "Failed";
})(CaptureFailReason = exports.CaptureFailReason || (exports.CaptureFailReason = {}));
var FillResult;
(function (FillResult) {
    FillResult[FillResult["Success"] = 0] = "Success";
    FillResult[FillResult["Aborted"] = 1] = "Aborted";
    FillResult[FillResult["Failed"] = 2] = "Failed";
})(FillResult = exports.FillResult || (exports.FillResult = {}));
exports.PreregisterHandlers = [new bank_of_america_1.BofASignInCapture(), new bank_of_america_1.BofAHomeCapture(), new amex_1.AmexHomeCapture(), new amex_1.AmexSignInCapture(), new citi_1.CitiHomeCapture(), new citi_1.CitiSignInCapture(), new nyt_1.NewYorkTimesCapture()];
/**
 * Preregister capture handlers that match this document.
 * @param {Document} d The document to match against and register with.
 * @returns {Promise<CaptureResult>[]} Promises holding the result of the capture.
 */
function preregisterCaptures(d) {
    return exports.PreregisterHandlers.filter(function (handler) {
        return handler.priority(d) != Priority.IGNORE;
    }).map(function (handler) {
        util_1.DebugLogger.log("preregistering site capture handler " + handler.name);
        return handler.doCapturePreregister(d);
    });
}
exports.preregisterCaptures = preregisterCaptures;
exports.Fillers = [new bank_of_america_1.BofASignInFill(), new citi_1.CitiHomeFill(), new citi_1.CitiSignInFill(), new itunesconnect_1.ITunesConnectFill(), new newyorker_1.NewYorkerAutofill()];
exports.Targeters = [new bank_of_america_1.BofADropdownTargeter(), new citi_1.CitiHomeDropdownTargeter(), new citi_1.CitiSignInDropdownTargeter(), new nyt_1.NewYorkTimesTargeter(), new ycombinator_1.YCombinatorTargeter(), new itunesconnect_1.ITunesConnectTargeter(), new newyorker_1.NewYorkerTargeter()];

},{"../util":20,"./amex":11,"./bank_of_america":12,"./citi":13,"./itunesconnect":14,"./newyorker":15,"./nyt":16,"./ycombinator":18}],18:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var site_handler_1 = require("./site_handler");

var YCombinatorTargeter = function () {
    function YCombinatorTargeter() {
        _classCallCheck(this, YCombinatorTargeter);
    }

    _createClass(YCombinatorTargeter, [{
        key: "priority",
        value: function priority(d) {
            return d.defaultView === d.defaultView.top && YCombinatorTargeter.regex.test(d.location.href) ? site_handler_1.Priority.NORMAL : site_handler_1.Priority.IGNORE;
        }
    }, {
        key: "forms",
        value: function forms(d) {
            var forms = Array.from(d.getElementsByTagName('form')).filter(function (elt) {
                return elt.action.indexOf('login') >= 0;
            });
            if (forms.length !== 2) return;
            var createIdx = forms.findIndex(function (elt) {
                return Array.from(elt.children).some(function (child) {
                    return child.tagName.toLowerCase() === 'input' && child.type === 'hidden' && child.name === 'creating' && child.value === 't';
                });
            });
            if (createIdx === -1) return;
            var loginIdx = Math.abs(createIdx - 1);
            return {
                login: forms[loginIdx],
                create: forms[createIdx]
            };
        }
    }, {
        key: "dropdownTargets",
        value: function dropdownTargets(d) {
            var forms = this.forms(d);
            if (!forms) return [];
            var inputs = Array.from(forms.login.getElementsByTagName('input'));
            var username = inputs.find(function (elt) {
                return elt.name === 'acct';
            });
            var password = inputs.find(function (elt) {
                return elt.name === 'pw';
            });
            if (!username || !password) return [];
            return [{
                usernameField: username,
                passwordField: password,
                dropdownTargets: [username, password]
            }];
        }
    }, {
        key: "passwordSuggestTargets",
        value: function passwordSuggestTargets(d) {
            var forms = this.forms(d);
            if (!forms) return [];
            var inputs = Array.from(forms.create.getElementsByTagName('input'));
            var username = inputs.find(function (elt) {
                return elt.name === 'acct';
            });
            var password = inputs.find(function (elt) {
                return elt.name === 'pw';
            });
            if (!username || !password) return [];
            return [{
                clickFields: [password],
                fillFields: [password]
            }];
        }
    }]);

    return YCombinatorTargeter;
}();
/** Match the Y Combinator sign in page. */


YCombinatorTargeter.regex = /^https:\/\/news\.ycombinator\.com\/login\/?(?:[?#][^/]*)?/i;
exports.YCombinatorTargeter = YCombinatorTargeter;

},{"./site_handler":17}],19:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var Handlebars = require("./handlebars.runtime");
exports.default = { dropdown_item: Handlebars.template({ "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
            var helper,
                alias1 = helpers.helperMissing,
                alias2 = "function",
                alias3 = this.escapeExpression;
            return "<div class=\"valt-autofill-dropdown-item\" role=\"button\" style=\"padding: 8px 20px 8px 9px !important\">\n    <div style=\"\n    display: flex !important;\n    justify-content: center !important;\n    align-items: center !important\">\n        <img class=\"valt-autofill-dropdown-icon\" src=\"" + alias3((helper = (helper = helpers.img_src || (depth0 != null ? depth0.img_src : depth0)) != null ? helper : alias1, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias2 ? helper.call(depth0, { "name": "img_src", "hash": {}, "data": data }) : helper)) + "\">\n\n        <div style=\"flex: 1 !important; overflow: hidden !important; text-overflow: ellipsis !important\">\n            <span class=\"valt-autofill-item-title\">\n                " + alias3((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias2 ? helper.call(depth0, { "name": "title", "hash": {}, "data": data }) : helper)) + "\n            </span>\n        </div>\n    </div>\n</div>\n";
        }, "useData": true }),
    suggest_password: Handlebars.template({ "compiler": [6, ">= 2.0.0-beta.1"], "main": function main(depth0, helpers, partials, data) {
            var helper,
                alias1 = helpers.helperMissing,
                alias2 = "function",
                alias3 = this.escapeExpression;
            return "<div class=\"valt-autofill-dropdown-item\" role=\"button\">\n    <div class=\"valt-autofill-password-wrap\">\n        <img class=\"valt-autofill-dropdown-icon\" src=\"" + alias3((helper = (helper = helpers.img_src || (depth0 != null ? depth0.img_src : depth0)) != null ? helper : alias1, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias2 ? helper.call(depth0, { "name": "img_src", "hash": {}, "data": data }) : helper)) + "\">\n\n        <div style=\"\n        flex: 1 !important;\n        overflow: hidden !important;\n        text-overflow: ellipsis !important\">\n            <span class=\"valt-autofill-password-title\">Use Valt suggested password</span>\n            <span class=\"valt-autofill-password\">" + alias3((helper = (helper = helpers.password || (depth0 != null ? depth0.password : depth0)) != null ? helper : alias1, (typeof helper === "undefined" ? "undefined" : _typeof(helper)) === alias2 ? helper.call(depth0, { "name": "password", "hash": {}, "data": data }) : helper)) + "</span>\n        </div>\n    </div>\n\n    <div class=\"valt-autofill-password-subtitle\">\n        This password will be saved in your Valt.\n    </div>\n</div>\n";
        }, "useData": true }) };

},{"./handlebars.runtime":8}],20:[function(require,module,exports){
"use strict";
/**
 * Various utilities
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Characters for random password generation.
 * @type {string[]}
 */
var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
/**
 * Generate a pseudorandom UUID. Found at http://www.broofa.com/Tools/Math.uuid.js (MIT Licensed)
 * @returns {string}
 */
function uuid() {
    var uuid = new Array(36),
        rnd = 0,
        r = void 0;
    for (var i = 0; i < 36; i++) {
        if (i == 8 || i == 13 || i == 18 || i == 23) {
            uuid[i] = '-';
        } else if (i == 14) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = CHARS[i == 19 ? r & 0x3 | 0x8 : r];
        }
    }
    return uuid.join('');
}
exports.uuid = uuid;
/**
 * Error generated by a failed assertion.
 * @class
 * @implements Error
 */

var AssertionError = function () {
    function AssertionError() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        _classCallCheck(this, AssertionError);

        this.name = "AssertionError";
        this.message = message;
    }

    _createClass(AssertionError, [{
        key: "toString",
        value: function toString() {
            return this.name + ": " + this.message;
        }
    }]);

    return AssertionError;
}();

exports.AssertionError = AssertionError;
/**
 * Assert that a condition is true, throwing {@link AssertionError} otherwise.
 * @param {boolean} cond The assertion.
 * @param {string} message An optional message on failure.
 * @returns {void}
 */
function assert(cond, message) {
    if (!cond) throw new AssertionError(message || "Assertion failed");
}
exports.assert = assert;
/**
 * Fail unconditionally.
 * @param {string} message A message to report on failure.
 * @returns {never}
 */
function fail(message) {
    throw new Error(message);
}
exports.fail = fail;
/**
 * Represent that the current location in code is unreachable. Serves as a terminating statement given `never` return
 *  type.
 * @returns {never}
 */
function unreachable() {
    throw new Error('Unreachable code executed');
}
exports.unreachable = unreachable;
/**
 * A logger that only runs in debug builds.
 */

var DebugLogger = function () {
    function DebugLogger() {
        _classCallCheck(this, DebugLogger);
    }

    _createClass(DebugLogger, null, [{
        key: "debug",
        value: function debug(s) {
            // 
            console.debug(s);
            // 
        }
    }, {
        key: "log",
        value: function log(s) {
            // 
            console.log(s);
            // 
        }
    }, {
        key: "info",
        value: function info(s) {
            // 
            console.info(s);
            // 
        }
    }, {
        key: "warn",
        value: function warn(s) {
            // 
            console.warn(s);
            // 
        }
    }, {
        key: "error",
        value: function error(s) {
            // 
            console.error(s);
            // 
        }
    }]);

    return DebugLogger;
}();

exports.DebugLogger = DebugLogger;
/**
 * Generate a random alphanumeric password.
 * @param {number} pwLength The length of the password to generate.
 * @returns {string}
 */
function randomPassword() {
    var pwLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

    var pwOut = [];
    for (var i = 0; i < pwLength; i++) {
        var idx = Math.floor(Math.random() * CHARS.length);
        pwOut.push(CHARS[idx]);
    }
    return pwOut.join('');
}
exports.randomPassword = randomPassword;
/**
 * Mirrors {@link WebSocket} states for Safari.
 */
var WebsocketState;
(function (WebsocketState) {
    WebsocketState[WebsocketState["CONNECTING"] = 0] = "CONNECTING";
    WebsocketState[WebsocketState["OPEN"] = 1] = "OPEN";
    WebsocketState[WebsocketState["CLOSING"] = 2] = "CLOSING";
    WebsocketState[WebsocketState["CLOSED"] = 3] = "CLOSED";
})(WebsocketState = exports.WebsocketState || (exports.WebsocketState = {}));
/**
 * The build identifier of this version of the extension.
 * @type {string}
 */
exports.BUILD = '1.0.4-55f1273-dev';
/**
 * The commit id that built this version of the extension.
 * @type {string}
 */
exports.BUILD_COMMIT = exports.BUILD.split('-')[1];
/**
 * This function is a helper to build a Handlebars template. Note that we return a DocumentFragment, which will almost
 * certainly need to be unwrapped.
 *
 * We use DocumentFragment rather than e.g. HTMLElement because there may be more than
 * one top-level element in the template, so unwrapping will have to happen either way, and this is how we actually get
 * the content back anyway.
 *
 * @param tmpls
 * @param {string} name The name of the template.
 * @param ctx Context to render with.
 * @param opts Handlebars rendering options (optional).
 * @returns {DocumentFragment} A DocumentFragment with the content of the template in it.
 */
function template(tmpls, name, ctx, opts) {
    var temp = document.createElement('template');
    temp.innerHTML = tmpls[name](ctx, opts);
    return temp.content;
}
exports.template = template;
/**
 * Utility function that returns the argument passed to it. Useful for instance with `filter`.
 * @example ['a', null, 'b', undefined, 'c', false, 'd'].filter(identity) === ['a', 'b', 'c', 'd']
 *
 * @param {T} t
 * @returns {T}
 */
function identity(t) {
    return t;
}
exports.identity = identity;
/**
 * Utility function to shallow-flatten an array.
 * @param {T[][]} ary An array to flatten.
 * @returns {T[]}
 */
function flatten(ary) {
    return ary.reduce(function (a, b) {
        return a.concat(b);
    }, []);
}
exports.flatten = flatten;

},{}]},{},[9])


