import { reactive, toRefs } from "vue";
import axios from "axios";

interface URLLoader<T> {
  result: T | null;
  loading: boolean;
  loaded: boolean;
  error: any;
}

function useURLLoader<T>(url: string) {
  const data: URLLoader<T> = reactive({
    result: null,
    loading: true,
    loaded: false,
    error: null,
  });

  axios
    .get(url)
    .then((rawData) => {
      data.loading = false;
      data.loaded = true;
      data.result = rawData.data;
    })
    .catch((e) => {
      data.error = e;
      data.loading = false;
    });
  const refData = toRefs(data);
  return data;
}

export default useURLLoader;
