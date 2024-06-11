import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'RECOMMENDATION';

const initialItems = [
  { id: '1', content: 'Lowest Price' },
  { id: '2', content: 'Shortest Duration' },
  { id: '3', content: 'Check-in Luggage Included' },
];

const RecommendationItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="p-2 mb-2 bg-gray-200 border border-gray-300 cursor-move">
      {item.content}
    </div>
  );
};

const Recommendation = () => {
  const [items, setItems] = useState(initialItems);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item, index) => (
        <RecommendationItem key={item.id} index={index} item={item} moveItem={moveItem} />
      ))}
    </DndProvider>
  );
};

export default Recommendation;
