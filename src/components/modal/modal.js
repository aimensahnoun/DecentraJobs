//FramerMotion import
import { motion, AnimatePresence } from "framer-motion";

//Icon import
import { MdClose } from "react-icons/md/";

const Modal = ({ isOpen, setIsOpen, title, children }) => {
  //Backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
  };

  //Modal animation
  const modalVariants = {
    hidden: { opacity: 0, y: "-50px" },
    enter: { opacity: 1, y: "0", transition: { delay: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="enter"
          exit="hidden"
          className="w-screen h-screen bg-black bg-opacity-30 absolute inset-0 z-10 flex justify-center items-center"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="enter"
            exit="hidden"
            className="w-[50%] h-[70%] rounded-lg bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-[1rem]">
              <span className="text-[1.5rem] text-decentra-green">{title}</span>
              <div
                className=" w-[2rem] h-[2rem] rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <MdClose className="text-black text-[1.5rem]" />
              </div>
            </div>

            {/* Content */}
            <div className="max-h-fit flex flex-col text-black">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
