import Sport, { SportDocument } from '../models/Sport'

const findAll = (): Promise<SportDocument[]> => {
  return Sport.find().exec()
}

const createSport = (sport: SportDocument): Promise<SportDocument> => {
  return sport.save()
}

const updateSport = async (
  sportId: string,
  update: Partial<SportDocument>
): Promise<SportDocument> => {
  return await Sport.findByIdAndUpdate(sportId, update)
    .exec()
    .then((sport) => {
      if (!sport) {
        throw new Error(`Sport ${sportId} not found`)
      }

      return sport
    })
}

const deleteSport = (sportId: string) => {
  return Sport.findByIdAndDelete(sportId)
}

export default { createSport, updateSport, deleteSport, findAll }
