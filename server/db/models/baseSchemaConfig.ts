export const baseSchemaConfig = {
  timestamps: { createdAt: "created", updatedAt: "modified" },
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true }
};