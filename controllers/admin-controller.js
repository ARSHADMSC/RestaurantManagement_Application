import {Food, validateFood} from '../models/Food.js'
const getFoods = async (req, res) => {
    try {
        let foods = await Food.find()
        res.status(200).send(foods)
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getFood = async (req, res) => {
    try {
        let food = await Food.findById(req.params.id)
        if (!food) {
            return res.status(400).send('No video found')
        } else {
            res.status(200).send(food)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const addFood = async (req, res) => {
    const { error } = validateFood(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    try {
        let food = new Food(req.body)
        await food.save()
        res.status(200).send(food)
    } catch (error) {
        return res.status(400).send(error)
    }
}


export default {
    getFoods,
    getFood,
    addFood
}

