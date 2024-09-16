import { createSelector } from "reselect";

export const self = (state) => state.app;

export const getLanguage = createSelector(self, (data) => data.language);
export const getCodeLanguage = createSelector(
  self,
  (data) => data.codeLanguage
);
