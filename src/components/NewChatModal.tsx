"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function NewChatModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
}) {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (title.trim()) {
      onCreate(title.trim());
      setTitle("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-950 dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="text-lg font-semibold mb-4">Name your chat</h2>
            <input
              type="text"
              placeholder="Enter chat title"
              className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:border-gray-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCreate}
                className="text-sm px-4 py-2 rounded bg-blue-950 text-white hover:bg-blue-800"
              >
                Create
              </button>
              <button
                onClick={onClose}
                className="text-sm px-4 py-2 rounded bg-gray-800  hover:bg-gray-900"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
