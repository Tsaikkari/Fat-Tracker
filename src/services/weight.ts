import Weight, { WeightDocument } from '../models/Weight'

const findAll = (): Promise<WeightDocument[]> => {
  return Weight.find().exec()
}

const createWeight = (weight: WeightDocument): Promise<WeightDocument> => {
  return weight.save()
}

const updateWeight = async (
  weightId: string,
  update: Partial<WeightDocument>
): Promise<WeightDocument> => {
  return await Weight.findByIdAndUpdate(weightId, update)
    .exec()
    .then((weight) => {
      if (!weight) {
        throw new Error(`Weight ${weightId} not found`)
      }

      return weight
    })
}

const deleteWeight = (weightId: string) => {
  return Weight.findByIdAndDelete(weightId)
}

export default { updateWeight, deleteWeight, findAll, createWeight }
