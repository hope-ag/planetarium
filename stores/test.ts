import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', () => {
  const loading = ref(0)


  function setLoading(val: number) {
    if (val <= 100) {
      loading.value = val
    }
  }

  return {
    loading,
    setLoading
  }
})