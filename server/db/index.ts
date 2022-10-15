import mongoose from "mongoose";
import { Nitro } from "nitropack";

// Nitro plugin
// Thanks to https://github.com/UnderKoen for the answer to this
// https://github.com/nuxt/framework/discussions/4923
export default async (_nitroApp: Nitro) => {
	//run your connect code here
	const config = useRuntimeConfig();
	// connect to mongodb
  try {
    const mongooseInstance = await mongoose.connect(config.MONGO_URI)
    if (mongooseInstance) {
      const { host, port, name } = mongooseInstance.connection
      console.log(`\x1b[42m \x1b[37m MONGODB \x1b[0m  connected to\x1b[36m ${name}\x1b[0m on\x1b[36m ${host}\x1b[0m at\x1b[36m ${port} \x1b[0m`)
    } 
  } catch (e) {
    console.log(e);
  }
};
