import * as dotenv from 'dotenv'

const { parsed } = dotenv.config()

export default process.env.NODE_ENV === 'development' ? parsed : process.env
