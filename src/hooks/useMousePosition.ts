/**
 * 获取鼠标点击的位置
 */
import { ref, toRefs, onMounted, onUnmounted, reactive } from "vue";
interface Position {
  x: number;
  y: number;
}
function useMousePosition() {
  const data: Position = reactive({
    x: 0,
    y: 0,
  });

  const updateMouse = (e: MouseEvent): void => {
    data.x = e.pageX;
    data.y = e.pageY;
  };
  onMounted((): void => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted((): void => {
    document.removeEventListener("click", updateMouse);
  });
  const refData = toRefs(data);
  return refData;
}

export default useMousePosition;
