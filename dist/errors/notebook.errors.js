"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookInsertError = exports.NotebookWithoutTitleError = exports.NotebookWithoutUsernameError = void 0;
class NotebookWithoutUsernameError extends Error {
}
exports.NotebookWithoutUsernameError = NotebookWithoutUsernameError;
class NotebookWithoutTitleError extends Error {
}
exports.NotebookWithoutTitleError = NotebookWithoutTitleError;
class NotebookInsertError extends Error {
}
exports.NotebookInsertError = NotebookInsertError;
