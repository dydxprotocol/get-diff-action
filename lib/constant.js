"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TARGET_EVENTS = {
    'pull_request': [
        'opened',
        'reopened',
        'synchronize',
        'closed',
    ],
    'push': '*',
};
exports.REMOTE_NAME = 'get-diff-action';