export default defineEventHandler(async (event) => {
	// return all authors
	// return await PlanetModel.find();
  return { success: true, data: "Hello" }
});