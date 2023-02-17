import {MongoClient} from 'mongodb'

const mongoURL = 'mongodb://10.0.0.46:27017'
export const client = new MongoClient(mongoURL)
