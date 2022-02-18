import Week, { WeekDocument } from '../models/Week'

const findAll = (): Promise<WeekDocument[]> => {
  return Week.find().exec()
}

const createWeek = (week: WeekDocument): Promise<WeekDocument> => {
  return week.save()
}

const updateWeek = async (
  weekId: string,
  update: Partial<WeekDocument>
): Promise<WeekDocument> => {
  return await Week.findByIdAndUpdate(weekId, update, { new: true })
    .exec()
    .then((week) => {
      if (!week) {
        throw new Error(`Week ${weekId} not found`)
      }

      return week
    })
}

const deleteWeek = (weekId: string) => {
  return Week.findByIdAndDelete(weekId)
}

export default { createWeek, updateWeek, deleteWeek, findAll }
