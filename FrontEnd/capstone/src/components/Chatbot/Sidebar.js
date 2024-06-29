// src/components/Chatbot/Sidebar.js
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Important for accessibility

const Sidebar = ({ conversations, onNewChat, onSelectConversation, currentConversationId, onDeleteConversation, onRenameConversation }) => {
  const [menuVisible, setMenuVisible] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newChatName, setNewChatName] = useState('');
  const menuRef = useRef();

  const handleMenuToggle = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openDeleteModal = (conversation) => {
    setSelectedConversation(conversation);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setSelectedConversation(null);
  };

  const openRenameModal = (conversation) => {
    setSelectedConversation(conversation);
    setNewChatName(conversation.name || '');
    setRenameModalIsOpen(true);
  };

  const closeRenameModal = () => {
    setRenameModalIsOpen(false);
    setSelectedConversation(null);
  };

  const handleDelete = () => {
    onDeleteConversation(selectedConversation.id);
    closeDeleteModal();
  };

  const handleRename = () => {
    onRenameConversation(selectedConversation.id, newChatName);
    closeRenameModal();
  };

  return (
    <div className="bg-gray-100 p-4 w-64">
      <button onClick={onNewChat} className="mb-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">New Chat</button>
      <div>
        {conversations.map(conv => (
          <div 
            key={conv.id} 
            className={`flex justify-between items-center mb-2 p-4 rounded-lg shadow-md cursor-pointer ${currentConversationId === conv.id ? 'bg-blue-100' : 'bg-white'}`} 
            onClick={() => onSelectConversation(conv.id)}
            style={{ color: '#4a4a4a' }} // Dark gray color
          >
            <span>{conv.name || `Conversation ${conv.id}`}</span>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={(e) => { e.stopPropagation(); handleMenuToggle(conv.id); }} 
                className="p-2 rounded-full hover:bg-gray-200"
              >
                ...
              </button>
              {menuVisible === conv.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); openDeleteModal(conv); }} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openRenameModal(conv); }} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    Rename
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalIsOpen} onRequestClose={closeDeleteModal} className="modal" overlayClassName="overlay">
        <h2>Delete {selectedConversation && (selectedConversation.name || `Conversation ${selectedConversation.id}`)}</h2>
        <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Confirm</button>
        <button onClick={closeDeleteModal} className="ml-2 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">Cancel</button>
      </Modal>

      {/* Rename Modal */}
      <Modal isOpen={renameModalIsOpen} onRequestClose={closeRenameModal} className="modal" overlayClassName="overlay">
        <h2>Rename {selectedConversation && (selectedConversation.name || `Conversation ${selectedConversation.id}`)}</h2>
        <input 
          type="text" 
          value={newChatName} 
          onChange={(e) => setNewChatName(e.target.value)} 
          className="p-2 border border-gray-300 rounded-lg w-full text-gray-800" // Updated input text color to dark gray
        />
        <button onClick={handleRename} className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Save</button>
      </Modal>
    </div>
  );
};

export default Sidebar;
