import axios from 'axios'
import { Dairy, NewDairy } from '../type'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAll = () => {
   return axios
      .get<Dairy[]>(baseUrl)
      .then(response => response.data)
}

export const createEnteries = (object: NewDairy) => {
   return axios
      .post<Dairy[]>(baseUrl, object)
      .then(response => response.data)
}