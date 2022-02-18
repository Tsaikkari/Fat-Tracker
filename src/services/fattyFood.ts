import FattyFood, { FattyFoodDocument } from '../models/FattyFood'

const findAll = (): Promise<FattyFoodDocument[]> => {
  return FattyFood.find()
    .exec()
}

const createFattyFood = (fattyFood: FattyFoodDocument): Promise<FattyFoodDocument> => {
  return fattyFood.save()
}

const updateFattyFood = async (
  fattyFoodId: string,
  update: Partial<FattyFoodDocument>
): Promise<FattyFoodDocument> => {
  return await FattyFood.findByIdAndUpdate(fattyFoodId, update, { new: true })
    .exec()
    .then((fattyFood) => {
      if (!fattyFood) {
        throw new Error(`FattyFood ${fattyFoodId} not found`)
      }

      return fattyFood
    })
}

const deleteFattyFood = (fattyFoodId: string) => {
  return FattyFood.findByIdAndDelete(fattyFoodId)
}

export default { createFattyFood, updateFattyFood, deleteFattyFood, findAll }
