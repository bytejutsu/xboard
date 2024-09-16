import { createSelector } from "reselect"

export const self = (state) => state.listLessonWatch

export const getList = createSelector(self, (data) => data?.list)
