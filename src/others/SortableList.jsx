import Sortable from "sortablejs";
import { useEffect } from "react";

export default function SortableList() {
  useEffect(() => {
    var el = document.querySelector(".sortable-items");
    Sortable.create(el);
  }, []);
  return (
    <ul className="sortable-items">
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ul>
  );
}
